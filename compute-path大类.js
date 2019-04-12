const readline = require('readline')
const path = require('path')
const fs = require('fs')
// let filepath = path.join(__dirname, 'path.log')
let filepath = path.join(__dirname, 'gov-paths.log')
let input = fs.createReadStream(filepath)
const rl = readline.createInterface({
    input: input
})

let pathObj = {}

let pathNum = 0

rl.on('line', (line) => {
    pathNum += 1
    let length = line.split(':?->').length
    // console.log(line, length, line.split('\t')[1].split('->'))
    let pathArr = line.split('\t')[1].split('->')
    let pathLine = ''
    pathArr.forEach((path) => {
        pathLine = pathLine + '→' + path.split(':')[0].replace(/[0-9]/ig,"")
    })
    pathLine = pathLine.slice(1)
    console.log('pathLine', pathLine)
    pathObj[pathLine] = pathObj[pathLine] ? pathObj[pathLine] + 1 : 1
})


rl.on('close', (line) => {
    console.log('读取完毕')
    console.log(pathObj)
    let pathsArr = Object.keys(pathObj)
    let pathToArr = []
    pathsArr.forEach((path, index) => {
        // pathToArr.push([path, pathObj[path], (pathObj[path]/ pathNum).toFixed(4)])
        pathToArr.push(
          {path: path, num: pathObj[path], rate:(pathObj[path]/ pathNum).toFixed(4) }
          // [path, pathObj[path], (pathObj[path]/ pathNum).toFixed(4)]
        )
    })
    pathToArr = pathToArr.filter((path) => {
        return path.num > 4000
    })
    console.log(pathToArr)
    fs.writeFile('pathLineCompute大类.csv', JSON.stringify(pathToArr), function (error) {
        error ? console.log(error) : console.log('写入成功')
    })
})
