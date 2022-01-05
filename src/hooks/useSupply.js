import { ethers } from 'ethers'
import { useContractCall } from '@usedapp/core'
import destinareContractAbi from '../abi/DestinareContract.json'

const contractAddress = process.env.DESTINARE_CONTRACT
const contractInterface = new ethers.utils.Interface(destinareContractAbi)

export default function useSupply() {
    const [values] =
        useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: 'totalSupply',
            args: [],
        }) ?? []
    return values
}
