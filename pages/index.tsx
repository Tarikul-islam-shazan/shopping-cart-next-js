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
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    {content}
  </div>
</div>
  )
}

export default Home;
