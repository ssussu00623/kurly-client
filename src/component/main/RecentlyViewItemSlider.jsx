import React, { useEffect, useRef, useState, useContext  } from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useNavigate } from 'react-router-dom';
import { useRecently } from '../../hooks/useRecently.js';
import { SearchContext } from '../../context/searchContext.js';


export default function RecentlyViewItemSlider() {
  const { recentlyItems } = useContext(SearchContext);
  const { getRecntlyItems } = useRecently();
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(recentlyItems){
      getRecntlyItems();
    }
  }, [recentlyItems]);
  
  const settings= {
    infinite:false,
    vertical:true,
    verticalSwiping:true,
    slidesToShow:3,
    slidesToScroll:1,
    initialSlide: 0,
    arrows:true
  };
  
   const handlePrevClick = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };
 

  return (
    (recentlyItems.length > 0) ? (
      <div className='side_bar3'>
        <button className='custom-prev custom-arrow' onClick={handlePrevClick}>▲</button>
        최근 본 상품
        <div className='side_bar3_1'>
          <Slider ref={sliderRef} {...settings}>
            {recentlyItems && recentlyItems.map((item, i)=>(
              <div key={i}>
                <img src={item.upload_img} alt="recently view img" className='recently_img'  onClick={()=>navigate(`/goods/detail/${item.pid}`)}/>
              </div>
            ))}
          </Slider>
        </div>
        <button className='custom-next custom-arrow' onClick={handleNextClick}>▼</button>
      </div>
    ) : (
      <></>
    )
  );
};


