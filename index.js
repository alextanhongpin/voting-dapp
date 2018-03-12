const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const abi =  [
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "totalVotesFor",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "validCandidate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateList",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidate",
				"type": "bytes32"
			}
		],
		"name": "voteForCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "candidateNames",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

const VotingContract = web3.eth.contract(abi)
// Obtained from deployedContract.address through the node console
const contractInstance = VotingContract.at('0x9566eb343f3a52d4c395d624b557ea6b62249cb2')
const candidates = {
	Rama: 'candidate-1', 
	Nick: 'candidate-2',
	Jose: 'candidate-3'
}

function voteForCandidate() {
	const candidateName = document.getElementById('candidate').value
	console.log('got candidateName:', candidateName)
	contractInstance.voteForCandidate(candidateName, {
		from: web3.eth.accounts[0]
	}, () => {
		const container = candidates[candidateName]
		document.getElementById(container).innerHTML = contractInstance.totalVotesFor.call(candidateName)
	})
}

window.onload = function () {
	const candidateNames = Object.keys(candidates)
	candidateNames.forEach((name) => {
		const value = contractInstance.totalVotesFor.call(name)
		document.getElementById(candidates[name]).innerHTML = contractInstance.totalVotesFor.call(name)
	})
}

document.getElementById('submit').addEventListener('click', voteForCandidate, false)