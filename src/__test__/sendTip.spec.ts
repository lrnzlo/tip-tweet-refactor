// THIS IS FOR TESTING PURPOSE LOCAL ONLY - NEED TO REFACTOR!!!
import { Contract, ethers } from "ethers";
import { owner, provider, deploy_tip } from "../scripts/deploy-tip";
import { _sendTip } from "../api/sendTip";
import { abi } from "../artifacts/src/contracts/tip.sol/Tipping.json"

// Contract Setup
let contract_address: string;
let tip_contract: Contract;
const tip_contract_owner = owner.account

describe("Send Tip to the contract", () => {
    let contract_address: any;
    let tip_contract: any;
    let tipper: any;
    let tipper_wallet: any;
    let elonTweet: any;
    let tx: any;

    beforeAll(async () => {
        contract_address = (await deploy_tip()).address
        tip_contract = new ethers.Contract(contract_address, abi, provider)
        // Tipper Setup
        tipper = {account: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
        private_key: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'}

        tipper_wallet = new ethers.Wallet(tipper.private_key, provider)

        // Let's make Elon happy! //
        elonTweet = {
        link: 'https://twitter.com/elonmusk/status/1485953263040188416',
        elonmusk_id: '44196397',
        tweet_id : '1485953263040188416' 
        }

        tx = await _sendTip(tipper_wallet, tip_contract, elonTweet.tweet_id, ethers.utils.parseEther('10'))


    })

    it("Should deposit 10 ETH in tip_contract", async () => {
        const contract_balance = await tip_contract.balanceOf()

        expect(ethers.utils.formatEther(contract_balance)).toEqual('10.0' || 10.0)
    }) 
    
    it("Should return the same ID of the tweet to be tipped", () => {
        expect(tx.tweetID[0]).toEqual(elonTweet.tweet_id)
    })
})

