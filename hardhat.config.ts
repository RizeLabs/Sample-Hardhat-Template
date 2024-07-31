import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      url: `http://localhost:8545`,
      accounts: ["<PRIVATE_KEY>"]
    }
  }
};

export default config;
