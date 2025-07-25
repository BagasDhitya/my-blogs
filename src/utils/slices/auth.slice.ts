import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SignInInput } from '../validation/auth.schema'
import { apiUser } from '../api/user.api'

interface AuthState {
    user: null | any,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

export const signUp = createAsyncThunk('/users', async (data: SignInInput, thunkAPI) => {
    try {
        const response = await apiUser.post('/users', data)
        return response.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer