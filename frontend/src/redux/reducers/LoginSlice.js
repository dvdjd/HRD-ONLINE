import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {login} from "../../services/LandingPageAPI"

export const loginThunk = createAsyncThunk(
    'login',
    async (payload) => {
        const res = await login(payload)
        return res
    }
)
export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        open: false,

        loginStatus: 'idle',
        loginData: [],
        loginMessage: null
    },
    reducers: {
        setOpen: (state) => {
            state.open = true
        },
        setClose: (state) => {
            state.open = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginThunk.pending, (state) => {
            state.loginStatus = 'loading'
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loginStatus = action.payload.status
            state.loginData = []
            state.loginData.push(action.payload.data[0])            
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.loginStatus = 'error'
            state.loginMessage = action.error.message
        })
    }
})