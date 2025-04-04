import React, { useContext, useEffect} from 'react';
import PromoBannerSlider from '../component/main/PromoBannerSlider.jsx';
import MainSideBarMenu from'../component/main/MainSideBarMenu.jsx';
import MainSection from'../component/main/MainSection.jsx';
import MainPopUp from'../component/main/MainPopUp.jsx';

export default function KurlyMain() {

  return (
    <div className='content-outline'>
      <PromoBannerSlider />
      <MainSideBarMenu />
      <div className='content'> 
        <MainPopUp />
        <MainSection /> 
      </div>
    </div>
  );
}

