const strip = require('./strip.js')
const analyzer = require('./analyzer.js')

if (process.argv.length != 4) {
  console.log(`Usage: node main.js BUILD_PATH LOG_PATH`) 
  process.exit()
}

strip(process.argv[2], (error, info) => {
  if (error) {
    console.log(error)
  } else {
    analyzer(process.argv[3], info, (error, tracker) => { 
      if (error) {
        console.log(error)
      } else {
        for (let i = 0; i < info.length; i++) {
          let coverage = (info[i].test_pcs.size / info[i].ideal_pcs.length) * 100
          console.log(`Code coverage of ${info[i].name}: ${coverage}%`)   
        }
      }
    })
  }
})
