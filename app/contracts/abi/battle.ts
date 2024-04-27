export const battleAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_squadVerifier",
        type: "address",
      },
      {
        internalType: "address",
        name: "_battleVerifier",
        type: "address",
      },
      {
        internalType: "address",
        name: "_btcUsdDataFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ethUsdDataFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_linkUsdDataFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "userOneSquad",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "userOneSquadHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "userTwo",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "userTwoSquad",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "result",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "btcUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "ethUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "linkUsd",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "started",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "joined",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ended",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Battle.Params",
        name: "params",
        type: "tuple",
      },
    ],
    name: "Ended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "userOneSquad",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "userOneSquadHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "userTwo",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "userTwoSquad",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "result",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "btcUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "ethUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "linkUsd",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "started",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "joined",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ended",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Battle.Params",
        name: "params",
        type: "tuple",
      },
    ],
    name: "Joined",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "userOneSquad",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "userOneSquadHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "userTwo",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "userTwoSquad",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "result",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "btcUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "ethUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "linkUsd",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "started",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "joined",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ended",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Battle.Params",
        name: "params",
        type: "tuple",
      },
    ],
    name: "Started",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_SQUAD_SIZE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "battleVerifier",
    outputs: [
      {
        internalType: "contract IVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "btcUsdDataFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "userOneSquad",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "_battleResult",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_battleResultProof",
        type: "bytes",
      },
    ],
    name: "end",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "ethUsdDataFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBtcUsdDataFeedLatestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEthUsdDataFeedLatestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkUsdDataFeedLatestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getParams",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "userOneSquad",
            type: "uint256[]",
          },
          {
            internalType: "bytes32",
            name: "userOneSquadHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "userTwo",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "userTwoSquad",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "result",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "btcUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "ethUsd",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "linkUsd",
            type: "int256",
          },
          {
            internalType: "uint256",
            name: "started",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "joined",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ended",
            type: "uint256",
          },
        ],
        internalType: "struct Battle.Params",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_squad",
        type: "uint256[]",
      },
    ],
    name: "join",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "linkUsdDataFeed",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "params",
    outputs: [
      {
        internalType: "bytes32",
        name: "userOneSquadHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "userTwo",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "result",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "btcUsd",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "ethUsd",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "linkUsd",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "started",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "joined",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ended",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "squadVerifier",
    outputs: [
      {
        internalType: "contract IVerifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_squadProof",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "_squadHash",
        type: "bytes32",
      },
    ],
    name: "start",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
