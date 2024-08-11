import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.25",
  networks: {
    encifher: {
      url: `https://rpc.encifher.io`,
      accounts: [`0x6cfde5e65d2a1521998767a492182726cab6f067be446a79e181f4b5ac0abf78`],
      timeout: 10000000, // need to increase the timeout here 
    }
  }
};

export default config;
