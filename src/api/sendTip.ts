import { BigNumber, Bytes, Contract, ethers, Signer } from "ethers";
import { createClient } from "@supabase/supabase-js"
import axios from "axios"

import {deploy_tip} from "../scripts/deploy-tip"
import { abi } from "../artifacts/src/contracts/tip.sol/Tipping.json"
import  * as IERC20 from "../artifacts/src/contracts/IERC20.sol/IERC20.json"

// Eventually make an interface for token, so we can be sure that only supported token it's sended
// If we need to change network we need to implement the contract of the token we want to support, per network
export async function _sendTip(tipper_wallet: Signer, contract: Contract, tweetID: string, _value: BigNumber) {
    const connected_contract = contract.connect(tipper_wallet)

    const tip = await connected_contract.sendTip(tweetID, {value: _value})
    
    // This return the _tweetID from the function ↑ 
    const _tweetID = ethers.utils.defaultAbiCoder.decode(['string'], ethers.utils.hexDataSlice(tip.data, 4))

    return {
        tweetID: _tweetID, 
        sender: tip.from, 
        value: ethers.utils.formatEther(tip.value)}
}

