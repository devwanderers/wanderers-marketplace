import { createAction } from '@reduxjs/toolkit'
import * as types from './types'

export const setNftIDsAvatar = {
    pending: createAction(types.NFT_SET_IDS_PENDING),
    rejected: createAction(types.NFT_SET_IDS_REJECTED),
    fulfilled: createAction(types.NFT_SET_IDS_FULFILLED),
}
export const setNftAvatar = {
    pending: createAction(types.NFT_SET_PENDING),
    rejected: createAction(types.NFT_SET_REJECTED),
    fulfilled: createAction(types.NFT_SET_FULFILLED),
}
