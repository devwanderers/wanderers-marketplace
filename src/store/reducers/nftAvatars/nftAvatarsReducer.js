import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { nftTranformData } from './services'
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
        .addCase(actions.setNftIDsAvatar.pending, (state, { payload }) => {
            state.loading.requestNftIds = true
            state.error = null
        })
        .addCase(actions.setNftIDsAvatar.rejected, (state, { payload }) => {
            state.loading.requestNftIds = false
            state.error = payload
        })
        .addCase(actions.setNftIDsAvatar.fulfilled, (state, { payload }) => {
            state.loading.requestNftIds = payload
            state.nftIds = payload
            state.error = null
        })
        .addCase(actions.setNftAvatar.pending, (state, { payload }) => {
            state.loading.requestNft = true
            state.error = null
        })
        .addCase(actions.setNftAvatar.rejected, (state, { payload }) => {
            state.loading.requestNft = false
            state.error = payload
        })
        .addCase(actions.setNftAvatar.fulfilled, (state, { payload }) => {
            state.loading.requestNft = false
            state.nfts = nftTranformData(payload)
            state.fetch = true
            state.error = null
        })
})

export default nftAvatarsReducer
