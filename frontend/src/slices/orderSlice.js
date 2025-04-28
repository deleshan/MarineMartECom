import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    loading: false,
    adminOrders: [],
    isAdminOderDeleted: false,
    isAdminOderUpdated: false,
  },
  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetails: action.payload.order,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    userOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    userOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders,
      };
    },
    userOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderDetailRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    adminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteAdminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteAdminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAdminOderDeleted: true,
      };
    },
    deleteAdminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateAdminOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateAdminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAdminOderUpdated: true,
      };
    },
    updateAdminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearAdminOderDeleted(state, action) {
      return {
        ...state,
        isAdminOderDeleted: false,
      };
    },
    clearAdminOderUpdated(state, action) {
      return {
        ...state,
        isAdminOderUpdated: false,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearError,
  userOrderFail,
  userOrderRequest,
  userOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  adminOrderFail,
  adminOrderSuccess,
  adminOrderRequest,
  deleteAdminOrderFail,
  deleteAdminOrderRequest,
  deleteAdminOrderSuccess,
  updateAdminOrderFail,
  updateAdminOrderRequest,
  updateAdminOrderSuccess,
  clearAdminOderDeleted,
  clearAdminOderUpdated,
} = actions;
export default reducer;
