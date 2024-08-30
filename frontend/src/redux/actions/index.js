import { LoginSlice } from "../reducers/LoginSlice";
import { loginThunk } from "../reducers/LoginSlice";

import { UserSlice } from "../reducers/UserSlice";

import { PostSlice, getPosts } from "../reducers/PostSlice";

export const loginActions = LoginSlice.actions
export const userActions = UserSlice.actions
export const postActions = PostSlice.actions

export  {
    loginThunk,

    getPosts
}