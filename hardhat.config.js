require("@nomiclabs/hardhat-ethers");

const dotenv = require("dotenv");
dotenv.config();
const { PRIVATE_KEY } = process.env;

const {
  NET1_URL,
  NET2_URL
} = require("./scripts/constants.json");

module.exports = {
  solidity: "0.8.4",
  networks: {
    bsc: {
      url: NET1_URL,
      accounts: [PRIVATE_KEY]
    },
    polygon: {
      url: NET2_URL,
      accounts: [PRIVATE_KEY]
    },
  },
};