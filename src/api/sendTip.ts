import { BigNumber, Bytes, Contract, ethers, Signer } from "ethers";
import {owner, provider, deploy_tip} from "../scripts/deploy-tip"
import { abi } from "../artifacts/src/contracts/tip.sol/Tipping.json"
import  * as IERC20 from "../artifacts/src/contracts/IERC20.sol/IERC20.json"



const tip_contract_address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const tip_contract_owner = owner.account

const tip_contract = new ethers.Contract(tip_contract_address, abi, provider)


// Tipper account setup
const tipper = {account: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
                private_key: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'}

const tipper_wallet = new ethers.Wallet(tipper.private_key, provider)

// Let's make Elon happy! //
const elonTweet = {
    link: 'https://twitter.com/elonmusk/status/1485953263040188416',
    elonmusk_id: '44196397',
    tweet_id : '1485953263040188416' 
}

const _ERC20 = new ethers.Contract('0x0000000000000000000000000000000000000000', IERC20.abi, provider)
// Eventually make an interface for token, so we can be sure that only supported token it's sended

export async function _sendTip(tipper_wallet: Signer, contract: Contract, tweetID: string, _value: BigNumber) {
    const connected_contract = contract.connect(tipper_wallet)

    const tip = await connected_contract.sendTip(tweetID, {value: _value})
    
    // This return the _tweetID from the function ↑ 
    const _tweetID = ethers.utils.defaultAbiCoder.decode(['string'], ethers.utils.hexDataSlice(tip.data, 4))

    return {tweetID: _tweetID, sender: tip.from}
}
//const test = _sendTip(elonTweet.tweet_id)

// Now can Elon claim it's tip?
async function claimTips(){
    //
}


async function getBalance () {

    const balance = await tip_contract.balanceOf()
    console.log(balance.toString())
}

//getBalance()

