// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract HANDSREE is Initializable, ERC20Upgradeable, OwnableUpgradeable {

    address public uniswapPair;

    event eventBought(address _address, uint256 _amount);

    function initialize(string memory name, string memory symbol) public initializer {
        __ERC20_init(name, symbol);
        __Ownable_init();
        _mint(msg.sender, 10000000 * 10 ** decimals());

        uniswapPair = 0xf36D4a08E8Cfd94bc025d5f3f36030275F9F8685;
    }

    function setUniswapPairAddress(address _newAddress) public onlyOwner {
        uniswapPair = _newAddress;
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        
        if (owner == uniswapPair) {
            emit eventBought(to, amount);
        }
        return true;
    }
}
