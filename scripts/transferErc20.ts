import { createInstance } from "./utils/instance";
import { ethers } from "hardhat"

async function main() {
    const [deployer, recipient] = await ethers.getSigners();
    console.log('deployer address:', deployer);
    console.log('recipient address:', recipient);

    const eERC20Factory = await ethers.getContractFactory("eERC20");
    let eERC20  = await eERC20Factory.connect(deployer).deploy();
    console.log("eERC20 deployed to:", await eERC20.getAddress());

    let eERC20Address = await eERC20.getAddress();

    const instance = await createInstance(eERC20Address, deployer, ethers);
    const encryptedAmount = instance.encrypt64(1000);
    console.log("Encrypted amount:", encryptedAmount);

    const eERC20Instance = await ethers.getContractAt('eERC20', eERC20Address, deployer);

    const tx = await eERC20Instance.transfer(recipient.address.toString(), encryptedAmount);
    await tx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});