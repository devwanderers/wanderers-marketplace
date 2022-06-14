import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
    avatar: '',
    userName: '',
    address: '',
    revealed: false,
    code: null,
}

const profileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.setAvatar, (state, { payload }) => {
            state.avatar = payload
        })
        .addCase(actions.getProfile.fulfilled, (state, { payload }) => ({
            ...state,
            ...payload.profile,
        }))
        .addCase(actions.setProfile.fulfilled, (state, { payload }) => ({
            ...state,
            ...payload.profile,
        }))
        .addCase(actions.getCode.fulfilled, (state, { payload }) => ({
            ...state,
            code: payload.data,
        }))
        .addCase(actions.getUnClaimedCode.fulfilled, (state, { payload }) => ({
            ...state,
            code: payload.data,
        }))
})

export default profileReducer
