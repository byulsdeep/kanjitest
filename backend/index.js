import express from 'express'
import cors from 'cors'
import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { Mutex } from 'async-mutex'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// configs, dependencies
const app = express()
app.use(express.json())
app.use(cors())
const mutex = new Mutex()
const PORT = 8080
const router = express.Router()
app.listen(PORT, () => {
    logger.info(`**************************************************************`)
    logger.info(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
    logger.info(`**************************************************************`)
})

// logger
const transport = new DailyRotateFile({
    filename: `/home/ec2-user/kanjitest/backend/logs/kanjitest-%DATE%.log`,
    // filename: `./logs/kanjitest-%DATE%.log`,
    datePattern: `YYYY-MM-DD`,
    zippedArchive: true,
    maxSize: `20m`,
    maxFiles: `14d`
})
const logger = winston.createLogger({
    level: `info`,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        transport
    ]
})
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} called from ${req.ip}`)
    next()
})
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`)
    logger.error(err.stack)
    logger.error(`Request URL: ${req.url}`)
    next(err)
})

// download api
app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName
    const filePath = `/home/ec2-user/kanjitest/backend/exports/${fileName}`
    // const filePath = `./exports/${fileName}`

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Set headers
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
        res.setHeader('Content-Type', 'application/octet-stream')

        // Read and send the file
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(res)
    } else {
        res.status(404).json({ error: 'File not found' })
    }
})

// login api
app.post(`/login`, async (req, res) => {
    const filePath = `/home/ec2-user/kanjitest/backend/data/admin_info.json`
    // const filePath = `./data/admin_info.json`
    fs.readFile(filePath, 'utf8', (err, data) => {
        let success = false
        if (err) {
            logger.error('Error reading the JSON file:', err)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
        try {
            const userInfo = JSON.parse(data)

            Object.entries(userInfo).forEach(([name, birth]) => {
                if (req.body.name === name && req.body.birth === birth) {
                    success = true
                    logger.info('login success')
                }
            })

        } catch (err) {
            logger.error('Error parsing JSON data:', err)
            res.status(500).json({ message: 'Internal Server Error' })
        }
        if (success) {
            // const path = `./exports/`
            const path = `/home/ec2-user/kanjitest/backend/exports/` 
            fs.readdir(path, (err, files) => {
                if (err) {
                    logger.error('Unable to scan directory: ' + err)
                    res.status(500).json({ message: 'Internal Server Error' })
                }
                logger.info('List of files:')
                files.forEach((file) => logger.info(file))
                res.status(201).json({ message: `login success`, files: files })
            })
        } else {
            logger.info('login failed')
            res.status(401).json({ message: '間違った情報です' })
        }
      })
})

// kanjitest excel writing api
app.post(`/kanjitest`, async (req, res) => {
    
    const release = await mutex.acquire()
    logger.info(`file locked`)

    try {
        const today = new Date()
        const year = today.getFullYear()
        let month = today.getMonth() + 1
        month = month > 9 ? month : `0${month}`
        let day = today.getDate()
        day = day > 9 ? day : `0${day}`
        const data = [{
            テスト日: `${year}${month}${day}`,
            点数: `${req.body.scoreValue}/100`,
            経過時間: `${req.body.timeElapsed}`,
        }]
        const filePath = `/home/ec2-user/kanjitest/backend/exports/${req.body.employeeHireDate}.xlsx`
        // const filePath = `./exports/${req.body.employeeHireDate}.xlsx`
        const sheetName = `${req.body.employeeName}${req.body.employeeNumber}`
        logger.info(`attempting excel file creation/modification`)
        logger.info(`filePath: ${filePath}`)
        logger.info(`sheetName: ${sheetName}`)

        // const directory = `./exports`
        const directory = `/home/ec2-user/kanjitest/backend/exports`

        if (!fs.existsSync(directory)) {
            // If it doesn't exist, create it
            fs.mkdirSync(directory)
            logger.info(`directory ${directory} not found. Created successfully`)
        } else {
            console.log(`directory ${directory} already exists. Proceeding to next step`)
        }

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // workbook does not exist
                logger.info(`workbook does not exist, attempting workbook creation`)
                try {
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.json_to_sheet(data)
                    XLSX.utils.book_append_sheet(wb, ws, sheetName)
                    XLSX.writeFile(wb, filePath)
                    logger.info(`workbook created successfully at ${filePath}`)
                    res.status(201).json({ message: `結果を提出しました。` })
                } catch (error) {
                    logger.error(`workbook creation failed`)
                    res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                }
            } else {
                // workbook exists
                logger.info(`workbook ${req.body.employeeHireDate}.xlsx already exists, checking if sheet ${sheetName} exists`)
                const wb = XLSX.readFile(filePath)
                if (!wb.SheetNames.includes(sheetName)) {
                    // sheet does not exist
                    logger.info(`sheet ${sheetName} does not exist, attempting adding sheet to existing workbook`)
                    try {
                        const ws = XLSX.utils.json_to_sheet(data)
                        XLSX.utils.book_append_sheet(wb, ws, sheetName)
                        XLSX.writeFile(wb, filePath)
                        logger.info(`sheet ${sheetName} added to existing workbook`)
                        res.status(201).json({ message: `結果を提出しました。` })
                    } catch (error) {
                        logger.error(`failed to add sheet ${sheetName}`)
                        res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                    }
                } else {
                    // sheet exists
                    try {
                        logger.info(`sheet ${sheetName} already exists, appending data to the existing sheet`)
                        const ws = wb.Sheets[sheetName]
                        XLSX.utils.sheet_add_json(ws, data, { skipHeader: true, origin: -1 })
                        XLSX.writeFile(wb, filePath)
                        logger.info(`sheet ${sheetName} updated`)
                        res.status(201).json({ message: `結果を提出しました。` })
                    } catch (error) {
                        logger.error(`sheet update failed`)
                        res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                    }
                }
            }
        })
    } finally {
        release()
        logger.info(`file operation done, unlocking file`)
    } 
})