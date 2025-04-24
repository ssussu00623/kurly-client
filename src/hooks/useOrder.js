import React from 'react';
import { OrderContext } from '../context/orderContext.js';
import { useContext } from 'react';
import axios from 'axios';


export function useOrder() {

    const { setOrderList, setUserInfo } = useContext(OrderContext);

        /********************************************
                전체 주문정보 가져오기 (장바구니에서 체크된 상품)
                사용처 : Order
        ********************************************/
    const getOrderList = async() => {
        const id = localStorage.getItem('user_id');
        const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) 

        const result = await axios.post('http://localhost:9000/order/all', {'id': id, 'checkedItems' : checkedItems});
        setOrderList(result.data);
        // setMember(result.data[0]);
        // useCalculate(result.data); 
        return result.data;
    }

    //     /********************************************
    //             결제 완료시 주문내역 테이블 업데이트
    //             사용처 : Success
    //     ********************************************/
    
    // const saveToOrder = async (OrderList) => { 
    //         const result = await axios.post('http://localhost:9000/order/add', { orderList: OrderList });
    //         console.log("주문 저장 성공:", result.data);
    //         return result.data;
    //     } 
    

        /********************************************
                결제창 회원 정보 조회
                사용처 : Order
        ********************************************/
                const getUserInfo = async () => {
                    const id = localStorage.getItem("user_id");
                    const result = await axios.post("http://localhost:9000/member/mypage", { id });
                    setUserInfo({
                        name: result.data.name,
                        phone: result.data.phone,
                        address: result.data.address,
                        detailaddress: result.data.detailaddress,
                        emailname: result.data.emailname,
                        emaildomain: result.data.emaildomain,
                    });
                    
                };
        




    return {getOrderList, getUserInfo} ;
}

