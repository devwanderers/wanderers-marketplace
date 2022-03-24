import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as types from './types'
import axiosInstance from './../../services/axiosConfig'

export const getContry = createAsyncThunk(
    types.GET_COUNTRY,
    async (name, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`country/getbyname/${name}`)
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchCountries = {
    pending: createAction(types.FETCH_COUNTRIES_PENDING),
    rejected: createAction(types.FETCH_COUNTRIES_REJECTED),
    fulfilled: createAction(types.FETCH_COUNTRIES_FULFILLED),
}
