/* eslint-disable no-unused-vars */
import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { transformContryData } from './services'

const initialState = {
    countries: {},
    places: {},
    fetch: {
        requestCountries: false,
    },
    loading: false,
    error: null,
}

const placesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getContry.fulfilled, (state, { payload }) => {
            // const country = transformContryData(payload.country)
            return {
                ...state,
            }
        })
        .addCase(actions.fetchCountries.pending, (state) => {
            state.error = null
            state.loading = true
        })
        .addCase(actions.fetchCountries.rejected, (state, { payload }) => {
            state.error = payload
            state.loading = false
        })
        .addCase(actions.fetchCountries.fulfilled, (state, { payload }) => {
            state.error = null
            state.loading = false
            state.fetch.requestCountries = true
        })
})

export default placesReducer
