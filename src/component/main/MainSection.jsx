import React, { useEffect, useState } from 'react';
import MainProductList from './MainProductList.jsx';
import TodayPromotion from './TodayPromotion.jsx';
import axios from 'axios';

export default function MainSection() {
  const [ productList, setProductList ] = useState([]);

  useEffect(()=>{
    axios.get('/data/main.json')
         .then((res)=>setProductList(res.data["section_title"]))
         .catch((error)=>console.log(error))
  },[]);

  return (
    <div className='main_setion'>
      {productList && productList.map((item, i)=>(
        <div key={i}>
          <MainProductList {...item}/>
          {i ===1 && <TodayPromotion /> }
        </div>
      ))} 
    </div>
  );
}

