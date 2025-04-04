
/***********************************
 ****** 장바구니 : 정서령
 **********************************/
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/cart.scss';
import axios from "axios";
// contexts, custom hooks
import { useCart } from "../hooks/useCart.js";
import { useCalculate } from "../hooks/useCalculate.js";
import { CartContext } from "../context/CartContext.js";
import { AuthContext } from "../component/auth/AuthContext.js";
// components
import ProductItem from '../component/cart/ProductItem.jsx';
import Packaging2 from '../component/cart/Packaging2.jsx';
import Packaging from '../component/cart/Packaging.jsx';
import CheckBox from '../component/cart/CheckBox';
import SelectAll from '../component/cart/SelectAll';
//librarys
import Postcode from '../component/cart/Postcode.jsx';
import { Modal } from 'antd';

export default function Carts() {

    /*------------------------ 전역 ---------------------- */
    const { cartList, setCartList, checkProduct, setCheckProduct, cartAddress } = useContext(CartContext);
    const { totalPriceAll, totalPriceDc, totalPriceCal } = useCalculate();
    const { getCartList, deleteCheckedItems, getUserAddress } = useCart();
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allChecked, setAllChecked] = useState(false);





    /*---- 로그인 했을 때 장바구니 담긴 정보 가져오기 ---- */

    useEffect(() => {
        if (!isLogin) {
            window.confirm("로그인 서비스가 필요합니다. \n로그인 하시겠습니까?")
                ? navigate('/member/login')
                : navigate('/');
            return;
        }
        getCartList();
        getUserAddress();
    }, [isLogin]);


    /*---- 페이지 로딩시 카트리스트 기본적으로 전체 선택 후 로컬스토리지 저장 ---- */
    useEffect(() => {
        if (cartList.length > 0) {
            const allCheckedNos = cartList.map(item => item.no);
            setCheckProduct(allCheckedNos);
            setAllChecked(true);

            localStorage.setItem("checkedItems", JSON.stringify(allCheckedNos));
        }
    }, [cartList]);




    const handleAllCheck = () => {
        const checkedNos = allChecked ? [] : cartList.map(item => item.no);

        setCheckProduct(checkedNos);
        localStorage.setItem("checkedItems", JSON.stringify(checkedNos));

        setAllChecked(!allChecked);
    };





    /* 장바구니 체크박스 개별 선택 -> 로컬스토리지 저장 */

    const handleCheck = (no) => {
        setCheckProduct(prev => {
            const updatedChecked = prev.some(item => item === no)
                ? prev.filter(item => item !== no)
                : [...prev, no];

            localStorage.setItem("checkedItems", JSON.stringify(updatedChecked));
            return updatedChecked;
        });
    };





    /* daum postcode */
    const [isOpen, setIsOpen] = useState(false);


    const handleComplete = () => {
        setIsOpen(false);
    };

    const handleTogle = () => {
        setIsOpen((prev) => !prev);
    };


    /* svg 아이콘들 */
    const icons = [
        {
            label: "xmark",
            icon: (<svg width="12.85" height="12.85" viewBox="0 0 16 16" fill="#333333" xmlns="http://www.w3.org/2000/svg"><path d="M1.63492 0.22168L0.220703 1.63589L6.58466 7.99985L0.220703 14.3638L1.63492 15.778L7.99888 9.41407L14.3628 15.778L15.7771 14.3638L9.41309 7.99985L15.7771 1.63589L14.3628 0.22168L7.99888 6.58564L1.63492 0.22168Z" fill="#333333"></path></svg>)
        },
        {
            label: "decrease",
            icon: (
                <svg width="13.33" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H16V2H0V0Z" fill="#000"></path></svg>

            )
        },
        {
            label: "increase",
            icon: (
                <svg width="13.33" height="13.33" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0H7V7H0V9H7V16H9V9H16V7H9V0Z" fill="#000"></path></svg>

            )
        },
        {
            label: "delivery",
            icon: (
                <svg width="16.33" height="19.27" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.99883 5.67969C8.90328 5.67969 7.84163 6.08948 7.05007 6.83581C6.25652 7.58403 5.79883 8.61182 5.79883 9.69686C5.79883 10.5049 6.05328 11.2896 6.52223 11.9513C6.9906 12.6122 7.64996 13.1188 8.41045 13.4158C9.1706 13.7127 10.004 13.7896 10.8075 13.6389C11.6111 13.4882 12.3568 13.1149 12.9476 12.5579C13.539 12.0003 13.949 11.2826 14.1158 10.4919C14.2827 9.70069 14.1964 8.88128 13.8708 8.14003C13.5455 7.3996 12.999 6.77635 12.3097 6.34208C11.6209 5.90815 10.8169 5.67969 9.99883 5.67969ZM8.4221 8.29098C8.83078 7.90566 9.39699 7.67969 9.99883 7.67969C10.4466 7.67969 10.8799 7.80514 11.2436 8.03426C11.6068 8.26306 11.8806 8.58224 12.0397 8.94445C12.1985 9.30583 12.2389 9.69972 12.1589 10.0791C12.0787 10.4589 11.8792 10.8164 11.5756 11.1027C11.2713 11.3897 10.8766 11.5911 10.4388 11.6732C10.0008 11.7553 9.54733 11.7127 9.13803 11.5529C8.72908 11.3932 8.38889 11.1263 8.15402 10.7949C7.91973 10.4643 7.79883 10.0823 7.79883 9.69686C7.79883 9.18149 8.01542 8.67443 8.4221 8.29098Z" fill="var(--fontblack)"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.0003 0.400391L9.99815 0.400393C7.41856 0.403152 4.93449 1.37003 3.09359 3.10576C1.25069 4.84336 0.202208 7.21222 0.199219 9.69641V9.69762C0.199219 13.6169 2.39643 16.9662 4.50054 19.2902C6.62273 21.6341 8.78516 23.0841 8.9905 23.2192C9.29145 23.4176 9.64348 23.5204 9.99922 23.5204C10.355 23.5204 10.707 23.4176 11.0079 23.2192C11.2133 23.0841 13.3757 21.6341 15.4979 19.2902C17.602 16.9662 19.7992 13.6169 19.7992 9.69762V9.69641C19.7962 7.21222 18.7477 4.84336 16.9049 3.10576C15.0639 1.37003 12.5799 0.403152 10.0003 0.400391ZM4.46562 4.56094C5.92396 3.18592 7.91302 2.40289 9.99922 2.40039C12.0854 2.40289 14.0745 3.18592 15.5328 4.56094C16.9894 5.93432 17.7969 7.78342 17.7992 9.69882C17.7988 12.8788 15.9962 15.76 14.0153 17.9478C12.2428 19.9055 10.4337 21.1906 9.99922 21.4875C9.56474 21.1906 7.7556 19.9055 5.98314 17.9478C4.00213 15.7599 2.19945 12.8785 2.19922 9.69823C2.20169 7.78304 3.00917 5.93418 4.46562 4.56094Z" fill="var(--fontblack)"></path></svg>
            )
        },
    ];



    /* cartlist의 packaging 글자에 따라 packaging 컴포넌트 매칭 */
    const changePackaging = [...new Set(cartList.map(item => item.delivery))];


    /*  */
    const handleOrder = () => {
        if (checkProduct.size === 0) {
            alert('주문할 상품을 체크해주세요')
            return
        } else {
            navigate("../order")
        }
    }

    return (
        <div className='c-layout g-full'>
            <p className='c-title'>장바구니</p>
            <div className='c-content'>
                <div className='cart-left-side '>
                    <SelectAll
                        CheckBox={CheckBox}
                        checked={allChecked}
                        onChange={handleAllCheck}
                        deleteCheckedItems={deleteCheckedItems}
                        setCheckProduct={setCheckProduct}
                        checkProduct={checkProduct}
                    />

                    {/* 장바구니 상품 리스트, OrderSummary 시작 */}
                    <div className='cart-product w-full'>
                        <div className='cart-product-top'>
                            <CheckBox checked={allChecked} onChange={handleAllCheck} />
                            <p className='f18 w600'>샛별배송</p>
                        </div>
                        <ul className='cart-product-list'> {/* 상품리스트 반복 */}
                            {
                                changePackaging && changePackaging.map((item, index) =>
                                    <div className='cart-product-pacakaging' key={`${item}-${index}`} >
                                        <Packaging packaging={item} />
                                    </div>

                                )
                            }
                            {cartList && cartList.map((item) =>
                                <li className='cart-product-item' key={item.no}>
                                    <ProductItem
                                        name={item.subject}
                                        price={item.price}
                                        dc={item.dc}
                                        img={item.upload_img}
                                        packaging={item.delivery}
                                        icons={icons}
                                        Packaging2={Packaging2}
                                        CheckBox={CheckBox}
                                        no={item.no}
                                        handleCheck={handleCheck}

                                    />
                                </li>
                            )}
                        </ul>
                        <div className='g-full price-summury1 ' > {/* 결제정보1 */}
                            <p className='f14' style={{ color: "#848f9a" }}>상품 {`${totalPriceCal.toLocaleString()}원`} + 배송비 무료</p>
                            <p className='f18 total-price-summury w600'>{`${totalPriceCal.toLocaleString()}원`}</p>
                        </div>
                    </div> {/* 장바구니 상품 리스트, OrderSummary 끝  */}
                </div>




                <div className='cart-right-side'> {/* cart-content 기준 사이드바 */}
                    {/* 배송지 정보 */}
                    <div className='delivery-address w-full'>
                        <div className='delivery-title flex'>
                            {icons.find(icon => icon.label === "delivery")?.icon || "실패"}
                            <p className='f18'>배송지</p>
                        </div>
                        <p className='delivery-type f13 w600' style={{ color: "var(--kurlypurple)" }}>샛별배송</p>
                        <div className='delivery-bottom flex space-between '>
                            <p className='f14'>{cartAddress.address || cartAddress.detailaddress
                                ? `${cartAddress.address} ${cartAddress.detailaddress}`
                                : "주소 정보 없음"} </p>
                            <button className='w-btn' type='button' onClick={handleTogle}>변경</button>
                            <Modal open={isOpen} onCancel={handleTogle} footer={null} key={isOpen}>
                                <Postcode onComplete={handleComplete} />
                            </Modal>
                        </div>
                    </div>


                    {/* 오른쪽 결제정보 */}
                    <div className='payment w-full'>
                        <p className='f18'>결제금액</p>
                        <div className='flex space-between margin1200 '>
                            <p>상품금액</p>
                            <p className='w600'>{`${totalPriceAll.toLocaleString()}원`}</p>
                        </div>
                        <div className='flex space-between margin1200 '>
                            <p>상품할인금액</p>
                            <p className='w600' style={{ color: "#fa622f" }}>{`${totalPriceDc.toLocaleString()}원`}</p>
                        </div>
                        <div className='flex space-between margin1200 '>
                            <p>배송비</p>
                            <p className='w600'>0원</p>
                        </div>
                        <div className='total-price-summury flex space-between align-center'>
                            <p>결제예정금액</p>
                            <p className='f24 w600 margin1200'>
                                {`${totalPriceCal.toLocaleString()}원`}
                            </p>
                        </div>
                        <p className='f12'>쿠폰/적립금은 주문서에서 사용 가능합니다.</p>
                    </div>

                    {/* 주문하기 버튼 */}
                    <button className='order-btn1' onClick={handleOrder}>
                        {`${totalPriceCal.toLocaleString()}원`} 주문하기
                    </button>
                </div>

            </div>
        </div>
    );
}

