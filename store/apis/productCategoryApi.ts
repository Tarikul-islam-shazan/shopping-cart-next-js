import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fakestoreapi.com' 
    }),
    endpoints: (builder) => ({
        fetchCategory: builder.query<string[], void>({
            query: () => '/products/categories'
        })
    })
});

export const { useFetchCategoryQuery } = productCategoryApi;
export { productCategoryApi}