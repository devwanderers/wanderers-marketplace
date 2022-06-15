import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as types from './types'
import axiosInstance from './../../services/axiosConfig'

export const addToken = createAction(types.TOKENS_ADD)

export const updateToken = createAsyncThunk(
    types.SET_PROFILE,
    async (data, { rejectWithValue }) => {
        try {
            const { tokenId, ...restData } = data

            const res = await axiosInstance.put(
                `nftToken/updatetokenbytokenid/${tokenId}`,
                restData
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
