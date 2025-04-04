/* 2025.02.24 김다희 작성 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductThumb from '../component/detail/ProductThumb.jsx';

export default function ProductListCategoryDetail() {
  const { categoryCid, categorySid } = useParams();
  const [ cateProductList, setCateProductList ] = useState([]);

  useEffect(()=> { 
    const fetchCategoryData = async() =>{
      try {
       const result =  
        (categorySid === undefined) ? await axios.post('http://54.180.92.85:9000/main/categories', {cid : categoryCid})
         : await axios.post('http://54.180.92.85:9000/main/subcategories', {cid : categoryCid, sid: categorySid});
        setCateProductList(result.data); 
      } catch (error) {
         console.log(error);
      }
    };
    fetchCategoryData();
  },[categoryCid, categorySid]);

  
  return (
    <div className='product_list'>
      <div className="inner">
        { cateProductList.map((item, i)=>(
          <ProductThumb  product={item} key={i}/>
        ))
        }
    </div>     
    </div>
  );
}

