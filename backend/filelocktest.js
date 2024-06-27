import lockfile from 'proper-lockfile'

const filePath = `C:/workspace/kanjitest/backend/exports/202311.xlsx`
 
if (await lockfile.check(filePath)) {
    console.log('file locked nice')
} else {
    console.log('file aint locked')
}