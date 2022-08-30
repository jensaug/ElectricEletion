//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract ElectricElection {
    // Some string type variables to identify the token.
    string public name = "Electric Election";
    string public symbol = "ELEL";

    // The fixed amount of tokens, stored in an unsigned integer type variable.
    uint256 public maxVoters = 10000000; // Maximum number of eligibal votes
    uint256 public minVotingInterval = 3600 * 24; //Only vote once a day
    
    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account's balance.
    mapping(address => uint256) votes;

    // The Transfer event helps off-chain applications understand
    // what happens within your contract.
    event vote(address indexed voter);

    /**
     * Contract initialization.
     */
    constructor() {
        // The initiator is the only one who may configure the election
        owner = msg.sender;
    }

    // /**
    //  * A function to transfer tokens.
    //  *
    //  * The `external` modifier makes a function *only* callable from *outside*
    //  * the contract.
    //  */
    // function transfer(address to, uint256 amount) external {
    //     // Check if the transaction sender has enough tokens.
    //     // If `require`'s first argument evaluates to `false` then the
    //     // transaction will revert.
    //     require(balances[msg.sender] >= amount, "Not enough tokens");

    //     // Transfer the amount.
    //     balances[msg.sender] -= amount;
    //     balances[to] += amount;

    //     // Notify off-chain applications of the transfer.
    //     emit Transfer(msg.sender, to, amount);
    // }

    // /**
    //  * Read only function to retrieve the token balance of a given account.
    //  *
    //  * The `view` modifier indicates that it doesn't modify the contract's
    //  * state, which allows us to call it without executing a transaction.
    //  */
    // function balanceOf(address account) external view returns (uint256) {
    //     return balances[account];
    // }
}