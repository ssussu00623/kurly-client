import React, { useState, useEffect, useContext } from 'react';
import { CiMemoPad, CiGift, CiHeart, CiDeliveryTruck } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext.js';
import MypageOrder from './MypageOrder.jsx';
import MypageCoupon from './MypageCoupon.jsx';
import MypageHeart from './MypageHeart.jsx';
import MemberUpdate from './MemberUpdate.jsx';
import MemberError from './MemberError.jsx';
import KakaoTalkButton from './KakaoTalkButton.jsx'
import { CartContext } from '../../context/CartContext.js';


export default function Mypage() {
    const navigate = useNavigate();
    const { active } = useParams();
    const { wishListCnt, setWishListCnt } = useContext(CartContext);
    // AuthContext에서 로그인 상태(isLogin)와 userId를 가져옴
    const { isLogin, setIsLogin, userType } = useContext(AuthContext);

    // userName의 기본값
    const [userName, setUserName] = useState('');


    //Mypage 클릭시 가장 먼저 노출되는 탭 : 주문내역
    const [activeTab, setActiveTab] = useState(active);


    // handleMenuClick 함수 정의
    const handleMenuClick = (tab) => {
        setActiveTab(tab);
    }
    // 1:1문의 클릭 이벤트
    const memberClick = () => {
        alert('현재는 톡상담 서비스 이용시간입니다.');
    };
    // 로그인 상태 확인 후 로그인 상태가 아닐 경우 오류 페이지 출력
    useEffect(() => {
        const id = localStorage.getItem("user_id");
        axios
            .post('http://localhost:9000/member/mypage', { 'id': id })
            .then(res => setUserName(res.data.name))
            .catch((error) => console.log(error));
    }, []); // 의존성 배열 추가

    if (!isLogin) {
        navigate("/member/error")
    }

    // 로그인 상태일 때만 아래 코드 실행
    return (
        <div className='member_content_outline'>
            <div className='member_content'>
                <div className='member_my_page'>
                    <div className='member_my_side'>
                        <div className='member_my_side_1'>
                            <div className='member_my_customer'>
                                <span className='shimmer_text'>반가워요!</span>
                                <span>{userName ? `     ${userName}님!` : '이름을 불러올 수 없습니다.'}</span>
                            </div>
                            <div className='member_my_side_point'>
                                <div>
                                    <label>적립금</label>
                                    <label> 0원</label>
                                </div>
                                <div>
                                    <label>포인트</label>
                                    <label> 0원</label>
                                </div>
                            </div>
                        </div>
                        <div className='member_my_sand'></div>
                        <div className='member_my_side_2'>
                            <p>자주찾는 메뉴</p>
                            <div className={`member_click ${activeTab === 'order' ? 'activeTab' : ''}`} onClick={() => handleMenuClick('order')}>
                                <div><CiMemoPad size={30} style={{ fill: activeTab === 'order' ? '#5f0080' : '' }} /></div>
                                <label>주문내역</label>
                            </div>
                            <div className={`member_click ${activeTab === 'coupon' ? 'activeTab' : ''}`} onClick={() => handleMenuClick('coupon')}>
                                <div><CiGift size={30} style={{ fill: activeTab === 'coupon' ? '#5f0080' : '' }} /></div>
                                <label>쿠폰</label>
                                <span>0</span>
                            </div>
                            <div className={`member_click ${activeTab === 'heart' ? 'activeTab' : ''}`} onClick={() => handleMenuClick('heart')}>
                                <div><CiHeart size={30} style={{ fill: activeTab === 'heart' ? '#5f0080' : '' }} /></div>
                                <label>찜한 상품</label>
                                <span>{wishListCnt}</span>
                            </div>
                        </div>
                        <div className='member_popup'>
                            <div>
                                <img onClick={() => navigate("/main/special")} src="http://localhost:3000/images/commonImage/event10.jpg" style={{ width: "350px" }} />
                            </div>
                        </div>
                        <div className='member_my_side_3'>
                            <div>
                                <p>내 정보 관리</p>
                                <div className={`member_click ${activeTab === 'update' ? 'activeTab' : ''}`} onClick={() => handleMenuClick('update')}>
                                    <label>개인정보 수정</label>
                                </div>
                                <div className='kakao_button'> 
                                    <label onClick={() => memberClick()} style={{ cursor: "pointer" }}>1:1문의 </label>
                                    <KakaoTalkButton />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='memever_my_right'>
                        <div className='member_my_right_1'>
                            {activeTab === 'order' && <MypageOrder />}
                            {activeTab === 'coupon' && <MypageCoupon />}
                            {activeTab === 'heart' && <MypageHeart />}
                            {activeTab === 'update' && <MemberUpdate />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
