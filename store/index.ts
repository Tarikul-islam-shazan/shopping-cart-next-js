import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product/ProductSlice";
import { productApi } from "./apis/productApi";
import { setupListeners } from '@reduxjs/toolkit/query';
import { productCategoryApi } from "./apis/productCategoryApi";
import { productDetailsApi } from "./apis/productDetailsApi";
import { cartReducer } from "./slices/cart/cartSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [productCategoryApi.reducerPath]: productCategoryApi.reducer,
        [productDetailsApi.reducerPath]: productDetailsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productApi.middleware,
            productCategoryApi.middleware, 
            productDetailsApi.middleware
        ), 

});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;