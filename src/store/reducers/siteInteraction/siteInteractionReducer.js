import { createReducer } from '@reduxjs/toolkit'
import { closeWalletDrawer, openWalletDrawer } from './actions'

const initialState = {
    visibleWalletDrawer: false,
}

const siteInteractionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(openWalletDrawer, (state) => {
            state.visibleWalletDrawer = true
        })
        .addCase(closeWalletDrawer, (state) => {
            state.visibleWalletDrawer = false
        })
})

export default siteInteractionReducer
