if (process.argv.length != 4) {
  console.log(`Error: Expected 4 arguments but received ${process.argv.length}`) 
  process.exit()
}

require('./strip.js')(process.argv[2], (error, info) => {
  // TODO - I'm not sure what something needs to be. This needs to be renamed though
  require('./analyzer.js')(process.argv[3], info, (error, something) => { })
})
