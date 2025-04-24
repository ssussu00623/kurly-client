import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../component/auth/AuthContext.js";
import { LuCopy } from "react-icons/lu";
import axios from 'axios';

export default function MypageOrder() {

    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const textRef = useRef();

    const [orderList, setOrderList] = useState([]);
    const [totalPriceByTid, setTotalPriceByTid] = useState({});

    useEffect(() => {
        if (isLogin) {
            const id = localStorage.getItem("user_id");

            axios
                .post('http://localhost:9000/member/order', { id })
                .then((res) => {
                    const orders = res.data;
                    if (Array.isArray(orders)) {
                        orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

                        setOrderList(orders);

                        const priceByTid = orders.reduce((acc, order) => {
                            if (acc[order.tid]) {
                                acc[order.tid] += order.total_price;
                            } else {
                                acc[order.tid] = order.total_price;
                            }
                            return acc;
                        }, {});

                        setTotalPriceByTid(priceByTid);
                    } else {
                        console.error("서버 응답이 배열이 아닙니다:", orders);
                    }
                })
                .catch((error) => {
                    console.error("데이터 요청 실패:", error);
                });
        }
    }, [isLogin]);

    if (!isLogin) {
        navigate("/member/error");
    }

    const handleCopy = () => {
        const text = textRef.current.innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('주문번호가 복사되었습니다!');
            })
            .catch((err) => {
                console.error('복사 실패: ', err);
            });
    };

    // 주문번호(tid)별로 상품 그룹화하기
    const groupedOrders = orderList.reduce((acc, order) => {
        if (!acc[order.tid]) {
            acc[order.tid] = [];
        }
        acc[order.tid].push(order);
        return acc;
    }, {});

    return (
        <div className='member_order_box'>
            <div className='member_my_right_title'>주문내역</div>
            {Object.keys(groupedOrders).length > 0 ? (
                Object.keys(groupedOrders).map((tid) => {
                    const ordersForTid = groupedOrders[tid];
                    return (
                        <div key={tid} className='member_order'>
                            <div className='member_order_num'>
                                <p>{ordersForTid[0].odate}</p>
                                <label>주문번호:: </label>
                                <span ref={textRef}>{tid}</span>
                                <button onClick={handleCopy} style={{ marginLeft: "10px" }}><LuCopy /></button>
                            </div>
                            <div className='member_order_border'></div>
                            <div>
                                <ul>
                                    {ordersForTid.map((order) => (
                                        <li key={order.pid} className='member_order_list' onClick={() => navigate(`/goods/detail/${order.pid}`)}>
                                            <div className='member_order_detail'>
                                                <img style={{ width: "70px", height: "auto", borderRadius: "10px" }} src={order.upload_img} />
                                                <div className='member_order_sub'>
                                                    <span>샛별배송</span>
                                                    <p className='member_order_pname'>{order.subject}</p>
                                                    <div className='member_order_price'>
                                                        <p>{order.tid_total_price}원</p>
                                                        <span style={{ margin: "0 5px" }}>|</span>
                                                        <span>{order.qty}개</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 각 주문 번호별 총 가격 표시 */}
                            <div className='order-summury-content' style={{ width: "auto", borderRadius: "8px" }}>
                                <div className='flex space-between pmfont1'>
                                    <div><span>총금액</span></div>
                                    <div className='order_total_price'>
                                        <span>{totalPriceByTid[tid] ? totalPriceByTid[tid].toLocaleString() : 0}원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className='member_order_box_false'>
                    <div>
                        <span style={{ color: '#999999' }}> 주문내역이 없습니다. </span>
                    </div>
                </div>
            )}
        </div>
    );
}
