import { createSlice } from "@reduxjs/toolkit";

export type authStateType = {
    username?: string
    email?: string
    _id?: string
    isLoggedIn?: boolean
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        username: '',
        email: '',
        _id: '',
        isLoggedIn: false
    },
    reducers: {
        setUser: (_: authStateType, { payload }) =>
           ({
                username: payload?.username,
                email: payload?.username,
                _id: payload?._id
                , isLoggedIn: true
            }),
        clearUser: () => ({ username: '', email: '', _id: '', isLoggedIn: false })
    }
})

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;