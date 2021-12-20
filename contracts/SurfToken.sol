// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./ERC20.sol";

/**
 * @dev Optional functions from the ERC20 standard.
 */
contract SurfToken is ERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    address private owner_address = 0x2CeFB30D053Ae58F199a0f24DE4b5Ad3C858E3cF;

    /**
     * @dev Sets the values for `name`, `symbol`, and `decimals`. All three of
     * these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_, uint8 decimals_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view override returns  (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address account,uint256 amount) public{
        require(owner_address == msg.sender, "Only owner can mint!!");
        _mint(account, amount);
    }

    function balanceNow(address account) public view returns (uint256){
        return balanceOf(account);
    } 

    function transferNow(address recipient, uint256 amount) public returns (bool){
       return transfer(recipient, amount);
    }

    function transferFromNow(address sender, address recepient, uint256 amount) public returns (bool) {
        return transferFrom(sender, recepient, amount);
    }

}