import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as types from './types'
import axiosInstance from './../../services/axiosConfig'

export const setAvatar = createAction(types.SET_AVATAR)

export const setProfile = createAsyncThunk(
    types.SET_PROFILE,
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('auth/setprofile', data)
            return res?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getProfile = createAsyncThunk(
    types.GET_PROFILE,
    async (address, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(
                `auth/getprofilebyaddress/${address}`
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
