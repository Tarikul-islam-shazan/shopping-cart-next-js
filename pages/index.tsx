import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import { useFetchCategoryQuery } from "@/store/apis/productCategoryApi";


const  Home = () =>{
  const { data, error, isLoading } = useFetchCategoryQuery();


  let content;
  if(isLoading ){
    content = <div>Loading . . .</div>
  } else if(error){
    content = <div>Error on data loading</div>
  } else{
    content = data?.map(category=> {
      
      return (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold">{category}</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <CategoryWiseProduct category={category} />
          </div>
        </>
      )
    })
  }


  return (

    <>{content}</>
  )
}

export default Home;
