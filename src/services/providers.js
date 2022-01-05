import { ethers } from 'ethers'

export const genericProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    'any'
)
