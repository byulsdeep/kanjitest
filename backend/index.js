import express from "express"
import cors from "cors"
import XLSX from 'xlsx'
import fs from 'fs'
import Mutex from 'async-mutex'

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    console.log('home page')
    res.json("Hello, this is backend")
})

app.get("/kanjitest", (req, res) => {})

const mutex = new Mutex()

app.post("/kanjitest", async (req, res) => {
    
    const release = await mutex.acquire()

    try {
        const today = new Date()
        const data = [{
            テスト日: `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`,
            点数: `${req.body.scoreValue}/100`,
            経過時間: `${req.body.timeElapsed}`,
        }]
        const filePath = `C:/workspace/kanjitest/backend/exports/${req.body.employeeHireDate}.xlsx`
        const sheetName = `${req.body.employeeName}${req.body.employeeNumber}`
    
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File does not exist
                try {
                    const wb = XLSX.utils.book_new()
                    const ws = XLSX.utils.json_to_sheet(data)
                    XLSX.utils.book_append_sheet(wb, ws, sheetName)
                    XLSX.writeFile(wb, filePath)
                    console.log('file created')
                    res.status(201).json({ message: `結果を提出しました。` })
                } catch (error) {
                    console.log(error)
                    console.log('file creation failed')
                    res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                }
            } else {
                // File exists
                const wb = XLSX.readFile(filePath)
                if (!wb.SheetNames.includes(sheetName)) {
                    // Sheet does not exist
                    try {
                        const ws = XLSX.utils.json_to_sheet(data)
                        XLSX.utils.book_append_sheet(wb, ws, sheetName)
                        XLSX.writeFile(wb, filePath)
                        console.log('sheet added to existing sheet')
                        res.status(201).json({ message: `結果を提出しました。` })
                    } catch (error) {
                        console.log(error)
                        console.log('sheet add failed')
                        res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                    }
                } else {
                    // Sheet exists
                    try {
                        const ws = wb.Sheets[sheetName]
                        XLSX.utils.sheet_add_json(ws, data, { skipHeader: true, origin: -1 })
                        XLSX.writeFile(wb, filePath)
                        console.log('sheet updated')
                        res.status(201).json({ message: `結果を提出しました。` })
                    } catch (error) {
                        console.log(error)
                        console.log('sheet update failed')
                        res.status(500).json({ message: `結果提出に失敗しました。しばらくしてお試しください。` })
                    }
                }
            }
        })
    } finally {
        release()
    } 
})

app.listen(8080, () => {
    console.log("Connected to backend now")
})
