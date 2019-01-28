const strip = require('./strip.js')
const analyzer = require('./analyzer.js')

if (process.argv.length != 4) {
  console.log(`Error: Expected 4 arguments but received ${process.argv.length}`) 
  process.exit()
}

strip(process.argv[2], (error, info) => {
  analyzer(process.argv[3], info, (error, something) => { })
})
