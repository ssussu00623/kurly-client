import React, { useEffect, useState ,useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import PromoBanner from './PromoBanner.jsx';

export default function PromoBannerSlider() {
  const [ bannerImgs, setBannerImg ] = useState([]);
  const [ currentSlide, setCurrentSlide ] = useState(0);
  const handleBeforeChange = useCallback((oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  }, []);

  const settings = {
    dots: false,
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    speed: 500,
    autoplay: true,      // 자동 재생
    autoplaySpeed: 3500, // 자동 재생 속도
    slidesToShow: 1,    // 한번에 보여줄 슬라이드 개수
    slidesToScroll: 1,  // 한번에 넘어가는 슬라이드 개수
    pauseOnFocus: true,
    pauseOnHover: true,
    arrows: true,
    beforeChange: handleBeforeChange, 
  };

  

  useEffect(()=>{
    axios.get('/data/main.json')
         .then((res)=>setBannerImg(res.data["banner_img"]))
         .catch((error)=>console.log(error));
  },[]);

  return (
    <div className='promotion_banner'>
      <div className='promotion_section'> 
        <Slider {...settings}> 
          {bannerImgs && bannerImgs.map((banner, i) => (
            <PromoBanner key={i} {...banner} />
          ))}
        </Slider>
        <div className='pagenation'>
          { bannerImgs.length > 0 && `${currentSlide + 1} / ${bannerImgs.length}`} 
        </div>
      </div>    
    </div>
  );
}

