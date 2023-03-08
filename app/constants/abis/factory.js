const factoryAbi = [
	{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
	},
	{
			"anonymous": false,
			"inputs": [
					{
							"indexed": true,
							"internalType": "address",
							"name": "sender",
							"type": "address"
					},
					{
							"indexed": true,
							"internalType": "address",
							"name": "receiver",
							"type": "address"
					},
					{
							"indexed": false,
							"internalType": "address",
							"name": "collection",
							"type": "address"
					}
			],
			"name": "CollectionAdded",
			"type": "event"
	},
	{
			"anonymous": false,
			"inputs": [
					{
							"indexed": false,
							"internalType": "uint8",
							"name": "version",
							"type": "uint8"
					}
			],
			"name": "Initialized",
			"type": "event"
	},
	{
			"inputs": [
					{
							"internalType": "address",
							"name": "_receiver",
							"type": "address"
					},
					{
							"internalType": "address",
							"name": "_collection",
							"type": "address"
					}
			],
			"name": "addCollection",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
	},
	{
			"inputs": [
					{
							"internalType": "address",
							"name": "_receiver",
							"type": "address"
					},
					{
							"internalType": "string",
							"name": "name",
							"type": "string"
					},
					{
							"internalType": "string",
							"name": "symbol",
							"type": "string"
					}
			],
			"name": "genesis",
			"outputs": [
					{
							"internalType": "address",
							"name": "",
							"type": "address"
					}
			],
			"stateMutability": "payable",
			"type": "function"
	},
	{
			"inputs": [],
			"name": "implementation",
			"outputs": [
					{
							"internalType": "address",
							"name": "",
							"type": "address"
					}
			],
			"stateMutability": "view",
			"type": "function"
	}
]

export default factoryAbi 