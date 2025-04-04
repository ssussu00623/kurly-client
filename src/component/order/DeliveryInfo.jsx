import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeliveryInfo({ userInfo }) {
    const navigate = useNavigate();

    return (
        <>
            <div className='order-page-title'>
                <p className='f20 w500'>배송정보</p>
            </div>
            <div className='delivery-content flex'>
                <span className='order-mt'>배송지</span>
                <div className='delivery-detail flex110'>
                    <span className='delivery-default'>기본배송지</span>
                    <p>{userInfo.address} {userInfo.detailaddress}</p>
                    <button className='w-btn2' onClick={() => {
                        const confirmMove = window.confirm('장바구니로 이동하시어 다른 배송지로 변경하시겠습니까?');
                        if (confirmMove) {
                            navigate("../cart");
                        }
                    }}>변경</button>
                </div>
            </div>
            <div className='delivery-content flex'>
                <span className='order-mt'>배송요청사항</span>
                <div className='delivery-detail flex110'>
                    <div>
                        <span>문앞</span>
                        <span className='line'></span>
                        <span>자유 출입 가능</span>
                    </div>
                    <div>{userInfo.name}, {userInfo.phone}</div>
                    <button className='w-btn2' style={{ color: 'gray' }}>수정</button>
                </div>
            </div>
        </>
    );
}
