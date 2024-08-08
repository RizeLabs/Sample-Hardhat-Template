import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.25",
  networks: {
    local: {
      url: `https://rpc.encifher.io`,
      accounts: [`0xdccad5981ea29ed47ce96ed4860c455927703771f526f6d177986a3fd14f0a36`],
    }
  }
};

export default config;
