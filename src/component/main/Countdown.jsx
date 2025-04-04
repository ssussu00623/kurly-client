import React, { useEffect, useState } from 'react';

const Countdown = () => {
  
  const calculateTime = () =>{    // 남은 시간을 밀리초 단위로 계산하는 함수
    const now = new Date();
    const tomorrow = new Date();
    
    tomorrow.setDate(now.getDate() +1);
    tomorrow.setHours(0,0,0,0);
    
    return tomorrow - now;
  };

  const [ timeLeft, setTimeLeft ] = useState(calculateTime()); // 상태 변수에 남은 시간을 저장 (밀리초)

  useEffect(()=>{
    const timer = setInterval(()=>{
      setTimeLeft(calculateTime());
    },1000);
    return ()=>clearInterval(timer);
  },[]);

  const seconds = Math.floor((timeLeft /1000) % 60);
  const minutes = Math.floor((timeLeft /1000 /60 ) % 60);
  const hours = Math.floor((timeLeft / 1000 /60 /60));

  return (
    <div>
      <p className='count_down'>
        🕛
        {hours.toString().padStart(2, 0)}:
        {minutes.toString().padStart(2, 0)}:
        {seconds.toString().padStart(2, 0)}
      </p>  
    </div>
  )
}
export default Countdown;
