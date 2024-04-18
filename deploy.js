const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
    "your 12 word mnemonic",
    "https://rinkeby.infura.io/v3/989fd50fdbe843248288caaf4bab85d8"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    // console.log(accounts);
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object})
        .send({ from: accounts[0], gas: "1000000" });
    console.log("Contract deployed to: ", result.options.address);
    provider.engine.stop();
};

deploy();