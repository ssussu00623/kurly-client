import React from 'react';

export default function PaymentSummary({ totalPriceCal, totalPriceAll, totalPriceDc, discountAmount, icons }) {
  return (
    <div className='sticky-order-summury'>
      <span className='f20 sticky-order-title '>결제금액</span>
      <div className='order-summury-content'>
        <div className='flex space-between pmfont1'>
          <div>주문금액</div>
          <div><span>{`${totalPriceCal.toLocaleString()}원`}</span></div>
        </div>
        <div>
          <div className='flex space-between smallgrayf'>
            <div>{icons.find(i => i.label === "reply")?.icon}<span>상품금액</span></div>
            <span>{`${totalPriceAll.toLocaleString()}원`}</span>
          </div>
        </div>
        <div>
          <div className='flex space-between smallgrayf'>
            <div>{icons.find(i => i.label === "reply")?.icon}<span>상품할인금액</span></div>
            <span>{`-${totalPriceDc.toLocaleString()}원`}</span>
          </div>
        </div>
        <div className='flex space-between pmfont2'><div>배송비</div><div><span>0원</span></div></div>
        <div className='flex space-between pmfont2'><div>쿠폰할인</div><div><span>0원</span></div></div>
        <div className='flex space-between pmfont2'><div>카드즉시할인</div><div><span>{`-${discountAmount.toLocaleString()}원`}</span></div></div>
        <div className='flex space-between pmfont2'><div>적립금 · 컬리캐시</div><div><span>0원</span></div></div>
        <div>
          <div className='flex space-between smallgrayf'><div>{icons.find(i => i.label === "reply")?.icon}<span>적립금</span></div><span>0원</span></div>
        </div>
        <div>
          <div className='flex space-between smallgrayf'><div>{icons.find(i => i.label === "reply")?.icon}<span>컬리캐시</span></div><span>0원</span></div>
        </div>
        <div className='flex space-between order-total-sum'>
          <div>최종결제금액</div>
          <div><span className='f22 w600'>{Math.max(totalPriceCal - discountAmount, 0).toLocaleString()}</span><span>원</span></div>
        </div>
        <div className='f12 flex' style={{ color: "#8D4CC4", justifyContent: "flex-end" }}>컬리카드 결제 시 최대 2,490원 추가 적립</div>
      </div>
      <img className='sticky-summury-img' src="https://product-image.kurly.com/banner/da-banner/3ba822e8-a989-46a4-8b6b-9ddbc3d1fadb.png" alt="" />
    </div>
  );
}
