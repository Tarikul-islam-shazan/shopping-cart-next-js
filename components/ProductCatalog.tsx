import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import { useFetchCategoryQuery } from "@/store/apis/productCategoryApi";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import FilterProduct from "./FilterProduct";



const  ProductCatalog = () =>{
  const { data, error, isLoading } = useFetchCategoryQuery();
  const {total} = useAppSelector((state) => state.cart);
  const router = useRouter();

  const goToCart = () => {
    console.log('call')
    router.replace('/','/cart');
  }


  let content;
  if(isLoading ){
    content = <div>Loading . . .</div>
  } else if(error){
    content = <div>Error on data loading</div>
  } else{
    content = data?.map((category,index)=> {
      
      return (
        <div key={index+category}>
          <h2  className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold">{category}</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <CategoryWiseProduct  category={category} />
          </div>
        </div>
      )
    })
  }


  return (
    <div>
            <button  onClick={() => goToCart()} className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700 float-right">
              <Link href="/cart"  role="button" className="relative flex">
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
              <div className="w-4/5"> {content}</div>
            </div>
     
            
            {/* {content} */}
    </div>

  )
}

export default ProductCatalog;
