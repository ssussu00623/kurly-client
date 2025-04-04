import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext.js";
import { OrderContext } from "../../context/orderContext.js";
import { useOrder } from "../../hooks/useOrder.js";
import { useCart } from "../../hooks/useCart.js";
import { useCalculate } from "../../hooks/useCalculate.js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../scss/payments.css';

export default function SuccessPage() {

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [searchParams] = useSearchParams();
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");


    const { orderList, setOrderList  } = useContext(OrderContext); 
    const { getOrderList } = useOrder(); 
    const { deleteCheckedItems } = useCart(); 
    const navigate = useNavigate();

    // 결제 완료 페이지 까지 넘어오면 주문 내역(OrderList) 테이블 업데이트
    // orderList 업데이트 // 빈 배열 넘어오는 것 방지!
    useEffect(() => {
        (async () => setOrderList(await getOrderList()))();
    }, []);

    async function confirmPayment() {
        await fetch("http://54.180.92.85:9000/sandbox-dev/api/v1/payments/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "테스트 결제 승인 요청" })
        });
    
        const checkedItems = JSON.parse(localStorage.getItem("checkedItems"));
    
        // ✅ 선택된 모든 상품에 대해 하나의 주문번호 생성
        const commonTid = `TID${Date.now()}`;
    
        // ✅ db로 보낼 데이터 생성
        const sendOrders = orderList
            .filter(({ no }) => checkedItems.includes(no)) // 체크된 상품만 필터링
            .map(({ qty, pid, price, dc }) => ({
                qty,
                id: localStorage.getItem('user_id'),
                pid,
                total_price: price * qty * (1 - dc / 100), // 개별 상품 금액 계산
                tid: commonTid // ✅ 모든 상품에 동일한 `tid` 부여
            }));
    
        if (sendOrders.length) {
            await axios.post('http://54.180.92.85:9000/order/add', { orderList: sendOrders }); // 서버로 전송
            await deleteCheckedItems(checkedItems); // 체크된 상품 장바구니 삭제
            localStorage.removeItem("checkedItems"); // 로컬스토리지 checkedItems 삭제
            setIsConfirmed(true);
        }
    }

    return (
        <div className="payments-wrapper w-100 align-center">
            {isConfirmed ? (
                <div
                    className="flex-column align-center confirm-success w-100 max-w-540"
                    style={{
                        display: "flex"
                    }}
                >
                    <img
                        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                        width="120"
                        height="120"
                    />
                    <h2 className="title">결제가 완료되었습니다</h2>
                    <div className="response-section w-100 ">
                        <div className="flex justify-between">
                            <span className="response-label">결제 금액</span>
                            <span id="amount" className="response-text">
                                {amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="response-label">주문번호</span>
                            <span id="orderId" className="response-text">
                                {orderId}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="response-label">paymentKey</span>
                            <span id="paymentKey" className="response-text">
                                {paymentKey}
                            </span>
                        </div>
                    </div>

                    <div className="w-100 button-group">

                        <div className="flex" style={{ gap: "16px" }}>
                            <button
                                className="btn w-100"
                                onClick={()=>{navigate("/member/mypage/order")}}
                            >
                                주문 내역 이동
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-column align-center confirm-loading w-100 max-w-540">
                    <div className="flex-column align-center">
                        <img
                            src="https://static.toss.im/lotties/loading-spot-apng.png"
                            width="120"
                            height="120"
                        />
                        <h2 className="title text-center">결제 요청까지 성공했어요.</h2>
                        <h4 className="text-center description">결제 승인하고 주문을 완료해보세요.</h4>
                    </div>
                    <div className="w-100 flex">
                        <button className="btn primary2 w-100" onClick={confirmPayment}>
                            결제 승인하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}