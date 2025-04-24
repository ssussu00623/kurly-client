/***********************************
 ****** 결제 : 정서령
 **********************************/
 import React, { useState, useContext, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import '../scss/cart.scss';
 
 import { useOrder } from "../hooks/useOrder.js";
 import { useCart } from "../hooks/useCart.js";
 import { useCalculate } from "../hooks/useCalculate.js";
 import { OrderContext } from "../context/orderContext.js";
 import { AuthContext } from "../component/auth/AuthContext.js";
 
 // 컴포넌트 import
 import CheckoutPage from '../component/payments/Checkout.jsx';
 import DeliveryInfo from '../component/order/DeliveryInfo.jsx';
 import OrderProductList from '../component/order/OrderProductList.jsx';
 import PaymentSummary from '../component/order/PaymentSummary.jsx';
 import OrderInfo from '../component/order/OrderInfo.jsx';

 
 export default function Order() {
 
   const { orderList, userInfo, setUserInfo } = useContext(OrderContext);
   const { totalPriceAll, totalPriceDc, totalPriceCal } = useCalculate();
   const { getUserInfo, getOrderList } = useOrder();
   const { getCartList } = useCart();
   const { isLogin } = useContext(AuthContext);
   const navigate = useNavigate();
 
   const [isChecked, setIsChecked] = useState(false);
   const [isToggled, setIsToggled] = useState(false);
   const [discountAmount, setDiscountAmount] = useState(0);
 
   useEffect(() => {
     if (!isLogin) {
       if (window.confirm("로그인이 필요합니다. 로그인 하시겠습니까?")) {
         navigate('/member/login');
       } else {
         navigate('/');
       }
       return;
     }
     getOrderList();
     getUserInfo();
     getCartList();
   }, [isLogin]);
 
   const handleRadioChange = () => {
     const checked = !isChecked;
     setIsChecked(checked);
     setDiscountAmount(checked ? 10000 : 0);
   };
 
   const toggleList = () => {
     setIsToggled(prev => !prev);
   };
 
   const icons = [
     {
       label: "toggle",
       icon: (<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#333" strokeWidth="2" strokeLinecap="square" transform="rotate(135 15.5 16.5)"><path d="M11 12h9v9"></path></g></svg>)
     },
     {
       label: "fold-toggle",
       icon: (<svg width="30" height="30" viewBox="0 0 30 30"><defs><path id="7a02qqg3ja" d="M11 12h9v9"></path></defs><g fill="none" fillRule="evenodd"><path d="M0 0h30v30H0z"></path><use stroke="#333" strokeWidth="2" strokeLinecap="square" transform="rotate(-45 15.5 16.5)" href="#7a02qqg3ja"></use></g></svg>)
     },
     {
       label: "reply",
       icon: (<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1 5H0V10V11H1H6V10H1V5Z" fill="#ddd"></path></svg>)
     }
   ];
 
   return (
     <div className='content order-wrap'>
       <p className='c-title'>주문서</p>
 
       {/* 주문상품 영역 */}
       <div className='order-page-title-n space-between'>
         <p className='order-title f20 w500 flex'>주문 상품</p>
         <button type='button' onClick={toggleList}>
           {isToggled
             ? (icons.find(icon => icon.label === "toggle")?.icon || "실패")
             : (icons.find(icon => icon.label === "fold-toggle")?.icon || "실패")}
         </button>
       </div>
 
       <OrderProductList isToggled={isToggled} toggleList={toggleList} orderList={orderList} />
 
       {/* 주문자 정보 */}
       <OrderInfo userInfo={userInfo} />
 
       {/* 배송정보 */}
       <DeliveryInfo userInfo={userInfo} />
 
       <div className='order-delivery-b'>
         {/* 결제 왼쪽 영역 */}
         <div className='order-delivery-bl'>
 
           <div className='order-page-title'>
             <p className='f20 w500'>쿠폰</p>
           </div>
           <div className='delivery-content flex'>
             <span className='order-mt'>쿠폰적용</span>
             <div className='flex110'>
               <div>
                 <button className='coupon1'>사용가능 쿠폰 0장 / 전체 0장<span></span></button>
               </div>
               <button className='flex align-center'>
                 <span className='f12' style={{ color: "rgb(95, 0, 128)" }}>쿠폰 사용 문의(카카오톡)</span>
                 <span className='move'></span>
               </button>
               <div className='coupon-event'>
                 <img src="https://product-image.kurly.com/banner/da-banner/3b9e207f-dc01-4120-b848-7c50969b8fcb.png" alt="" />
               </div>
             </div>
           </div>
 
           {/* 첫 결제 혜택 */}
           <div className='order-page-title'>
             <p className='f20 w500'>첫 결제 혜택</p>
           </div>
           <div className='order-card-content flex'>
             <span className='order-mt'>즉시할인</span>
             <div className='flex110'>
               <div className='order-card-row'>
                 <div>
                   <p>첫 결제 1만원 할인</p>
                   <div>
                     <label className='coupon-radio'>
                       <input type="checkbox" checked={isChecked} onChange={handleRadioChange} className='radio-input' />
                       <div className='radio-btn'>
                         {/* 라디오 UI */}
                         <svg className={`icon unchecked ${isChecked ? 'hidden' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z" stroke="#ddd" fill="#fff"></path><path d="M7 12.6667L10.3846 16L18 8.5" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                         <svg className={`icon checked ${isChecked ? '' : 'hidden'}`} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#5f0080"></path><path d="M7 12.6667L10.3846 16L18 8.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                       </div>
                     </label>
                     <span style={{ color: "rgb(153, 153, 153)" }}>-10,000원 즉시할인 적용</span>
                   </div>
                 </div>
                 <button className='order-btn2' onClick={() => alert('준비중 입니다.')}>카드발급</button>
               </div>
             </div>
           </div>
 
           {/* 결제수단 */}
           <div className='order-page-title'>
             <p className='f20 w500'>결제수단</p>
           </div>
           <div className='order-miles-content'>
             <span className='order-mt'>결제수단 선택</span>
             <div className='order-payment-content'>
               <CheckoutPage totalPriceCal={totalPriceCal} />
             </div>
           </div>
 
         </div>
 
         {/* 결제 우측 요약 */}
         <div className='order-delivery-br'>
           <PaymentSummary
             totalPriceCal={totalPriceCal}
             totalPriceAll={totalPriceAll}
             totalPriceDc={totalPriceDc}
             discountAmount={discountAmount}
             icons={icons}
           />
         </div>
       </div>
     </div>
   );
 }
 