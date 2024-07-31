import { createInstance } from "./utils/instance";
import { ethers } from "hardhat"

const DECIMALS = 6;

async function main() {
    const [deployer] = await ethers.getSigners();

    // Deploy eERC20 contract
    const eERC20Factory = await ethers.getContractFactory("eERC20");
    const mintAmount = ethers.getBigInt('1000000');
    let eERC20 = await eERC20Factory.connect(deployer).deploy(mintAmount);
    console.log("eERC20 deployed to:", await eERC20.getAddress());
    console.log(`Minted ${ethers.formatUnits(mintAmount, DECIMALS)} eERC20 to ${deployer.address.toString()}`);

    let eERC20Address = await eERC20.getAddress();

    // Create fhevmjs instance to encrypt transfer amount
    const instance = await createInstance(eERC20Address, deployer, ethers);
    const transferAmountPlaintext = 1000;
    console.log(`Plaintext transfer amount: ${ethers.formatUnits(transferAmountPlaintext, DECIMALS)} eERC20`);
    const encryptedAmount = instance.encrypt64(transferAmountPlaintext);
    console.log("Encrypted amount:", encryptedAmount);

    const eERC20Instance = await ethers.getContractAt('eERC20', eERC20Address, deployer);
    const recipientAddress = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";
    console.log(`Transferring to ${recipientAddress}...`);

    const tx = await eERC20Instance["transfer(address,bytes)"](
        recipientAddress,
        encryptedAmount,
        {
            gasLimit: 10000000
        }
    );
    await tx.wait();
    console.log("Transfer successful!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});