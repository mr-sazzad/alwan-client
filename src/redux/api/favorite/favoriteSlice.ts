import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { IProduct } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FavoriteState {
  products: IProduct[];
}

const initialState: FavoriteState = {
  products:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("alwan_user_favorite_items") || "[]")
      : [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      setToLocalStorage(
        "alwan_user_favorite_items",
        JSON.stringify(state.products)
      );
    },

    addProductToFavorite: (state, action: PayloadAction<IProduct>) => {
      const { id } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        state.products.splice(existingProductIndex, 1);
      } else {
        state.products.push(action.payload);
      }

      setToLocalStorage(
        "alwan_user_favorite_items",
        JSON.stringify(state.products)
      );
    },

    removeProductFromFavorite: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      setToLocalStorage(
        "alwan_user_favorite_items",
        JSON.stringify(state.products)
      );
    },

    clearFavorites: (state) => {
      state.products = [];
      removeFromLocalStorage("alwan_user_favorite_items");
    },
  },
});

export const {
  setFavorites,
  addProductToFavorite,
  removeProductFromFavorite,
  clearFavorites,
} = favoriteSlice.actions;

export const favoriteReducer = favoriteSlice.reducer;
