import { IProduct } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ProductState{
    filterCategory: string[],
    sortOrder: string;
}

const initialState: ProductState = {
    filterCategory: [],
    sortOrder: 'asc'
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        filteredCategory: (state, action: PayloadAction<string>) => {
            state.filterCategory.push(action.payload);
        },
        removeFilteredCategory: (state, action: PayloadAction<string>) => {
            state.filterCategory = state.filterCategory.filter(c => c !== action.payload);
        },
        changeSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc': 'asc';
        }
    }
});

export const { filteredCategory,removeFilteredCategory,changeSortOrder } = productSlice.actions;

export const productReducer = productSlice.reducer;