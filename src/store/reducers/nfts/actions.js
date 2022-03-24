import { createAction } from '@reduxjs/toolkit'
import * as types from './types'

export const setNftIDs = {
    pending: createAction(types.NFTS_SET_IDS_PENDING),
    rejected: createAction(types.NFTS_SET_IDS_REJECTED),
    fulfilled: createAction(types.NFTS_SET_IDS_FULFILLED),
}
export const setNft = {
    pending: createAction(types.NFTS_SET_PENDING),
    rejected: createAction(types.NFTS_SET_REJECTED),
    fulfilled: createAction(types.NFTS_SET_FULFILLED),
}
