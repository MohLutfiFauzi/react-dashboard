import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        users: []
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // Logout

        logoutSuccess: (state) => {
            state.currentUser = null;
        },

        // GET ALL USER

        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // DELETE USER

        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE

        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload._id)
            ] = action.payload;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateCurrentUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },

        //ADD

        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload);
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { updateCurrentUserSuccess, logoutSuccess, updateUserStart, updateUserSuccess, updateUserFailure, addUserStart, addUserSuccess, addUserFailure, loginStart, loginSuccess, loginFailure, getUserStart, getUserSuccess, getUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;
export default userSlice.reducer;
