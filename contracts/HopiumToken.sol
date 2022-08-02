// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HopiumToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("Hopium Token", "HTN") {

        _mint(msg.sender, initialSupply);
    }
}
