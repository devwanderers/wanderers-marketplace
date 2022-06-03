import { createAsyncThunk } from '@reduxjs/toolkit'
import * as types from './types'
import axiosInstance from './../../services/axiosConfig'

export const getAllCountries = createAsyncThunk(
    types.GET_ALL_COUNTRY,
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`country/get`)
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getContry = createAsyncThunk(
    types.GET_COUNTRY,
    async (countries, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(
                `country/getCountriesByCountryList`,
                {
                    countries,
                }
            )
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getPlace = createAsyncThunk(
    types.GET_PLACE,
    async ({ place, country }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(
                `place/getPlaceByCountryNameAndPlaceName`,
                {
                    place,
                    country,
                }
            )
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateCountry = createAsyncThunk(
    types.UPDATE_COUNTRY,
    async ({ countryId, body }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(
                `country/update/${countryId}`,
                body
            )
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)
