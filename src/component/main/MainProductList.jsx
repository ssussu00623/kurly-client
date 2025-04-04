import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainProductListSlider from './MainProductListSlider.jsx';

export default function MainProductList(props) {
  const navigate = useNavigate();

  return (
    <div  className='main_product_section'>
      <div className='section_title'>
        <button type='button' onClick={()=>navigate(props.path)}>
          <span className='mtitle'>{props.title}</span>        
          <span className='mtitle_img'>
            <img src="/images/commonImage/section_icon1.svg" alt="icon" />  
          </span>        
        </button>
        <p className='section_subtitle'>{props.sub_title}</p>   
      </div>
      <div>
        <MainProductListSlider category={props.category}/>
      </div>
    </div>
  );
}

