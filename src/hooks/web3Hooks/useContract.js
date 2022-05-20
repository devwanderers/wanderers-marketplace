import { ethers } from 'ethers'
import { useMemo } from 'react'
import useActiveWeb3React from './../useActiveWeb3React'
import nftAbi from '../../abi/AvatarDestinare.json'

const getContract = (abi, address, signer) => {
    return new ethers.Contract(address, abi, signer)
}

const getERC721Contract = (address, signer) => {
    return getContract(nftAbi, address, signer)
}

export const useERC721Contract = (address) => {
    const { library } = useActiveWeb3React()

    return useMemo(
        () => getERC721Contract(address, library.getSigner()),
        [address, library]
    )
}
