import { useFetchCategoryQuery } from '@/store/apis/productCategoryApi';
import React from 'react'

const FilterProduct = () => {
  const { data, error, isLoading } = useFetchCategoryQuery();
  let content;
  if(isLoading ){
    content = <div>Loading . . .</div>
  } else if(error){
    content = <div>Error on data loading</div>
  } else{
    content = data?.map(category => {
      return (
        <li className="flex items-center">
        <input id={category} type="checkbox" value=""
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-primary-500  focus:ring-2 " />

        <label htmlFor={category} className="ml-2 text-sm font-medium text-gray-900 ">
        {category}
        </label>
      </li>

      )
    })
  }

  return (
    <div>
      <h2  className="text-2xl font-bold tracking-tight text-gray-900 uppercase text-blue-600 font-bold">Filter By Category</h2>
      <div className="flex items-center mb-4">
        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
      </div>
      <div className="flex items-center">
          <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
      </div>
    </div>

  )

}

export default FilterProduct
