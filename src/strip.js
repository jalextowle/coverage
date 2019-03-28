const fs = require('fs')
const getPCs = require('./pc.js')

// TODO - There should probably be more error handling logic
// Build is the path to the build/contracts folder to strip
module.exports = (build, callback) => {
  fs.readdir(build, (error, items) => {
    if (error) callback(error)
    getInfoFromFiles(build, items, callback)
  })
}

function getInfoFromFiles(path, files, callback) {
  console.log(path)
  let arr = [];
  let getInfoFromIdx = (idx) => {
    if (idx != files.length) {
      if (files[idx] !== 'Migrations.json') {
        fs.readFile(path + files[idx], (error, content) => {
          if (error) callback(error)
          let json = JSON.parse(content) 
          arr.push({
            name: json.contractName,
            bytecode: json.deployedBytecode,
            ideal_pcs: getPCs(json.deployedBytecode),
            test_pcs: new Set([])
          })
          getInfoFromIdx(idx + 1)
        })
      } else {
        getInfoFromIdx(idx + 1)
      }
    } else {
      callback(null, arr)
    }
  }
  getInfoFromIdx(0)
}
