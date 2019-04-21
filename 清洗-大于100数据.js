const readline = require('readline')
const path = require('path')
const fs = require('fs')
// let filepath = path.join(__dirname, 'path.log')
let filepath = path.join(__dirname, 'gov-paths.log')
let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
    input: input
})

let outputStr = ''
let cleanNum = 0
let limitNum = 0

rl.on('line', (line) => {
    // console.log(line, length, line.split('\t')[1].split('->'))
    let lineIp = line.split('\t')[0]
    let linePath = line.split('\t')[1]
    // console.log('原始path', lineIp, linePath)
    if (line.split('\t')[1].split('->')[0].includes('-')) {
        linePath = line.split('\t')[1].split('->').slice(1).join('->')
        console.log('true')
        cleanNum += 1
    }
    if(linePath.split('->').length >= 99){
        limitNum += 1
        return
    }
    outputStr += lineIp + '\t' + linePath + '\n'
    // console.log('清洗path', lineIp, linePath)
})


rl.on('close', (line) => {
    console.log('读取完毕', cleanNum, limitNum)
    fs.writeFile('清洗-数据.log', outputStr, function (error) {
        error ? console.log(error) : console.log('写入log成功')
    })
})
