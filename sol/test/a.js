const A = artifacts.require('./A')
require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(web3.BigNumber))
    .should()

contract('A', async (accounts) => {
  let a

  before(async () => {
    a = await A.new()
  })

  describe('Functions', async () => {
    it('#a', async () => {
      let value = await a.a.call()
      value.toNumber().should.be.eq(1) 
    })
  })
})
