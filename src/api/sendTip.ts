import { BigNumber, Bytes, Contract, ethers, Signer } from "ethers";
import {deploy_tip} from "../scripts/deploy-tip"
import { abi } from "../artifacts/src/contracts/tip.sol/Tipping.json"
import  * as IERC20 from "../artifacts/src/contracts/IERC20.sol/IERC20.json"

/** 
 * @example
 * import * as fs from "fs"
 * import YAML from "yaml"
 *
 * const local_config = YAML.parse(fs.readFileSync('../config.local.yml','utf-8'))
 *
 * // This address work only with contract deployed on clean hardhat node
 * // using the variable contract_owner in config.local.yml
 * const tip_contract_address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
 * const tip_contract_owner = local_config.HARDHAT.contract_owner.address
 * const tip_contract = new ethers.Contract(tip_contract_address, abi, provider)
 
 * const tipper_wallet = new ethers.Wallet(local_config.HARDHAT.tipper_0.private_key, provider)
*/

// Eventually make an interface for token, so we can be sure that only supported token it's sended
// If we need to change network we need to implement the contract of the token we want to support, per network
export async function _sendTip(tipper_wallet: Signer, contract: Contract, tweetID: string, _value: BigNumber) {
    const connected_contract = contract.connect(tipper_wallet)

    const tip = await connected_contract.sendTip(tweetID, {value: _value})
    
    // This return the _tweetID from the function ↑ 
    const _tweetID = ethers.utils.defaultAbiCoder.decode(['string'], ethers.utils.hexDataSlice(tip.data, 4))

    return {tweetID: _tweetID, sender: tip.from}
}

