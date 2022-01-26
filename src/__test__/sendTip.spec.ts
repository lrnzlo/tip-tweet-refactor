// THIS IS FOR TESTING PURPOSE LOCAL ONLY - NEED TO REFACTOR!!!
import { Contract, ethers } from "ethers";
import { deploy_tip } from "../scripts/deploy-tip";
import { _sendTip } from "../api/sendTip";
import { abi } from "../artifacts/src/contracts/tip.sol/Tipping.json"
import YAML from "yaml"
import * as fs from "fs"
import { any } from "hardhat/internal/core/params/argumentTypes";

describe("Send Tip to the contract", () => {
    let contract_address: any;
    let tip_contract: any;
    let tipper_wallet: any;
    let tx: any;
    let local_config: any;
    let signer: any;
    let provider: any;

    beforeAll(async () => {

        local_config = YAML.parse(fs.readFileSync('src/config.local.yml','utf-8'))
        
        // Deploy contract
        signer = local_config.HARDHAT.contract_owner.private_key
        provider = new ethers.providers.JsonRpcProvider(local_config.HARDHAT.provider)

        contract_address = (await deploy_tip(signer, provider)).address
        tip_contract = new ethers.Contract(contract_address, abi, provider)
        
        // Tipper Setup
        tipper_wallet = new ethers.Wallet(local_config.HARDHAT.tipper_0.private_key, provider)

        // Transaction
        tx = await _sendTip(tipper_wallet, tip_contract, local_config.ELON_TWEET.tweet_id, ethers.utils.parseEther('10'))
    })

    it("Should deposit 10 ETH in tip_contract", async () => {
        const contract_balance = await tip_contract.balanceOf()

        expect(ethers.utils.formatEther(contract_balance)).toEqual('10.0' || 10.0)
    }) 
    
    it("Should return the same ID of the tweet to be tipped", () => {
        expect(tx.tweetID[0]).toEqual(local_config.ELON_TWEET.tweet_id)
    })
})

