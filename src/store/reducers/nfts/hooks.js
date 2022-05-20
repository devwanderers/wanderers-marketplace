/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftIdSelector, nftsSelector, nftReducerSelector } from './selectors'
import * as actions from './actions'
import AvatarDestinareAbi from '../../../abi/AvatarDestinare.json'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'

import { ethers } from 'ethers'
import { useERC721Contract } from './../../../hooks/web3Hooks/useContract'
import { ipfsReplaceUri } from '../../../services/ipfs'
import useRefresh from './../../../hooks/useRefresh'

export const useNftsReducer = () => {
    return useSelector(nftReducerSelector)
}

export const useLandNfts = () => {
    return useSelector(nftsSelector)
}

export const useFetchNftLandId = () => {
    const { slowRefresh } = useRefresh()
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()
    const nftIds = useSelector(nftIdSelector)
    const erc721Contract = useERC721Contract(
        process.env.REACT_APP_LAND_DESTINARE_CONTRACT_ADDRESS
    )

    const fetcNftIDS = useCallback(async () => {
        if (!account) return
        dispatch(actions.setNftIDs.pending())

        erc721Contract
            .walletOfOwner(account)
            .then((res) => dispatch(actions.setNftIDs.fulfilled(res)))
            .catch((err) => {
                console.log('Failed to get nft ids', err)
                dispatch(actions.setNftIDs.rejected(err))
                throw err
            })
    }, [erc721Contract, dispatch, account])

    useEffect(() => {
        fetcNftIDS()
    }, [account, slowRefresh])
    return { nftIds, fetcNftIDS }
}

export const useFetchNftLands = (nftIds = []) => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()

    const nfts = useLandNfts()
    const erc721Contract = useERC721Contract(
        process.env.REACT_APP_LAND_DESTINARE_CONTRACT_ADDRESS
    )

    const fetchNftLandsData = useCallback(async () => {
        if (nftIds.length === 0) return
        const contractsCalls = nftIds.map((v) => erc721Contract.tokenURI(v))

        dispatch(actions.setNft.pending())
        Promise.all(contractsCalls)
            .then((uris) => {
                const fetchUris = uris.map((v) => {
                    return fetch(ipfsReplaceUri(v)).then((res) => res.json())
                })

                Promise.all(fetchUris)
                    .then((nfts) => {
                        dispatch(
                            actions.setNft.fulfilled(
                                nfts.map((v, index) => {
                                    return {
                                        ...v,
                                        tokenId: parseInt(
                                            Number(nftIds[index]._hex)
                                        ),
                                        image: ipfsReplaceUri(v.image),
                                    }
                                })
                            )
                        )
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
    }, [nftIds, erc721Contract, account, dispatch])

    useEffect(() => {
        if (account) {
            fetchNftLandsData()
        }
    }, [account, nftIds])

    return nfts
}

export const useGetLands = () => {
    const { nftIds, fetcNftIDS } = useFetchNftLandId()
    const lands = useFetchNftLands(nftIds)

    return { data: lands, reload: fetcNftIDS }
}

export const useNftDetail = (id) => {
    const { data: nfts } = useGetLands()

    return useMemo(() => {
        if (nfts.length > 0) {
            const index = nfts.findIndex((n) => n.tokenId === parseInt(id))

            if (index !== -1) {
                const nftDetail = nfts[index]
                return nftDetail
            }
        }
        return undefined
    }, [nfts, id])
}
