import { ethers } from 'ethers'
import { useMemo } from 'react'
import useActiveWeb3React from './../useActiveWeb3React'
import nomadzLandsAbi from '../../abi/nomadzLandsAbi.json'
import nomadzDestinationsAbi from '../../abi/nomadzDestinationsAbi.json'
import NomadzRewardsAbi from '../../abi/NomadzRewards.json'
import { genericProvider } from './../../services/providers'

const getContract = (abi, address, signer) => {
    const signerOrProvider = signer ?? genericProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

const getERC721Contract = (address, signer) => {
    return getContract(nomadzLandsAbi, address, signer)
}

const getERC721LandContract = (address, signer) => {
    return getContract(nomadzDestinationsAbi, address, signer)
}
const getRewardContract = (address, signer) => {
    return getContract(NomadzRewardsAbi, address, signer)
}

export const useERC721Contract = (address) => {
    const { library, account } = useActiveWeb3React()
    return useMemo(
        () => getERC721Contract(address, library.getSigner()),
        [address, library, account]
    )
}

export const useERC721LandContract = (address) => {
    const { library, account } = useActiveWeb3React()
    return useMemo(
        () => getERC721LandContract(address, library.getSigner()),
        [address, library, account]
    )
}

export const useRewardsContract = (address) => {
    const { library, account } = useActiveWeb3React()

    return useMemo(
        () => getRewardContract(address, library.getSigner()),
        [address, library, account]
    )
}
