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

export const useNftAvatarReducer = () => {
    return useSelector(nftAvatarsReducerSelector)
}

export const useFetchNftAvatarId = () => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()
    const nftsIds = useSelector(nftIdSelector)
    const fetcNftIDS = useCallback(async () => {
        const contract = new library.eth.Contract(
            AvatarDestinareAbi,
            process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
        )
        dispatch(actions.setNftIDsAvatar.pending())
        contract.methods
            .walletOfOwner(account)
            .call()
            .then((res) => dispatch(actions.setNftIDsAvatar.fulfilled(res)))
            .catch((err) => {
                console.log('Failed to get nft ids', err)
                dispatch(actions.setNftIDsAvatar.rejected(err))
                throw err
            })
    }, [library, dispatch])

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

    const fetchNftAvatarsData = useCallback(async () => {
        const contract = new library.eth.Contract(
            AvatarDestinareAbi,
            process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
        )
        // const dummys = ['1', '2', '3']
        const promises = nftIds.reduce((acc, v) => {
            return [...acc, contract.methods.tokenURI(v).call()]
        }, [])
        dispatch(actions.setNftAvatar.pending())
        console.log({ promises })
        Promise.all(promises)
            .then((uris) => {
                const urisPromises = uris.reduce((acc, uri) => {
                    const newUri = uri.replace(
                        /^ipfs?:\/\//,
                        'https://nomadzland.mypinata.cloud/ipfs/'
                    )
                    console.log({ newUri })
                    return [...acc, fetch(newUri).then((res) => res.json())]
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
    }, [nftIds, library, dispatch])

    useEffect(() => {
        if (account && nftIds.length > 0) fetchNftAvatarsData()
    }, [account, nftIds])

    return nfts
}

// 1.
