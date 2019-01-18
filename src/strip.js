const fs = require('fs')

// TODO - There should probably be more error handling logic
// Build is the path to the build/contracts folder to strip
module.exports = (build, callback) => {
  fs.readdir(process.argv[2], (error, items) => {
    if (error) callback(error)
    getBytecode(process.argv[2], items, callback)
  })
}

function getBytecode(path, files, callback) {
  let arr = []
  let closure = (idx) => {
    if (idx != files.length) {
      fs.readFile(path + files[idx], (error, content) => {
        if (error) callback(error)
        let json = JSON.parse(content) 
        arr.push({
          name: json.contractName,
          bytecode: json.bytecode,
          deployed: json.deployedBytecode, 
          pc_set: new Set([])
        })
        closure(idx + 1)
      })
    } else {
      callback(null, arr)
    }
  }
  closure(0)
}
