import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    nftIdSelector,
    nftsSelector,
    nftAvatarsReducerSelector,
} from './selectors'
import * as actions from './actions'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'
import { useERC721Contract } from '../../../hooks/web3Hooks/useContract'
import { ipfsReplaceUri } from './../../../services/ipfs'

export const useNftAvatarReducer = () => {
    return useSelector(nftAvatarsReducerSelector)
}

export const useFetchNftAvatarId = () => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()
    const nftsIds = useSelector(nftIdSelector)
    const erc721Contract = useERC721Contract(
        process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
    )

    const fetcNftIDS = useCallback(async () => {
        dispatch(actions.setNftIDsAvatar.pending())
        erc721Contract
            .walletOfOwner(account)
            .then((res) => {
                dispatch(actions.setNftIDsAvatar.fulfilled(res))
            })
            .catch((err) => {
                console.log('Failed to get nft ids', err)
                dispatch(actions.setNftIDsAvatar.rejected(err))
            })
    }, [erc721Contract, dispatch])

    useEffect(() => {
        if (account) {
            fetcNftIDS()
        }
    }, [account, library])

    return nftsIds
}

export const useFetchNftAvatars = () => {
    const nftIds = useFetchNftAvatarId()
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()
    const nfts = useSelector(nftsSelector)

    const erc721Contract = useERC721Contract(
        process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
    )

    const fetchNftAvatarsData = useCallback(async () => {
        const promises = nftIds.reduce((acc, v) => {
            return [...acc, erc721Contract.tokenURI(v)]
        }, [])

        dispatch(actions.setNftAvatar.pending())

        try {
            const uris = await Promise.all(promises)
            const urisPromises = uris.map((uri) => {
                let newUri = ipfsReplaceUri(uri)
                // Se debe eliminar
                newUri = newUri.replace(
                    'Qme3xnUh9NmPa9EMcAUwyRM67x3JGJoB1yTnp5Bk3Pmh8Q',
                    'QmU1t74BcGEEqNX438VnE3M2WiLdAUswYquSgQBo258Nvb'
                )

                return fetch(newUri).then((res) => res.json())
            }, [])

            const nfts = await Promise.all(urisPromises)
            dispatch(actions.setNftAvatar.fulfilled(nfts))
        } catch (error) {
            console.log('Failed to get nfts', error)
            dispatch(actions.setNftAvatar.rejected(error))
            throw error
        }
    }, [nftIds, erc721Contract, dispatch])

    useEffect(() => {
        if (account && nftIds.length > 0) fetchNftAvatarsData()
    }, [account, nftIds, library])

    return nfts
}

// 1.
