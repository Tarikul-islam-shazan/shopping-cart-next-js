import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import { useFetchCategoryQuery } from "@/store/apis/productCategoryApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import FilterProduct from "./FilterProduct";
import { changeSortOrder } from "@/store/slices/product/ProductSlice";



const  ProductCatalog = () =>{
  const { data, error, isLoading } = useFetchCategoryQuery();
  const dispatch = useAppDispatch();
  const {total} = useAppSelector((state) => state.cart);
  const {filterCategory} = useAppSelector((state) => state.product);
  const router = useRouter();


  const goToCart = () => {
    router.push('/cart');
  }


  let content;
  if(isLoading ){
    content = <div>Loading . . .</div>
  } else if(error){
    content = <div>Error on data loading</div>
  } else{
    if(filterCategory.length> 0){
      content = filterCategory.map((category)=> {
      
        return (
          <div key={category+ (new Date()).toISOString()}>
           <div className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold flex item-center">
              {category} 
              <a href="#" key={category+ (new Date()).toISOString()} onClick={()=>dispatch(changeSortOrder())}><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
              </svg></a>
            </div>
        
       
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <CategoryWiseProduct category={category} />
            </div>
          </div>
        )
      })
    } else{
      content = data?.map((category)=> {
      
        return (
          <div key={category+ (new Date()).toISOString()}>
            <div className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold flex item-center">
              {category} 
              <a href="#" key={category+ (new Date()).toISOString()} onClick={()=>dispatch(changeSortOrder())}><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg></a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <CategoryWiseProduct category={category} />
            </div>
          </div>
        )
      })
    }
    
  }


  return (

    <div >
            <button  onClick={() => goToCart()} className="float-right" >
            <Link href="" role="button" className="relative flex">
                <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                  </svg>
                  <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {total}
                </span>
                </Link>
          
            </button>
            <div className="flex flex-wrap">
              <div className="w-1/6"> <FilterProduct/> </div>
              <div className="w-5/6"> {content}</div>
            </div>
    </div>

  )
}

export default ProductCatalog;
