import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./base-api";
import { cartReducer } from "./cart/cartSlice";
import { wishlistReducer } from "./wishlist/wishlistSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
});
