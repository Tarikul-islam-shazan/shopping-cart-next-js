import { IProduct } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProductState{
   data: IProduct[]
}

const initialState: ProductState = {
    data: []
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addAllProduct: (state, action: PayloadAction<IProduct[]>) => {
             state.data = action.payload;
        },
        getAllProduct: (state) => {
            return state
        },
    }
});

export const { getAllProduct,addAllProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;