import { createReducer } from '@reduxjs/toolkit'
import * as mintAction from './actions'

const initialState = {
    minting: [],
    minted: [],
}

const scInteractionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(mintAction.setMinting, (state, { payload }) => ({
            ...state,
            minting: payload,
        }))
        .addCase(mintAction.setMinted, (state, { payload }) => ({
            ...state,
            minted: payload,
        }))
        .addCase(mintAction.clearMinted, (state) => ({
            ...state,
            minted: [],
        }))
        .addCase(mintAction.clearMinting, (state) => ({
            ...state,
            minting: [],
        }))
})

export default scInteractionReducer
