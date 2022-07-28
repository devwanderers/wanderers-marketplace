import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import globalTypes from './globalTypes'
import axiosInstance from './../services/axiosConfig'

export const logout = createAction(globalTypes.LOG_OUT)

export const sendEmailRefund = createAsyncThunk(
    globalTypes.REFUND,
    async (account, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('auth/sendMailRefund', {
                account,
            })

            return response?.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)
