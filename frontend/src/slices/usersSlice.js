import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: {},
    users: [],
    isUserUpdated: false,
    isUserDeleted: false,
    error: null,
  },
  reducers: {
    // USER
    usersRequest(state) {
      state.loading = true;
    },
    usersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
    },
    usersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    userRequest(state) {
      state.loading = true;
    },
    userSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    userFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequest(state) {
      state.loading = true;
    },
    deleteUserSuccess(state) {
      state.loading = false;
      state.isUserDeleted = true;
    },
    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserRequest(state) {
      state.loading = true;
    },
    updateUserSuccess(state) {
      state.loading = false;
      state.isUserUpdated = true;
    },
    updateUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
    clearUserDeleted(state) {
      state.isUserDeleted = false;
    },
    clearUserUpdated(state) {
      state.isUserUpdated = false;
    },
  },
});

const { actions, reducer } = usersSlice;

export const {
  // USER
  userRequest,
  userFail,
  userSuccess,
  usersRequest,
  usersSuccess,
  usersFail,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
  clearUserDeleted,
  clearUserUpdated,
  clearError,
} = actions;

export default reducer;
