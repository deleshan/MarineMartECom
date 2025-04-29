import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    loading: false,
    shop: null,
    isShopAuthenticated: false,
    shops: [],
    shopProducts: [],
    isCreated: false,
    isDeleted: false,
    isApproved: false,
    isUpdated: false,
    message: null,
    error: null,
  },
  reducers: {
    // LOGIN
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isShopAuthenticated = true;
      state.shop = action.payload.shop;
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.isShopAuthenticated = false;
      state.error = action.payload;
    },

    // CREATE SHOP
    createShopRequest(state) {
      state.loading = true;
    },
    createShopSuccess(state, action) {
      state.loading = false;
      state.shop = action.payload.shop;
      state.isCreated = true;
    },
    createShopFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // LOAD SHOP PROFILE
    loadShopRequest(state) {
      state.loading = true;
      state.isShopAuthenticated = false;
    },
    loadShopSuccess(state, action) {
      state.loading = false;
      state.isShopAuthenticated = true;
      state.shop = action.payload.shop;
    },
    loadShopFail(state, action) {
      state.loading = false;
      state.isShopAuthenticated = false;
      state.error = action.payload;
    },

    // LOGOUT
    logOutSuccess(state) {
      state.loading = false;
      state.isShopAuthenticated = false;
      state.shop = null;
    },
    logOutFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE SHOP PROFILE
    updateShopProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateShopProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.shop = action.payload.shop;
    },
    updateShopProfileFail(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    clearUpdateShopProfile(state) {
      state.isUpdated = false;
    },

    // UPDATE SHOP PASSWORD
    updateShopPasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateShopPasswordSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
    },
    updateShopPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // FORGOT PASSWORD
    forgotShopPasswordRequest(state) {
      state.loading = true;
      state.message = null;
    },
    forgotShopPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotShopPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET PASSWORD
    resetShopPasswordRequest(state) {
      state.loading = true;
    },
    resetShopPasswordSuccess(state, action) {
      state.loading = false;
      state.isShopAuthenticated = true;
      state.shop = action.payload.shop;
    },
    resetShopPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // GET SINGLE SHOP
    getShopRequest(state) {
      state.loading = true;
    },
    getShopSuccess(state, action) {
      state.loading = false;
      state.shop = action.payload.shop;
    },
    getShopFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // GET ALL SHOPS (ADMIN)
    getAllShopsRequest(state) {
      state.loading = true;
    },
    getAllShopsSuccess(state, action) {
      state.loading = false;
      state.shops = action.payload.shops;
    },
    getAllShopsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // APPROVE SHOP (ADMIN)
    approveShopRequest(state) {
      state.loading = true;
    },
    approveShopSuccess(state) {
      state.loading = false;
      state.isApproved = true;
    },
    approveShopFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE SHOP (ADMIN)
    deleteShopRequest(state) {
      state.loading = true;
    },
    deleteShopSuccess(state) {
      state.loading = false;
      state.isDeleted = true;
    },
    deleteShopFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // CLEAR STATUS FLAGS
    clearShopStatus(state) {
      state.isCreated = false;
      state.isDeleted = false;
      state.isApproved = false;
      state.isUpdated = false;
    },

    // CLEAR ERROR
    clearShopError(state) {
      state.error = null;
    },

    getShopProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getShopProductsSuccess(state, action) {
      state.loading = false;
      state.shopProducts = action.payload.products;
    },
    getShopProductsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatusRequest(state) {
      state.loading = true;
    },
    updateOrderStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateOrderStatusFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getShopOrdersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getShopOrdersSuccess(state, action) {
      state.loading = false;
      state.shopProducts = action.payload.orders;
    },
    getShopOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest, loginSuccess, loginFail,
  createShopRequest, createShopSuccess, createShopFail,
  loadShopRequest, loadShopSuccess, loadShopFail,
  logOutSuccess, logOutFail,
  updateShopProfileRequest, updateShopProfileSuccess, updateShopProfileFail,
  clearUpdateShopProfile,
  updateShopPasswordRequest, updateShopPasswordSuccess, updateShopPasswordFail,
  forgotShopPasswordRequest, forgotShopPasswordSuccess, forgotShopPasswordFail,
  resetShopPasswordRequest, resetShopPasswordSuccess, resetShopPasswordFail,
  getShopRequest, getShopSuccess, getShopFail,
  getAllShopsRequest, getAllShopsSuccess, getAllShopsFail,
  approveShopRequest, approveShopSuccess, approveShopFail,
  deleteShopRequest, deleteShopSuccess, deleteShopFail,
  clearShopStatus, clearShopError,getShopProductsRequest, 
  getShopProductsSuccess, getShopProductsFail, 
  updateOrderStatusRequest, updateOrderStatusSuccess,updateOrderStatusFail,getShopOrdersRequest,
  getShopOrdersSuccess,getShopOrdersFail
} = shopSlice.actions;

export default shopSlice.reducer;
