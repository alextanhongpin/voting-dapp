# Voting DApp

## Setup web3

```bash
$ node

> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

> web3.eth.accounts
```

Output:

```
[ '0xb00f469e55aafeddb03204ed1345d1fdc8e032b7',
  '0x4615629995fbab391ce037d15b3e8724d0696c80',
  '0x96df7290eb7a01c418f8e901bd7bfe3f6c6b1100',
  '0x287a3fb74dd7bf97a8c484e5067edf0e6ab38e43',
  '0x3051d6daeee2fde2d6098a69d11487154ee2c1ec',
  '0x200a37a36d115d08a25833631fa443ceda6ecd6c',
  '0xcfb8abe7ab2a69dfd3bfba7c4d9b0b46b259e04b',
  '0x80834545c076351b77e96958d98aa71b88cdb969',
  '0x1c71d3777ffd7b59e6c14365329d14a7ca5f3690',
  '0x280db2ac6df9d181a1ca1fd649222147f051296b' ]
```
## Compile the contract

```bash
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
```

## Deploy the contract

```bash
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Rama', 'Nick', 'Jose'], { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 })
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
```

## Interact with the contract

```bash
> contractInstance.totalVotesFor.call('Rama')
BigNumber { s: 1, e: 0, c: [ 0 ] }
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
> contractInstance.totalVotesFor.call('Rama').toLocaleString()
```

## Reference:

- [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 1](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)
- [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 2](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f)
- [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 3](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-3-331c2712c9df)