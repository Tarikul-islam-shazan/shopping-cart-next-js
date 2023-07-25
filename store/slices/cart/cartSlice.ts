import { IProduct } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProductState{
  addedProduct: IProduct[]
  total: number
}

const initialState: ProductState = {
    addedProduct: [],
    total: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartProduct: (state, action: PayloadAction<IProduct[]>) => {
             state.addedProduct.push(...action.payload);
        },
    }
});

export const { addToCartProduct } = cartSlice.actions;

export const productReducer = cartSlice.reducer;