import { ICategory } from '@/models';
import { useFetchProductsQuery } from '@/store/apis/productApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCartProduct } from '@/store/slices/cart/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const CategoryWiseProduct = ({ category }: ICategory) => {
  const dispatch = useAppDispatch();
    const { data, error, isLoading } = useFetchProductsQuery(category);
    const {total, addedProduct} = useAppSelector((state) => state.cart);

    const router =  useRouter();
  
    const goToProductDetailsPage = (Id: number) => {
      router.push(`/product/${Id}`)
    }
    const call = ()=> {
      console.log('call');
    }
    
    let content;
    if(isLoading ){
      content = <div>Loading . . .</div>
    } else if(error){
      content = <div>Error on data loading</div>
    } else{
      content = data?.map((product)=> {
        
        return (
            <div  key={product.id} >
              <div
             
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                
                >
                <img src={product.image} 
                alt="Front of men&#039;s Basic Tee in black." 
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
              </div>
              <div className="mt-4 flex justify-between" >
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {product.title}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
              { addedProduct.filter(p=> p.id ===product.id).length === 0 && <div className="mt-4 flex justify-between"  >
                    <button 
                    onClick={() => dispatch(addToCartProduct(product))}
                      className="text-green-600 font-bold  py-0.5 px-1 rounded outline outline-offset-2 outline-1 "
                    >
                       + ADD TO CART
                    </button>
                    <button  className="text-green-600 font-bold  py-0.5 px-1 rounded outline outline-offset-2 outline-1 "  onClick={()=> goToProductDetailsPage(product.id)}>Details</button>
              </div>}
              { addedProduct.filter(p=> p.id ===product.id).length > 0 && <div className="mt-4 flex justify-between"  >
                    <button 
                    onClick={() => dispatch(addToCartProduct(product))}
                      className="text-white font-bold   py-2 px-6 rounded bg-green-600"
                    >
                       Added
                    </button>
                    <button  className="text-green-600 font-bold  py-0.5 px-1 rounded outline outline-offset-2 outline-1"  onClick={()=> goToProductDetailsPage(product.id)}>Details</button>
              </div>}
            </div>
        )
      })
    }
  return (
    <>{content}</>
  )
}

export default CategoryWiseProduct