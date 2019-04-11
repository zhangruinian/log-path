const readline = require('readline')
const path = require('path')
const fs = require('fs')
// let filepath = path.join(__dirname, 'path1.log')
let filepath = path.join(__dirname, 'gov-paths.log')
let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
    input: input
})

let pathObj = {}
let num = 0

rl.on('line', (line) => {
    // console.log(`Line from file: ${line}`)
    let length = line.split(':?->').length
    console.log(line, length, line.split(':?->'))
    pathObj['path' + length] = pathObj['path' + length] ? pathObj['path' + length] + 1 : 1
    num += 1
})

rl.on('close', (line) => {
    console.log('读取完毕', num)
    console.log(pathObj)
    fs.writeFile('path.txt', JSON.stringify(pathObj), function(error){
        error ? console.log(error) : console.log('写入成功');
    });
})
