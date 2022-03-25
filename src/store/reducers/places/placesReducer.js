/* eslint-disable no-unused-vars */
import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { transformContryData, transformPlaceData } from './services'

const initialState = {
    countries: {},
    places: {},
    selectedPlace: null,
    fetch: {
        requestCountries: false,
    },
    loading: false,
    error: null,
}

const placesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getContry.pending, (state, { payload }) => {
            state.error = null
            state.loading = true
        })
        .addCase(actions.getContry.rejected, (state, { payload }) => {
            state.error = payload
            state.loading = false
        })
        .addCase(actions.getContry.fulfilled, (state, { payload }) => {
            const [countries, places] = transformContryData(payload.countries)
            return {
                ...state,
                countries,
                places,
                error: null,
                loading: false,
                fetch: { ...fetch, requestCountries: true },
            }
        })
        .addCase(actions.getPlace.fulfilled, (state, { payload }) => {
            console.log({ payload })
            state.selectedPlace = transformPlaceData(payload.place)
        })
})

export default placesReducer
