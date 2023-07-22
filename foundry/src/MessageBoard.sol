// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MessageBoard {

    // STORAGE
    string public message;

    // EVENTS
    event MessageSet(
        address sender,
        string newMessage
    );

    // FUNCTIONS
    function setMessage(string calldata newMessage) external {
        message = newMessage;
        emit MessageSet(msg.sender, newMessage);
    }
}
