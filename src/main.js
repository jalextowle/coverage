const strip = require('./strip.js')
const analyzer = require('./analyzer.js')

if (process.argv.length != 4) {
  console.log(`Usage: node main.js BUILD_PATH LOG_PATH`) 
  process.exit()
}

strip(process.argv[2], (error, info) => {
  analyzer(process.argv[3], info, (error, something) => { })
})
