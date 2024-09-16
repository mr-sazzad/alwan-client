import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./base-api";
import { cartReducer } from "./cart/cartSlice";
import { favoriteReducer } from "./favorite/favoriteSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  favorite: favoriteReducer,
  cart: cartReducer,
});
