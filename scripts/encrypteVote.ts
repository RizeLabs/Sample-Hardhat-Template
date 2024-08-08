import { createInstance } from "./utils/instance";
import { ethers } from "hardhat"

async function main() {
    const [deployer] = await ethers.getSigners();

    // Deploy SimpleVoting contract
    const SimpleVotingFactory = await ethers.getContractFactory("SimpleVoting");
    let SimpleVoting = await SimpleVotingFactory.connect(deployer).deploy();
    console.log("SimpleVoting deployed to:", await SimpleVoting.getAddress());

    let SimpleVotingContractAddress = await SimpleVoting.getAddress();
    const SimpleVotingContractInstance = await ethers.getContractAt('SimpleVoting', SimpleVotingContractAddress, deployer);

    // let's add a proposal first 
    let txn = await SimpleVotingContractInstance["addProposal(address,string)"](
        deployer.address,
        "Proposal 1",
    );

    await txn.wait();

    // let's vote for the proposal
    // Create fhevmjs instance to encrypt transfer amount
    const instance = await createInstance();
    const vote = true;
    console.log(`Plaintext vote: ${vote}`);
    const input = instance.createEncryptedInput(SimpleVotingContractAddress, deployer.address)
    input.addBool(vote);
    const { handle, data } = input.encrypt();
    console.log("Encrypted vote (handle, data):", handle, data);

    txn = await SimpleVotingContractInstance["voteProposal(address,bytes32)"](
        deployer.address,
        handle[0],
        data
    );

    await txn.wait();
    console.log("Voted successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});