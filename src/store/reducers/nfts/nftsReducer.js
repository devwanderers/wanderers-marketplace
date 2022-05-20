import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

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

const nftReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.setNftIDs.pending, (state, { payload }) => {
            state.loading.requestNftIds = true
            state.error = null
        })
        .addCase(actions.setNftIDs.rejected, (state, { payload }) => {
            state.loading.requestNftIds = false
            state.error = payload
        })
        .addCase(actions.setNftIDs.fulfilled, (state, { payload }) => {
            state.loading.requestNftIds = false
            state.nftIds = payload
            state.error = null
        })
        .addCase(actions.setNft.pending, (state, { payload }) => {
            state.loading.requestNft = true
            state.error = null
        })
        .addCase(actions.setNft.rejected, (state, { payload }) => {
            state.loading.requestNft = false
            state.error = payload
        })
        .addCase(actions.setNft.fulfilled, (state, { payload }) => {
            state.loading.requestNft = false
            state.nfts = payload
            state.fetch = true
            state.error = null
        })
})

export default nftReducer
