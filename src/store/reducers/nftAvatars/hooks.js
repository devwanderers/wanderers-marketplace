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
import {
    NFT_ADDRESS_GENESIS,
    // NFT_ADDRESS,
} from './../../../constants/addressConstants'

export const useNftAvatarReducer = () => {
    return useSelector(nftAvatarsReducerSelector)
}

export const useFetchNftAvatars = () => {
    const { account, library } = useActiveWeb3React()
    const dispatch = useDispatch()

    const erc721ContractGenesis = useERC721Contract(NFT_ADDRESS_GENESIS)
    // const erc721Contract = useERC721Contract(NFT_ADDRESS)

    const fetchNftAvatarsData = useCallback(async () => {
        if (!account) return
        try {
            dispatch(actions.setNftAvatar.pending())

            const [nftIdsGenesis] = await Promise.all([
                erc721ContractGenesis.walletOfOwner(account),
                // erc721Contract.walletOfOwner(account),
            ])

            if (nftIdsGenesis?.length === 0)
                dispatch(
                    actions.setNftAvatar.fulfilled({ nfts: [], nftIds: [] })
                )

            const promisesGenesis = nftIdsGenesis.map((v) =>
                erc721ContractGenesis.tokenURI(v)
            )
            // const promisesSecondSeason = nftIdsGenesis.map((v) =>
            //     erc721Contract.tokenURI(v)
            // )

            const urisGenesis = await Promise.all(promisesGenesis)
            // const urisSecondSeason = await Promise.all(promisesSecondSeason)

            const fetchImagesGenesis = urisGenesis.map((uri) => {
                const newUri = ipfsReplaceUri(uri)
                return fetch(newUri).then((res) => res.json())
            }, [])

            // const fetchImagesSecondS = urisSecondSeason.map((uri) => {
            //     const newUri = ipfsReplaceUri(uri)
            //     return fetch(newUri).then((res) => res.json())
            // }, [])

            const nftsGenesis = await Promise.all(fetchImagesGenesis).then(
                (v) =>
                    v.map((v, index) => ({
                        ...v,
                        tokenId: parseInt(Number(nftIdsGenesis[index]._hex)),
                        image: ipfsReplaceUri(v.image),
                        address: NFT_ADDRESS_GENESIS,
                    }))
            )

            // const nftsSecondS = await Promise.all(fetchImagesSecondS).then(
            //     (v) =>
            //         v.map((v, index) => ({
            //             ...v,
            //             tokenId: parseInt(Number(nftIdsGenesis[index]._hex)),
            //             image: ipfsReplaceUri(v.image),
            //             address: NFT_ADDRESS,
            //         }))
            // )

            dispatch(
                actions.setNftAvatar.fulfilled({
                    nfts: [...nftsGenesis],
                    nftIds: [
                        ...nftIdsGenesis.map((v) => ({
                            tokenId: v,
                            address: NFT_ADDRESS_GENESIS,
                        })),
                        // ...nftIdsGenesis.map((v) => ({
                        //     tokenId: v,
                        //     address: NFT_ADDRESS,
                        // })),
                    ],
                })
            )
        } catch (error) {
            console.log('Failed to get nfts', error)
            dispatch(actions.setNftAvatar.rejected(error))
            throw error
        }
    }, [account, erc721ContractGenesis, dispatch])

    useEffect(() => {
        fetchNftAvatarsData()
    }, [library, account])
}

export const useNftAvatars = () => {
    return useSelector(nftsSelector)
}
