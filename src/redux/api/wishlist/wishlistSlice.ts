import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { ITShirt } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WishlistState {
  products: ITShirt[];
}

const initialState: WishlistState = {
  products:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("alwan_user_wishlist_items") || "[]")
      : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<ITShirt[]>) => {
      state.products = action.payload;
      setToLocalStorage(
        "alwan_user_wishlist_items",
        JSON.stringify(state.products)
      );
    },

    addProduct: (state, action: PayloadAction<ITShirt>) => {
      const existingProducts = getFromLocalStorage(
        "alwan_user_wishlist_items"
      ) as string;
      const parsedExistingProducts: ITShirt[] = existingProducts
        ? JSON.parse(existingProducts)
        : [];

      const isExist = parsedExistingProducts.some(
        (product) => product.id === action.payload.id
      );

      if (!isExist) {
        state.products.push(action.payload);
        setToLocalStorage(
          "alwan_user_wishlist_items",
          JSON.stringify(state.products)
        );
      }
    },

    deleteProduct: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      state.products = state.products.filter(
        (product) =>
          !(
            product.id === action.payload.id &&
            product.orderSize === action.payload.size
          )
      );
      setToLocalStorage(
        "alwan_user_wishlist_items",
        JSON.stringify(state.products)
      );

      getFromLocalStorage("alwan_user_wishlist_items");
    },
    clearWishlist: (state) => {
      state.products = [];
      removeFromLocalStorage("alwan_user_wishlist_items");
      getFromLocalStorage("alwan_user_wishlist_items");
    },
  },
});

export const { setWishlist, addProduct, deleteProduct, clearWishlist } =
  wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
