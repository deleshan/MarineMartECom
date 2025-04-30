import axios from "axios";

import {
  loginRequest,
  loginFail,
  loginSuccess,
  createShopRequest,
  createShopSuccess,
  createShopFail,
  loadShopRequest,
  loadShopSuccess,
  loadShopFail,
  logOutSuccess,
  logOutFail,
  updateShopProfileRequest,
  updateShopProfileSuccess,
  updateShopProfileFail,
  updateShopPasswordRequest,
  updateShopPasswordSuccess,
  updateShopPasswordFail,
  forgotShopPasswordRequest,
  forgotShopPasswordSuccess,
  forgotShopPasswordFail,
  resetShopPasswordRequest,
  resetShopPasswordSuccess,
  resetShopPasswordFail,
  getShopRequest,
  getShopSuccess,
  getShopFail,
  getAllShopsRequest,
  getAllShopsSuccess,
  getAllShopsFail,
  approveShopRequest,
  approveShopSuccess,
  approveShopFail,
  deleteShopRequest,
  deleteShopSuccess,
  deleteShopFail,
  clearShopError,
  getShopProductsRequest,
  getShopProductsSuccess,
  getShopProductsFail,
  updateOrderStatusRequest, 
  updateOrderStatusSuccess,
  updateOrderStatusFail,
  getShopOrdersRequest,
  getShopOrdersSuccess,getShopOrdersFail
  
} from "../slices/shopSlice";

// SHOP LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/shoplogin`, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

// CLEAR ERRORS
export const clearAuthError = (dispatch) => {
  dispatch(clearShopError());
};

// CREATE SHOP REQUEST
export const createShop = (userData) => async (dispatch) => {
  try {
    dispatch(createShopRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`/api/v1/createshop`, userData, config);
    dispatch(createShopSuccess(data));
  } catch (error) {
    dispatch(createShopFail(error.response.data.message));
  }
};

// LOAD SHOP PROFILE


export const loadShop = () => async (dispatch) => {
  try {
    dispatch(loadShopRequest());

    const { data } = await axios.get("/api/v1/shopprofile", {
      withCredentials: true,
    });

    dispatch(loadShopSuccess(data));
  } catch (error) {
    dispatch(loadShopFail(error.response?.data?.message || "Failed to load shop"));
  }
};



// LOGOUT
export const logOut = async (dispatch) => {
  try {
    await axios.get(`/api/v1/shoplogout`, { withCredentials: true });
    dispatch(logOutSuccess());
  } catch (error) {
    dispatch(logOutFail(error.response.data.message));
  }
};

// UPDATE SHOP PROFILE
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateShopProfileRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`/api/v1/shopupdate`, userData, config);
    dispatch(updateShopProfileSuccess(data));
  } catch (error) {
    dispatch(updateShopProfileFail(error.response.data.message));
  }
};

// UPDATE SHOP PASSWORD
export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updateShopPasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.put(`/api/v1/shoppassword/change`, formData, config);
    dispatch(updateShopPasswordSuccess());
  } catch (error) {
    dispatch(updateShopPasswordFail(error.response.data.message));
  }
};

// FORGOT PASSWORD
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgotShopPasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`/api/v1/shoppassword/forgot`, formData, config);
    dispatch(forgotShopPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotShopPasswordFail(error.response.data.message));
  }
};

// RESET PASSWORD
export const resetPassword = (formData, token) => async (dispatch) => {
  try {
    dispatch(resetShopPasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`/api/v1/shoppassword/reset/${token}`, formData, config);
    dispatch(resetShopPasswordSuccess(data));
  } catch (error) {
    dispatch(resetShopPasswordFail(error.response.data.message));
  }
};

// ADMIN: GET ALL APPROVED SHOPS
export const getShopsForAdmin = (dispatch) => async () => {
  try {
    dispatch(getAllShopsRequest());
    const { data } = await axios.get(`/api/v1/Shoplist`, { withCredentials: true });
    dispatch(getAllShopsSuccess(data));
  } catch (error) {
    dispatch(getAllShopsFail(error.response.data.message));
  }
};

// ADMIN: GET ALL PENDING SHOP REQUESTS
export const getPendingShopsForAdmin = (dispatch) => async () => {
  try {
    dispatch(getAllShopsRequest());
    const { data } = await axios.get(`/api/v1/requests`, { withCredentials: true });
    dispatch(getAllShopsSuccess(data));
  } catch (error) {
    dispatch(getAllShopsFail(error.response.data.message));
  }
};

// ADMIN: APPROVE SHOP
export const adminAproveShop = (id) => async (dispatch) => {
  try {
    dispatch(approveShopRequest());
    await axios.put(`/api/v1/admin/approve/${id}`, {}, { withCredentials: true }); // Correct PUT method
    dispatch(approveShopSuccess());
  } catch (error) {
    dispatch(approveShopFail(error.response.data.message));
  }
};

// ADMIN: DELETE SHOP (future if needed)
export const deleteShopForAdmin = (id) => async (dispatch) => {
  try {
    dispatch(deleteShopRequest());
    await axios.delete(`/api/v1/admin/shop/${id}`, { withCredentials: true });
    dispatch(deleteShopSuccess());
  } catch (error) {
    dispatch(deleteShopFail(error.response.data.message));
  }
};

// ADMIN: GET SINGLE SHOP (future if needed)
export const getShopForAdmin = (id) => async (dispatch) => {
  try {
    dispatch(getShopRequest());
    const { data } = await axios.get(`/api/v1/admin/shop/${id}`, { withCredentials: true });
    dispatch(getShopSuccess(data));
  } catch (error) {
    dispatch(getShopFail(error.response.data.message));
  }
};

export const closeShop = () => async (dispatch) => {
  try {
    dispatch(deleteShopRequest());

    await axios.put(`/api/v1/close`, {}, {
      withCredentials: true,
    });

    dispatch(deleteShopSuccess());
  } catch (error) {
    dispatch(deleteShopFail(error.response?.data?.message || "Failed to close shop"));
  }
};

export const getShopProducts = () => async (dispatch) => {
  try {
    dispatch(getShopProductsRequest());

    const { data } = await axios.get(`/api/v1/shop/products`, {
      withCredentials: true,
    });

    dispatch(getShopProductsSuccess(data));
  } catch (error) {
    dispatch(getShopProductsFail(error.response?.data?.message || "Failed to load shop products"));
  }
};

export const updateOrderStatus = (Id, newStatus) => async (dispatch) => {
  try {
    dispatch(updateOrderStatusRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/shop/orders/${Id}/status`,
      
      { status: newStatus },
      config
    );

    dispatch(updateOrderStatusSuccess(data));
  } catch (error) {
    dispatch(updateOrderStatusFail(error.response?.data?.message || "Failed to update order status"));
  }
};

export const getShopOrders = () => async (dispatch) => {
  try {
    dispatch(getShopOrdersRequest());
    const { data } = await axios.get("/api/v1/shop/orders", {
      withCredentials: true,
    });
    dispatch(getShopOrdersSuccess(data));
  } catch (error) {
    dispatch(getShopOrdersFail(error.response?.data?.message || "Failed to fetch shop orders"));
  }
};

