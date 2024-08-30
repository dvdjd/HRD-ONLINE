import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPost } from "../../services/LandingPageAPI";
import { act } from "react";

export const getPosts = createAsyncThunk(
    'getPosts',
    async () => {
        const res = await getPost()
        
        return res
    }
)
export const PostSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        postsStatus: 'idle',
        postsMessage: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
            state.postsStatus = 'loading'
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            if(action.payload?.length > 0){
                state.postsStatus = 'success'
                state.posts = []
                action.payload?.forEach(e => {
                    state.posts.push(e)
                });
            }
            else{
                state.postsStatus = 'error'
                state.postsMessage = 'No data found'
            }
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.postsStatus = 'error'
            state.postsMessage = action.error.message
        })
    }
})