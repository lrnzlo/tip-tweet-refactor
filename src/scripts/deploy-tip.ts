import { ethers } from "ethers";
import { abi, bytecode } from "../artifacts/src/contracts/tip.sol/Tipping.json"

// Put this in env variable
export const owner = {  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
                        private_key: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'};

export const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/')



export async function deploy_tip () {
    // Setup provider and Signer(owner of the smart contract)
    // This is from hardhat test node, should be transfer to a env variable

    const signer = new ethers.Wallet(owner.private_key ,provider)

    // Generate contract
    const tip_factory = new ethers.ContractFactory(abi, bytecode, signer)
    const tip_contract = await tip_factory.deploy()

    await tip_contract.deployed()

    // Return address of contract deployed
    return tip_contract
}
