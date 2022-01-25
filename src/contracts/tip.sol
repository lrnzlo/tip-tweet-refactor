/**
When you tip a tweet, you create a signature (encrypted message by metamask) and you transfer some eth to the smart contract. 
To claim that amount you will need the exact signature.
So I save that signature to our DB and only the author of that tweet can get that signature
the contract actually maps it to a signature
the contract doesnt know who is going to claim the tip
it only knows who tipped ... but if you have the signature you can claim the tip

think of it as a bank check
when you tip a tweet you sign a check and you save it to our db
and you tell our backend that check can only be fetched by the twitter user who is the author of the tweet you tipped
What I wanted to achieve was:
    [] automatically signing with twitter... 
    [] I dont want the user to click a button to sign in with his twitter account ... 
    [] if he tries to access the page /tip it should check if hes logged in with a valid twitter account
    [] if hes not... then automatically initiate the twitter sign in flow
 */

// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Tipping {
    address public owner;

    // When contract been deployed to network, save the address as the owner of the contract
    constructor() payable {
        owner = msg.sender;
    }

    // Make this contract payable
    receive() external payable {}

    // Contract balance
    function balanceOf() public view returns (uint256){
        return address(this).balance;
    }
    
    // TIPPER
    function _sendTip(IERC20 _token, uint256 _amount, string memory _tweetID) external payable returns(address, uint256, string memory) {
        // When the trx it's valid: 
        // Backend service transpile the trx amount and tweet ID to a DB with the author_id (from api/tweets/id?expansions=author_id).
        // If the user that connect to the service have the same author_id(user_id?) can collect all the tips derived from the tweet property
        // Implementing IERC20 interface we can control which token receive, this is particular useful as we plan to implement different network
        uint256 erc20balance = _token.balanceOf(address(msg.sender));
        
        require(erc20balance > 0, "Please add some token to your wallet!");
        _token.transfer(address(this), _amount);
        
        // I am not able to understand exactly how you want compose the signature at the moment, but we REALLY need that?
        // In fact we store in a DB the author_id connected to _tweetID for which the token is received
        // So we can retrieve the user_id after succesfully login with twitter API and compare it against DB next @withdrawTip function
        
        // Return Tipper address, Tip amount, Tweet ID for further application
        return(msg.sender, msg.value, _tweetID);
    }

    function sendTip(string memory _tweetID) external payable returns(string memory){
        require(msg.sender.balance > 0, "You NO money!");
        return (_tweetID); 
    }

    // TIPPED
    function withdrawTip(bytes32 user_id) public {
        // If user_id is the owner of any tipping jar:
        // Retrieve the total tip

    }
}