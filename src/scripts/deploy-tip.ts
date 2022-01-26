import { ethers, providers, Signer } from "ethers";
import { abi, bytecode } from "../artifacts/src/contracts/tip.sol/Tipping.json"
// import YAML from "yaml"
// import * as fs from "fs"

// // Currently move this const in external file and export not work:
// // ERROR: no file to open
// const local_config = YAML.parse(fs.readFileSync('../config.local.yml','utf-8'))

// export const provider = new ethers.providers.JsonRpcProvider(local_config.HARDHAT.provider)

export async function deploy_tip (_signerPrivate_key: string,_provider: ethers.providers.JsonRpcProvider ) {
    // Signer setup (owner of the smart contract)
    const signer = new ethers.Wallet(_signerPrivate_key, _provider)

    // Generate contract
    const tip_factory = new ethers.ContractFactory(abi, bytecode, signer)
    const tip_contract = await tip_factory.deploy()

    await tip_contract.deployed()

    // Return address of contract deployed
    return tip_contract
}
