require('./support/chai.js')
const getProgramCounters = require('../src/pc.js')

describe('#PC', () => {
  context('should correctly parse bytecode that doesn\'t have any push instructions', () => {

    it('test1', () => {
      getProgramCounters('0x00').should.be.deep.eq([0])      
    })

    it('test2', () => {
      getProgramCounters('0x0001').should.be.deep.eq([0, 1])      
    })

    it('test3', () => {
      getProgramCounters('0x00015b').should.be.deep.eq([0, 1, 2])      
    })

  })

  context('should correctly parse bytecode that has push instructions', () => {

    it('test1', () => {
      getProgramCounters('0x6000').should.be.deep.eq([0])      
    })

    it('test2', () => {
      getProgramCounters('0x610001').should.be.deep.eq([0])      
    })

    it('test3', () => {
      getProgramCounters('0x600061015b').should.be.deep.eq([0, 2])      
    })

  })
})
