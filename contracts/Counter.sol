// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract Counter {
    uint256 public count = 0;

    function increment() public {
        count += 1;
    }
}