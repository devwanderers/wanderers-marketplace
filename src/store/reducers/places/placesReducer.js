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
    allCountries: [],
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
        .addCase(actions.updateCountry.fulfilled, (state, { payload }) => {
            const { country } = payload
            const index = state.allCountries.findIndex(
                (c) => c._id === country._id
            )
            const newAllCountries = [
                ...state.allCountries.slice(0, index),
                country,
                ...state.allCountries.slice(
                    index + 1,
                    state.allCountries.length
                ),
            ]

            return {
                ...state,
                allCountries: newAllCountries,
            }
        })
        .addCase(actions.getAllCountries.fulfilled, (state, { payload }) => {
            return {
                ...state,
                allCountries: payload.countries,
            }
        })
        .addCase(actions.getPlace.fulfilled, (state, { payload }) => {
            state.selectedPlace = transformPlaceData(payload.place)
        })
        .addCase(actions.getPlace.rejected, (state, { payload }) => {
            state.selectedPlace = null
        })
})

export default placesReducer
