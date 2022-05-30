import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftIdSelector, nftsSelector, nftReducerSelector } from './selectors'
import * as actions from './actions'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'

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
        console.log({ account })
        dispatch(actions.setNftIDs.pending())

        console.log({ erc721Contract })
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
    }, [account, library, slowRefresh])
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
        if (nftIds.length === 0 || !account) return
        const contractsCalls = nftIds.map((v) => erc721Contract.tokenURI(v))
        try {
            dispatch(actions.setNft.pending())
            const uris = await Promise.all(contractsCalls)
            const fetchUris = uris.map((v) => {
                return fetch(ipfsReplaceUri(v)).then((res) => res.json())
            })
            const nfts = await Promise.all(fetchUris)

            dispatch(
                actions.setNft.fulfilled(
                    nfts.map((v, index) => {
                        return {
                            ...v,
                            tokenId: parseInt(Number(nftIds[index]._hex)),
                            image: ipfsReplaceUri(v.image),
                        }
                    })
                )
            )
        } catch (error) {
            console.log('Failed to get nfts', error)
            dispatch(actions.setNft.rejected(error))
            throw error
        }
    }, [nftIds, erc721Contract, account, dispatch])

    useEffect(() => {
        fetchNftLandsData()
    }, [account, nftIds, library])

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
