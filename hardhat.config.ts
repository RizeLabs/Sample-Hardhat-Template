import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    local: {
      url: `http://localhost:8545`,
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", "2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6"]
    }
  }
};

export default config;
