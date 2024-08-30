import { combineReducers, configureStore, Tuple } from "@reduxjs/toolkit";
import { LoginSlice } from "../reducers/LoginSlice";
import { UserSlice } from "../reducers/UserSlice";
import { PostSlice } from "../reducers/PostSlice";

const reducer = combineReducers({
    login: LoginSlice.reducer,
    user: UserSlice.reducer,
    post: PostSlice.reducer,
})

const store = configureStore({
    reducer: reducer,
})

export default store