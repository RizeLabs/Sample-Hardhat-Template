// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "fhevm-contracts/contracts/token/ERC20/EncryptedERC20.sol";

contract eERC20 is EncryptedERC20 {
    constructor() EncryptedERC20("encryptedToken", "eERC20") {
        _mint(10000, msg.sender);
    }
}