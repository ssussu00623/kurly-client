import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

export default function HeaderPromotionBanner() {
  const [ btnCloseState, setBtnCloseState ] = useState(true);

  const handleCllose = () =>{
    setBtnCloseState(false);
  };

  return (
    <>
      {btnCloseState &&
        <div className='top_banner_content'>
          <div className='top_banner'>
            <div className='banner_content'>
              지금 가입하고 <span>최대 1만원 할인 쿠론</span> 받아가세요!
            </div>
              <button type='button' onClick={handleCllose}>
                <IoClose className='top_banner_btn' size={20}/>
              </button>
          </div>
        </div>
        }
    </>
  );
}

