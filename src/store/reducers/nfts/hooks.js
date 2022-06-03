import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftsSelector, nftReducerSelector } from './selectors'
import * as actions from './actions'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'

import { useERC721LandContract } from './../../../hooks/web3Hooks/useContract'
import { ipfsReplaceUri } from '../../../services/ipfs'
import useRefresh from './../../../hooks/useRefresh'
import { LAND_ADDRESS } from './../../../constants/addressConstants'

export const useNftsReducer = () => {
    return useSelector(nftReducerSelector)
}

export const useLandNfts = () => {
    return useSelector(nftsSelector)
}

export const useFetchNftLands = (nftIds = []) => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()

    const nfts = useLandNfts()
    const { slowRefresh } = useRefresh()
    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchNftLandsData = useCallback(async () => {
        try {
            if (!account) return
            dispatch(actions.setNft.pending())

            const nftIds = await erc721Contract.walletOfOwner(account)
            if (nftIds?.length === 0 || !Array.isArray(nftIds))
                actions.setNft.fulfilled({ nftIds: [], nfts: [] })

            const contractsCalls = nftIds.map((v) => erc721Contract.tokenURI(v))
            const uris = await Promise.all(contractsCalls)
            const fetchUris = uris.map((v) => {
                return fetch(ipfsReplaceUri(v)).then((res) => res.json())
            })
            const nfts = await Promise.all(fetchUris)

            dispatch(
                actions.setNft.fulfilled({
                    nftIds: nftIds,
                    nfts: nfts.map((v, index) => {
                        return {
                            ...v,
                            tokenId: parseInt(Number(nftIds[index]._hex)),
                            image: ipfsReplaceUri(v.image),
                        }
                    }),
                })
            )
        } catch (error) {
            console.log('Failed to get nfts', error)
            dispatch(actions.setNft.rejected(error))
            throw error
        }
    }, [nftIds, erc721Contract, account, dispatch])

    useEffect(() => {
        fetchNftLandsData()
    }, [library, account, slowRefresh])

    return { nfts, reload: fetchNftLandsData }
}

export const useNftDetail = (id) => {
    const { nfts } = useFetchNftLands()

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
