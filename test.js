const fs = require('fs')
fs.readFile('./log', (error, contents) => {
  if (error) {
    console.log(error)
  }
  contents = String(contents).split('\n')
  contents = contents.slice(0, contents.length - 1).slice(362, contents.length - 1)
  console.log(contents) 
})
