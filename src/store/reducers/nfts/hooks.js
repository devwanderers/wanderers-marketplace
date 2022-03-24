/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch, useSelector } from 'react-redux'
import { nftIdSelector, nftsSelector, nftReducerSelector } from './selectors'
import * as actions from './actions'
import AvatarDestinareAbi from '../../../abi/AvatarDestinare.json'

export const useNftsReducer = () => {
    return useSelector(nftReducerSelector)
}

export const useFetchNftAvatarId = () => {
    const { account, library } = useWeb3React()
    const dispatch = useDispatch()
    const nftsIds = useSelector(nftIdSelector)
    const fetcNftIDS = useCallback(async () => {
        const contract = new library.eth.Contract(
            AvatarDestinareAbi,
            process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
        )
        dispatch(actions.setNftIDs.pending())
        contract.methods
            .walletOfOwner(account)
            .call()
            .then((res) => dispatch(actions.setNftIDs.fulfilled(res)))
            .catch((err) => {
                console.log('Failed to get nft ids', err)
                dispatch(actions.setNftIDs.rejected(err))
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
    const { account, library } = useWeb3React()
    const dispatch = useDispatch()
    const nfts = useSelector(nftsSelector)

    const fetchNftAvatarsData = useCallback(async () => {
        const contract = new library.eth.Contract(
            AvatarDestinareAbi,
            process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
        )
        const dummy = ['2', '3']
        const promises = dummy.reduce((acc, v) => {
            return [...acc, contract.methods.tokenURI(v).call()]
        }, [])
        dispatch(actions.setNft.pending())
        Promise.all(promises)
            .then((uris) => {
                const urisPromises = uris.reduce((acc, uri) => {
                    const newUri = uri.replace(
                        /^ipfs?:\/\//,
                        'https://wanderers.mypinata.cloud/ipfs/'
                    )
                    return [...acc, fetch(newUri).then((res) => res.json())]
                }, [])
                Promise.all(urisPromises)
                    .then((nfts) => {
                        dispatch(actions.setNft.fulfilled(nfts))
                    })
                    .catch((err) => {
                        console.log('Failed to get nfts', err)
                        dispatch(actions.setNft.rejected(err))
                        throw err
                    })
            })
            .catch((err) => {
                console.log('Failed to get nfts', err)
                dispatch(actions.setNft.rejected(err))
                throw err
            })
    }, [nftIds, library, dispatch])

    useEffect(() => {
        if (account && nftIds.length > 0) fetchNftAvatarsData()
    }, [account, nftIds])

    return nfts
}

// 1.
