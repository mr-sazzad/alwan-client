import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { IUserCartProduct } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  products: IUserCartProduct[];
}

const initialState: CartState = {
  products:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("alwan_user_cart_items") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IUserCartProduct[]>) => {
      state.products = action.payload;
      setToLocalStorage(
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
    },

    addProductToCart: (state, action: PayloadAction<IUserCartProduct>) => {
      const { id } = action.payload;
      const { orderSize, orderColor } = action.payload;

      const existingProduct = state.products.find(
        (product) =>
          product.id === id &&
          product.orderSize === orderSize &&
          product.orderColor === orderColor
      );

      if (existingProduct) {
        existingProduct.orderQty += 1;
      } else {
        state.products.push(action.payload);
      }

      setToLocalStorage(
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
    },

    increaseProductQty: (
      state,
      action: PayloadAction<{ id: string; size: string; color: string }>
    ) => {
      const { id, size, color } = action.payload;

      const product = state.products.find(
        (product) =>
          product.id === id &&
          product.orderSize === size &&
          product.orderColor === color
      );

      if (product) {
        const variant = product.sizeVariants.find(
          (variant) =>
            variant.size.name === size && variant.color.name === color
        );

        if (variant && product.orderQty < variant.stock) {
          product.orderQty += 1;
        }
      }

      setToLocalStorage(
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
    },

    decreaseProductQty: (
      state,
      action: PayloadAction<{ id: string; size: string; color: string }>
    ) => {
      const { id, size, color } = action.payload;

      const product = state.products.find(
        (product) =>
          product.id === id &&
          product.orderSize === size &&
          product.orderColor === color
      );

      if (product) {
        const variant = product.sizeVariants.find(
          (variant) =>
            variant.size.name === size && variant.color.name === color
        );

        if (variant && product.orderQty > 1) {
          product.orderQty -= 1;
        }
      }

      setToLocalStorage(
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
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
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
    },

    clearCart: (state) => {
      state.products = [];
      removeFromLocalStorage("alwan_user_cart_items");
    },
  },
});

export const {
  setCart,
  addProductToCart,
  increaseProductQty,
  decreaseProductQty,
  deleteProduct,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
