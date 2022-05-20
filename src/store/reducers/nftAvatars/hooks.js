/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    nftIdSelector,
    nftsSelector,
    nftAvatarsReducerSelector,
} from './selectors'
import * as actions from './actions'
import AvatarDestinareAbi from '../../../abi/AvatarDestinare.json'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'
import { ethers } from 'ethers'
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
        console.log({ erc721Contract })
        dispatch(actions.setNftIDsAvatar.pending())
        erc721Contract
            .walletOfOwner(account)
            .then((res) => dispatch(actions.setNftIDsAvatar.fulfilled(res)))
            .catch((err) => {
                console.log('Failed to get nft ids', err)
                dispatch(actions.setNftIDsAvatar.rejected(err))
            })
    }, [erc721Contract, dispatch])

    useEffect(() => {
        if (account) {
            fetcNftIDS()
        }
    }, [account])

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

        Promise.all(promises)
            .then((uris) => {
                const urisPromises = uris.map((uri) => {
                    let newUri = ipfsReplaceUri(uri)
                    // Se debe eliminar
                    newUri = newUri.replace(
                        'Qme3xnUh9NmPa9EMcAUwyRM67x3JGJoB1yTnp5Bk3Pmh8Q',
                        'QmU1t74BcGEEqNX438VnE3M2WiLdAUswYquSgQBo258Nvb'
                    )

                    return fetch(newUri).then((res) => res.json())
                }, [])
                Promise.all(urisPromises)
                    .then((nfts) => {
                        dispatch(actions.setNftAvatar.fulfilled(nfts))
                    })
                    .catch((err) => {
                        console.log('Failed to get nfts', err)
                        dispatch(actions.setNftAvatar.rejected(err))
                        throw err
                    })
            })
            .catch((err) => {
                console.log('Failed to get nfts', err)
                dispatch(actions.setNftAvatar.rejected(err))
                throw err
            })
    }, [nftIds, erc721Contract, dispatch])

    useEffect(() => {
        if (account && nftIds.length > 0) fetchNftAvatarsData()
    }, [account, nftIds])

    return nfts
}

// 1.
