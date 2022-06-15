import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = []

const profileReducer = createReducer(initialState, (builder) => {
    builder.addCase(actions.addToken, (state, { payload }) => {
        state = payload
    })
})

export default profileReducer
