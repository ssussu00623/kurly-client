import React, { useContext, useEffect, useCallback} from 'react';
import RecentlyViewItemSlider from './RecentlyViewItemSlider.jsx';
import { SearchContext } from "../../context/searchContext.js";
import { useNavigate } from "react-router-dom";
import '../../scss/main.scss'

const  MainSideBarMenu = React.memo(()=>{
  const { setSearchKeyword } = useContext(SearchContext);
  const navigate = useNavigate();
  
  const handleCateNavigate = useCallback((path) => {  
    setSearchKeyword('');
    navigate(path);
  },[navigate, setSearchKeyword]);

  useEffect(() => {
     const handleScroll = () => {
      (window.scrollY > 200)
      ? document.body.classList.add('scrolled')
      : document.body.classList.remove('scrolled');
     };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <>
      <div className='side_bar_outline'>
        <div className='side_bar1'>
          <div className='side_delivery_info'>
            <img src="/images/commonImage/deliveryInfo.jpg" alt=""  onClick={() => handleCateNavigate('/member/delivery')}/>
          </div>
        </div>
        <div className='side_bar2' >
          <ul>
            <li>컬리 고객 제도</li>
            <li>컬리 큐레어터</li>
            <li>레시피</li>
          </ul>
        </div>
        <RecentlyViewItemSlider/> 
      </div>
    </>
  );
});

export default MainSideBarMenu;
