import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import usersReducer from "./slices/usersSlice";
import shopReducer from "./slices/shopSlice"; 

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  usersState: usersReducer,
  shopState: shopReducer, 
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
