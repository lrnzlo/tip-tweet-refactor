import { Contract, ethers, providers, Signer } from "ethers";
import { abi, bytecode } from "../artifacts/src/contracts/tip.sol/Tipping.json"

// Maybe we can choose to abstract this function and add a parameters to choose the contract (_contractInstance?)
export async function deploy_tip (_signerPrivate_key: string,_provider: ethers.providers.JsonRpcProvider, _contractInstace?: Contract ) {
    
    // Signer setup (owner of the smart contract)
    const signer = new ethers.Wallet(_signerPrivate_key, _provider)

    // Generate contract
    if(_contractInstace){
        // Let's deploy the _contractInstance
    }
    const tip_factory = new ethers.ContractFactory(abi, bytecode, signer)
    const tip_contract = await tip_factory.deploy()

    await tip_contract.deployed()

    // Return address of contract deployed
    return tip_contract
}
