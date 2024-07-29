import { createInstance } from "./utils/instance";

async function main() {
    const [deployer, recipient] = await ethers.getSigners();

    const eERC20 = await ethers.deployContract("eERC20");
    await eERC20.waitForDeployment();
    console.log("eERC20 deployed to:", eERC20.target);

    const instance = await createInstance(eERC20.target, deployer, ethers);
    const encryptedAmount = instance.encrypt64(1000);
    console.log("Encrypted amount:", encryptedAmount);

    const tx = await eERC20.transfer(recipient.address, encryptedAmount);
    await tx.wait();
    console.log("Transfer completed");

    const publicKey = instance.getPublicKey(eERC20.target);
    const encryptedBalance = await eERC20.balanceOf(
        deployer.address,
        publicKey?.publicKey,
        publicKey?.signature
    );
    const decryptedBalance = instance.decrypt(eERC20.target, encryptedBalance);
    console.log("Your decrypted balance:", decryptedBalance.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});