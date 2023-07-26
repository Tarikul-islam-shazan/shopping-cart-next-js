import { IProduct } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface CartState{
  addedProduct: IProduct[]
  total: number
  totalPrice: number
}

export interface IProductUpdateByValue{
    product : IProduct,
    value: number
}

const initialState: CartState = {
    addedProduct: [],
    total: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartProduct: (state, action: PayloadAction<IProduct>) => {
            if(action.payload.id === 0) return;
            const exist = state.addedProduct.filter(p => action.payload.id === p.id);
            if(exist.length > 0){
                return ;
            } else {
                let { cartCount} = action.payload;
                cartCount = 1;
                const data = {...action.payload, cartCount}
                state.addedProduct.push(data);
                state.total ++; 
                state.totalPrice =state.totalPrice + (data.cartCount * parseFloat(data.price))
            }
            
        },
        removeCartProduct: (state, action: PayloadAction<IProduct>) => {
            state.addedProduct = state.addedProduct.filter(p => action.payload.id !== p.id);
            const {cartCount, price} = action.payload;
            if( state.total === 1){
                state.total = 0;
                state.totalPrice = 0;
            } 
            else{
                state.total = state.total - cartCount;
                state.totalPrice = state.totalPrice - (cartCount * parseFloat(price))
            } 
        },
        increment: (state, action:  PayloadAction<IProduct>) => {
            const exist = state.addedProduct.filter(p => action.payload.id === p.id);
            if(exist.length > 0){
                exist[0].cartCount ++;
                const index = state.addedProduct.findIndex(p => action.payload.id === p.id);
                state.addedProduct[index] = exist[0];
                state.total ++;
                state.totalPrice = state.totalPrice + parseFloat(exist[0].price);
            }
        },

        decrement: (state, action:  PayloadAction<IProduct>) => {
            const exist = state.addedProduct.filter(p => action.payload.id === p.id);
            if(exist.length > 0){
                if(exist[0].cartCount === 1){
                    state.addedProduct = state.addedProduct.filter(p => action.payload.id !== p.id);
                    state.total --;
                    state.totalPrice = state.totalPrice - parseFloat(exist[0].price);
                    return;
                };
                exist[0].cartCount --;
                const index = state.addedProduct.findIndex(p => action.payload.id === p.id);
                state.addedProduct[index] = exist[0];
                state.total --;
                state.totalPrice = state.totalPrice - parseFloat(exist[0].price);

            }
        },

        incrementByValue: (state, action:  PayloadAction<IProductUpdateByValue>) => {
            const exist = state.addedProduct.filter(p => action.payload.product.id === p.id);
            if(exist.length > 0){
                state.total = state.total - exist[0].cartCount;
                state.totalPrice = state.totalPrice - (exist[0].cartCount * parseFloat(exist[0].price));
              exist[0].cartCount = action.payload.value;
              const index = state.addedProduct.findIndex(p => action.payload.product.id === p.id);
              state.addedProduct[index] = exist[0];
              state.total = state.total + exist[0].cartCount;
              state.totalPrice = state.totalPrice + (exist[0].cartCount * parseFloat(exist[0].price));
            }
        },
    }
});

export const { addToCartProduct,increment,decrement,removeCartProduct,incrementByValue } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;