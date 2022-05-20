import { useCallback, useEffect } from 'react'
import useActiveWeb3React from './../useActiveWeb3React'
import { ethers } from 'ethers'
import { _useResolveCall } from './../utils/_useResolveCall'
import { useERC721Contract } from './useContract'
import { ipfsReplaceUri } from './../../services/ipfs'
import { LAND_ADDRESS } from '../../constants/addressConstants'

export const useMint = () => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useERC721Contract(LAND_ADDRESS)

    const mint = useCallback(async () => {
        if (account) {
            try {
                const tx = await erc721Contract.mint(account, 1, {
                    from: account,
                    value: ethers.utils.parseEther('0'),
                })

                const tokenId = await tx.wait().then((v) => {
                    return parseInt(Number(v.logs[0].topics[3]))
                })

                return tokenId
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    return _useResolveCall(mint, null, {})
}

export const useFetchNft = (tokenId) => {
    const erc721Contract = useERC721Contract(LAND_ADDRESS)

    const fetchNft = useCallback(async () => {
        const tokenUri = await erc721Contract.tokenURI(tokenId)

        const uri = ipfsReplaceUri(tokenUri)

        const nft = await fetch(uri).then((res) => res.json())
        return { ...nft, image: ipfsReplaceUri(nft.image) }
    }, [erc721Contract, tokenId])

    return _useResolveCall(fetchNft, null, {})
}

export const useGetNft = (tokenId) => {
    const { account } = useActiveWeb3React()
    const { fetch, ...rest } = useFetchNft(tokenId)

    useEffect(() => {
        if (account) {
            fetch()
        }
    }, [tokenId, account])
    return { fetch, ...rest }
}
