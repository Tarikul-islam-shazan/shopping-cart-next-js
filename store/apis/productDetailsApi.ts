import { IProduct } from '@/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://fakestoreapi.com' 
    }),
    endpoints: (builder) => ({
        fetchProductDetailsById: builder.query<IProduct, string>({
            query: (Id) => `/products/${Id}`
        }),
    }),
});

export const { useFetchProductDetailsByIdQuery } = productDetailsApi ;
export { productDetailsApi };