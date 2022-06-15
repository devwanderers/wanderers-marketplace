/* eslint-disable no-unused-vars */
import { useNftAvatarReducer } from '../nftAvatars/hooks'
import { useCallback, useEffect, useMemo } from 'react'
import {
    NFT_ADDRESS,
    NFT_ADDRESS_GENESIS,
} from '../../../constants/addressConstants'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../services/axiosConfig'
import * as actions from './actions'
// import { NFT_ADDRESS_GENESIS } from './../../../constants/addressConstants'

export const useFetchTokenSecondSeasonClaim = () => {
    const dispatch = useDispatch()
    const { nfts } = useNftAvatarReducer()

    const nftsSecondSeason = useMemo(() => {
        return nfts.reduce(
            (acc, v) => (v.address === NFT_ADDRESS_GENESIS ? [...acc, v] : acc),
            []
        )
    }, [nfts])

    const fetch = useCallback(async () => {
        const tokens = []
        for (let index = 0; index < nftsSecondSeason.length; index++) {
            const tokenId = nftsSecondSeason[index].tokenId
            const resGetToken = await axiosInstance
                .get(`nftToken/gettokenbytokenId/${tokenId}`)
                .then((response) => response.data)
                .catch((err) => err.response.data)

            if (resGetToken?.message === "Token doesn't exist") {
                const resCreateToken = await axiosInstance
                    .post(`nftToken/createtoken/`, {
                        tokenId,
                    })
                    .then((response) => response.data)

                tokens.push(resCreateToken.data)
            }
            if (resGetToken?.message === 'Successful') {
                tokens.push(resGetToken.data)
            }
        }
        dispatch(actions.addToken(tokens))
    }, [nftsSecondSeason])

    useEffect(() => {
        if (nftsSecondSeason.length > 0) fetch()
    }, [nftsSecondSeason])
}

export const useUpdateTokenSecondSeasonClaim = () => {
    const dispatch = useDispatch()

    return useCallback(() => dispatch(actions.updateToken).unwrap(), [dispatch])
}
