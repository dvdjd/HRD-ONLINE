import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const likeListSlice = createSlice({
    name: 'likeList',
    initialState: {
        likeList: [],
        likeListStaus: 'idle',
        likeListMessage: null
    },
    reducers: {},
    extraReducers: (builder) => {

    }
})