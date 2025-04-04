import React from 'react';

export default function OrdererInfo({ userInfo }) {
  return (
    <>
      <div className='order-page-title flex'>
        <p className='f20 w500'>주문자 정보</p>
      </div>
      <div className='orderer-info-content'>
        <div className='orderer-info-row flex '>
          <span className='w500 order-mt'>보내는 분</span>
          <div className='flex110'>{userInfo.name}</div>
        </div>
        <div className='orderer-info-row flex'>
          <span className='w500 order-mt'>휴대폰</span>
          <div className='flex110'>{userInfo.phone}</div>
        </div>
        <div className='orderer-info-row flex'>
          <span className='w500 order-mt'>이메일</span>
          <div className='order-email'>
            <p>{`${userInfo.emailname}@${userInfo.emaildomain}`}</p>
            <p className='f12' style={{ color: "#666666" }}>이메일을 통해 주문처리 과정을 보내드립니다.</p>
            <p className='f12' style={{ color: "#666666" }}>정보변경은 마이컬리 &gt; 개인정보 수정 메뉴에서 가능합니다.</p>
          </div>
        </div>
      </div>
    </>
  );
}
