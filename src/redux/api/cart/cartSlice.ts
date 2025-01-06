import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../helpers/local-storage";
import { IProduct } from "../../../types";

interface CartState {
  products: IProduct[];
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
    setCart: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      setToLocalStorage(
        "alwan_user_cart_items",
        JSON.stringify(state.products)
      );
    },

    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      const { id, orderSize, orderColor, orderColorId, orderSizeId } =
        action.payload;

      const existingProduct = state.products.find(
        (product) =>
          product.id === id &&
          product.orderSize.toUpperCase() === orderSize.toUpperCase() &&
          product.orderColor.toUpperCase() === orderColor.toUpperCase()
      );

      if (existingProduct) {
        existingProduct.orderQty += 1;
      } else {
        state.products.push({
          ...action.payload,
          orderColorId,
          orderSizeId,
        });
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
      console.log(action.payload);

      const product = state.products.find(
        (product) =>
          product.id === id &&
          product.orderSize === size &&
          product.orderColor === color
      );

      if (product) {
        const variant = product.sizeVariants.find(
          (variant) =>
            variant.size.name.toUpperCase() === size.toUpperCase() &&
            variant.color.name.toUpperCase() === color.toUpperCase()
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
            variant.size.name.toUpperCase() === size.toUpperCase() &&
            variant.color.name.toUpperCase() === color.toUpperCase()
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
      action: PayloadAction<{ id: string; size: string; color: string }>
    ) => {
      state.products = state.products.filter(
        (product) =>
          !(
            product.id === action.payload.id &&
            product.orderSize.toUpperCase() ===
              action.payload.size.toUpperCase() &&
            product.orderColor.toUpperCase() ===
              action.payload.color.toUpperCase()
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
