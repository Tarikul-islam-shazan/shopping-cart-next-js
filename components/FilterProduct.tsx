import { useFetchCategoryQuery } from '@/store/apis/productCategoryApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { filteredCategory, removeFilteredCategory } from '@/store/slices/product/ProductSlice';
import React, { useState } from 'react'

// export interface ICheckedCategory{
//   category: string;
//   status: boolean;
// }

const FilterProduct = () => {
  const { data, error, isLoading } = useFetchCategoryQuery();
  const dispatch = useAppDispatch();
  //const [isChecked, setIsChecked] = useState<ICheckedCategory[]>([]);
  const {filterCategory} = useAppSelector((state) => state.product);
  const handleOnchange = (e: React.FormEvent<HTMLInputElement>, category: string) => {
    // console.log('call',e.currentTarget.checked);
    // let filterCategory: string[] =[];
    if(e.currentTarget.checked){
      //setIsChecked([...isChecked,{status: e.currentTarget.checked, category }]);
      dispatch(filteredCategory(category));
    } else{
      //setIsChecked(isChecked.filter(c => c.category !== category));
      dispatch(removeFilteredCategory(category));
    }
  }
  let content;
  if(isLoading ){
    content = <div>Loading . . .</div>
  } else if(error){
    content = <div>Error on data loading</div>
  } else {
    content = data?.map(category => {
      return (
        <div className="flex items-center" key={category}>
          <input checked={filterCategory.filter(c => c === category)[0]? true : false} id={category}
                type="checkbox" 
                onChange={(e) => handleOnchange(e,category)} 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={category}className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category}</label>
      </div>
      )
    })
  }

  return (
    <div>
      <h2  className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold">Filter By Category</h2>
      {content}
    </div>

  )

}

export default FilterProduct
