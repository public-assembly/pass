export const messageBoardAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newMessage',
        type: 'string',
      },
    ],
    name: 'MessageSet',
    type: 'event',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'setMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
