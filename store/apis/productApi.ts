import { IProduct } from '@/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://fakestoreapi.com' 
    }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<IProduct[], string>({
            query: (name) => `/products/category/${name}?sort=asc`
        }),
    }),
});

export const { useFetchProductsQuery } = productApi ;
export { productApi };

