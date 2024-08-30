import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        userInfo: null
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.isLogin = true
            state.userInfo = action.payload
        },
        setUserInfoToNull: (state) => {
            state.isLogin = false
            state.userInfo = null
        }
    }
})