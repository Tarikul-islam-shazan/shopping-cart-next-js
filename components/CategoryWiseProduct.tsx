import { ICategory } from '@/models';
import { useFetchProductsQuery } from '@/store/apis/productApi';
import { useRouter } from 'next/router';
import React from 'react';


const CategoryWiseProduct = ({ category }: ICategory) => {
    const { data, error, isLoading } = useFetchProductsQuery(category);

    const router =  useRouter();
  
    const goToProductDetailsPage = (Id: number) => {
      router.push(`/product/${Id}`)
    }
    
    let content;
    if(isLoading ){
      content = <div>Loading . . .</div>
    } else if(error){
      content = <div>Error on data loading</div>
    } else{
      content = data?.map(product=> {
        
        return (
            <div className="group relative" key={product.id} onClick={() => goToProductDetailsPage(product.id)}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={product.image}
                alt="Front of men&#039;s Basic Tee in black." 
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {product.title}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">  {product.description}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
    
  
              </div>
              <div className="mt-4 flex justify-between">
                
                    <button 
                      className="text-green-600 font-bold  py-2 px-4  rounded outline outline-offset-2 outline-1"
                    >
                       + ADD TO CART
                    </button>
              </div>
            </div>
        )
      })
    }
  return (
    <>{content}</>
  )
}

export default CategoryWiseProduct