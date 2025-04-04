import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext.js";


export function useCalculate() {
    const { cartList, checkProduct } = useContext(CartContext);
    const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];
/********************************************
        장바구니 결제금액 계산
        사용처 : Carts, useOrder
********************************************/

    // 총 상품 금액 (할인전)
        const totalPriceAll = useMemo(() => {
        return cartList
            .filter(item => checkedItems.includes(item.no))
            .reduce((acc, item) => {
                return acc + (item.price * item.qty);
        }, 0);
    }, [cartList, checkedItems]);

    // 총 할인 금액 ( 총상품금액 * dc 할인율)
        const totalPriceDc = useMemo(()=>{
            return cartList
            .filter(item => checkedItems.includes(item.no))
            .reduce((acc, item) => {
                return acc + (item.price * item.qty * (item.dc / 100));
            },0);
        }, [cartList, checkedItems])

    
    // 총 상품금액 - 총 할인율 = 총 결제 금액
    const totalPriceCal = useMemo (()=>{
        return totalPriceAll - totalPriceDc;
    }, [totalPriceAll, totalPriceDc])

    return {totalPriceAll, totalPriceDc, totalPriceCal }

}; 


