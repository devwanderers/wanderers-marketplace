import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { nftTranformData } from '../services/nft-services'

const initialState = {
    nftIds: [],
    nfts: [],
    loading: {
        requestNftIds: false,
        requestNft: false,
    },
    fetch: false,
    error: null,
}

const nftAvatarsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.setNftAvatar.pending, (state, { payload }) => {
            state.loading.requestNft = true
            state.error = null
        })
        .addCase(actions.setNftAvatar.rejected, (state, { payload }) => {
            state.loading.requestNft = false
            state.error = payload
        })
        .addCase(
            actions.setNftAvatar.fulfilled,
            (state, { payload: { nfts, nftIds } }) => {
                state.loading.requestNft = false
                state.nfts = nftTranformData(nfts)
                state.nftIds = nftIds
                state.fetch = true
                state.error = null
            }
        )
})

export default nftAvatarsReducer
