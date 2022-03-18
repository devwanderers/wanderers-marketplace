import { createAction } from '@reduxjs/toolkit'
import { OPEN_WALLET_DRAWER, CLOSE_WALLET_DRAWER } from './types'

export const openWalletDrawer = createAction(OPEN_WALLET_DRAWER)
export const closeWalletDrawer = createAction(CLOSE_WALLET_DRAWER)
