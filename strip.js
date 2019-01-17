const fs = require('fs')
const sha256 = require('ethers').utils.sha256

fs.readdir(process.argv[2], (error, items) => {
  if (error) {
    console.log(error)
  } else {
    getBytecode(process.argv[2], items, (error, bytecode) => {
      for (let i = 0; i < bytecode.length; i++) {
        console.log(bytecode[i].bytecode)
        let hash = sha256(bytecode[i].bytecode)
//        console.log(hash)
      }
    })
  }
})

function getBytecode(path, files, callback) {
  let arr = []
  let closure = (idx) => {
    if (idx != files.length) {
      fs.readFile(path + files[idx], (error, content) => {
        if (error) {
          callback(error)
        } else {
          let json = JSON.parse(content) 
          arr.push({
            name: json.contractName,
            bytecode: json.bytecode,
            deployed: json.deployedBytecode
          })
          closure(idx + 1)
        }
      })
    } else {
      callback(null, arr)
    }
  }
  closure(0)
}
