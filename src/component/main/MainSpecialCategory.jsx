import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainSideBarMenu  from '../main/MainSideBarMenu.jsx';

export default function MainSpecialCategory() {
  const [specialEvent, setSpecialEvent] = useState([]);

  useEffect(()=> {
    axios.get('/data/main.json')
         .then((res)=>setSpecialEvent(res.data["special_category"]) )
         .catch((error)=>console.log(error))
  },[]);

  return (
    <div className='content_outline'>
      <MainSideBarMenu />
      <ul className='content'>
        {specialEvent && specialEvent.map((event, i)=>(
          <li key={i} className='special_category'>
            <img src={event.img} alt="image" />
          </li>
        ))
        }
      </ul>  
    </div>
  );
}

