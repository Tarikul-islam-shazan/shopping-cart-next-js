import { IProduct } from '@/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IProductQuery{
    name: string;
    order: string;
}

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://fakestoreapi.com' 
    }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<IProduct[], IProductQuery>({
            query: ({name,order}) => `/products/category/${name}?sort=${order}`
        }),
    }),
});

export const { useFetchProductsQuery } = productApi ;
export { productApi };

