const readline = require('readline')
const path = require('path')
const fs = require('fs')
// let filepath = path.join(__dirname, 'path.log')
// let filepath = path.join(__dirname, 'gov-paths.log')
let filepath = path.join(__dirname, '清洗-数据.log')
let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
    input: input
})

let num = 0
let ipArr = []

rl.on('line', (line) => {
    let lineIp = line.split('\t')[0]
    ipArr.push(lineIp)
})

rl.on('close', (line) => {
    console.log(ipArr.length)
    num = new Set(ipArr).size
    console.log('ip个数', num)
    /*fs.writeFile('ip个数.csv', JSON.stringify(ipArr), function (error) {
        error ? console.log(error) : console.log('写入成功')
    })*/
})
