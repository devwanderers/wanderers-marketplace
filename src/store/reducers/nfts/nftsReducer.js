import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
    nftIds: [],
    nfts: [],
    loading: {
        requestNft: false,
    },
    fetch: false,
    error: null,
}

const nftReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.setNft.pending, (state, { payload }) => {
            state.loading.requestNft = true
            state.error = null
        })
        .addCase(actions.setNft.rejected, (state, { payload }) => {
            state.loading.requestNft = false
            state.error = payload
        })
        .addCase(
            actions.setNft.fulfilled,
            (state, { payload: { nfts, nftIds } }) => {
                state.loading.requestNft = false
                state.nfts = nfts
                state.nftIds = nftIds
                state.fetch = true
                state.error = null
            }
        )
})

export default nftReducer
