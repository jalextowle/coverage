const fs = require('fs')

// These constants encode how long the identifying part of the string is. 
// The parts of the strings that will actually be used by this program are the parts
// after these lengths
const PC_LENGTH = 4
const BYTECODE_LENGTH = 10

// This constant is the length of the log file that is produced with an empty
// truffle test suite. Since no non-truffle contracts are used during the process
// of creating this part of all log files, the log file is truncated to avoid wasting
// time on analyzing these logs
const EMPTY_LOG_LENGTH = 362


// @dev - Given a set of logs and an array of contract info, compute the code coverage
//        of the test suite.
// @param logs - The path to the logs that will be analyzed
// @param info - The data from the build/contracts folder
// @param callback - A callback function that accepts an error and a tracker 
module.exports = (logs, info, callback) => {
  fs.readFile(logs, (error, contents) => {
    if (error) callback(error)
    let tracker = {} 
    let arr = contents.toString('utf8').split('\n')

    // The last element of the array will be an empty string, and this should be discarded 
    arr = arr.slice(0, arr.length - 1)
    arr = arr.slice(EMPTY_LOG_LENGTH, arr.length)

    for (let i = 0; i < arr.length; i += 2) {
      let bytecode = arr[i].slice(BYTECODE_LENGTH, arr[i].length)
      let pc = Number(arr[i + 1].slice(PC_LENGTH, arr[i + 1].length))
      addPCToInfo(info, tracker, bytecode, pc)
    }

    // Call the callback function with null to indicate that there were no errors during 
    // execution
    callback(null)
  })
}

function addPCToInfo(info, tracker, bytecode, pc) {
  if (tracker[bytecode] !== undefined) {
    info[tracker[bytecode]].test_pcs.add(pc)
  } else if (bytecode !== "") {
    for (let j = 0; j < info.length; j++) {
      if (bytecode === info[j].bytecode.slice(2, info[j].bytecode.length)) {
        tracker[bytecode] = j
        info[j].test_pcs.add(pc)
        break
      }
    }
  }
}
