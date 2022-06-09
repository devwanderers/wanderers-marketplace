import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    // nftIdSelector,
    nftsSelector,
    nftAvatarsReducerSelector,
} from './selectors'
import * as actions from './actions'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'
import { useERC721Contract } from '../../../hooks/web3Hooks/useContract'
import { ipfsReplaceUri } from './../../../services/ipfs'
// import { useNavigate } from 'react-router-dom'
import { NFT_ADDRESS_GENESIS } from './../../../constants/addressConstants'

export const useNftAvatarReducer = () => {
    return useSelector(nftAvatarsReducerSelector)
}

export const useFetchNftAvatars = () => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()

    const erc721Contract = useERC721Contract(NFT_ADDRESS_GENESIS)

    const fetchNftAvatarsData = useCallback(async () => {
        if (!account) return
        try {
            dispatch(actions.setNftAvatar.pending())
            const nftIds = await erc721Contract.walletOfOwner(account)
            if (nftIds?.length === 0 || !Array.isArray(nftIds))
                dispatch(
                    actions.setNftAvatar.fulfilled({ nfts: [], nftIds: [] })
                )

            const promises = nftIds.reduce((acc, v) => {
                return [...acc, erc721Contract.tokenURI(v)]
            }, [])

            const uris = await Promise.all(promises)
            const urisPromises = uris.map((uri) => {
                const newUri = ipfsReplaceUri(uri)
                // Must delete

                // newUri = newUri.replace(
                //     'Qme3xnUh9NmPa9EMcAUwyRM67x3JGJoB1yTnp5Bk3Pmh8Q',
                //     'QmU1t74BcGEEqNX438VnE3M2WiLdAUswYquSgQBo258Nvb'
                // )
                return fetch(newUri).then((res) => res.json())
            }, [])

            const nfts = await Promise.all(urisPromises)
            dispatch(
                actions.setNftAvatar.fulfilled({
                    nfts: nfts.map((v, index) => {
                        return {
                            ...v,
                            tokenId: parseInt(Number(nftIds[index]._hex)),
                            image: ipfsReplaceUri(v.image),
                        }
                    }),
                    nftIds,
                })
            )
        } catch (error) {
            console.log('Failed to get nfts', error)
            dispatch(actions.setNftAvatar.rejected(error))
            throw error
        }
    }, [account, erc721Contract, dispatch])

    useEffect(() => {
        fetchNftAvatarsData()
    }, [library, account])
}

export const useNftAvatars = () => {
    return useSelector(nftsSelector)
}
