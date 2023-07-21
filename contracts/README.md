## Local Development

### Prerequisites
Ensure [Foundry](https://github.com/foundry-rs/foundry) is installed. Run the command `foundryup` to make sure it is up to date.

### Installation

Clone the repo and navigate to the directory. Install the project's dependencies with the following command:
```
$ forge install
```

Configure the environment variables necesary to run the test suite. `MUMBAI_RPC_URL` needs to be supplied

Next, run the test suite with the following command:
```
$ forge test
```
All tests should pass.