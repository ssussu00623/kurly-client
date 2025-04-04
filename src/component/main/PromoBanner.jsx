import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PromoBanner(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className='promotion_img' onClick={handleClick}>
      <img src={props.img} alt="banner_img" />
    </div>
  );
}


