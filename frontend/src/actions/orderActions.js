import axios from "axios";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  userOrderRequest,
  userOrderSuccess,
  userOrderFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrderRequest,
  adminOrderSuccess,
  adminOrderFail,
  deleteAdminOrderRequest,
  deleteAdminOrderSuccess,
  deleteAdminOrderFail,
  updateAdminOrderRequest,
  updateAdminOrderSuccess,
  updateAdminOrderFail,
} from "../slices/orderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const userOrders = async (dispatch) => {
  try {
    dispatch(userOrderRequest());
    const { data } = await axios.get("/api/v1/myorders");
    dispatch(userOrderSuccess(data));
  } catch (error) {
    dispatch(userOrderFail(error.response.data.message));
  }
};
export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};
export const adminOrders = async (dispatch) => {
  try {
    dispatch(adminOrderRequest());
    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch(adminOrderSuccess(data));
  } catch (error) {
    dispatch(adminOrderFail(error.response.data.message));
  }
};
export const deleteAdminOrders = (id) => async (dispatch) => {
  try {
    dispatch(deleteAdminOrderRequest());
    await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteAdminOrderSuccess());
  } catch (error) {
    dispatch(deleteAdminOrderFail(error.response.data.message));
  }
};
export const updateAdminOrders = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateAdminOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData);
    dispatch(updateAdminOrderSuccess(data));
  } catch (error) {
    dispatch(updateAdminOrderFail(error.response.data.message));
  }
};
