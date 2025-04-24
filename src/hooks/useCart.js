    import React, { useContext } from "react";
    import { CartContext } from "../context/CartContext.js";
    import axios from "axios";

    export function useCart() {
        const {  setCartList, cartCount, setCartCount, setCartAddress } = useContext(CartContext);


        /********************************************
                장바구니 전체 리스트 조회 
                사용처 : Carts
        ********************************************/
                const getCartList = async () => {
                    const id = localStorage.getItem("user_id");
                    // 로컬 스토리지에 id 저장되도록 업뎃 되면 수정 예정
                    const result = await axios.post("http://localhost:9000/cart/items", { "id": id });
                    setCartList(result.data);
                    setCartCount(result.data.length);
                };



        /********************************************
                장바구니 새로운 아이템 저장
                사용처 : Detail
        ********************************************/
        const saveToCartList = async (formData) => {
            const result = await axios.post("http://localhost:9000/cart/add", formData);
            if (result.data.result_rows) {
                setCartCount(cartCount + 1);
                getCartList();
            }
            return result.data.result_rows;

        }

        /********************************************
                장바구니 아이템 수량 저장
                사용처 : Detail, Carts
        ********************************************/
        const updateCartList = async (no, type, qty) => {
            console.log("보낼데이터->", { no, type, qty });
            const result = await axios.put('http://localhost:9000/cart/updateQty',
                { "no": no, 'type': type, 'qty': qty });
            result.data.result_rows && getCartList();
            return result.data.result_rows;
        }


        /********************************************
                장바구니 전체 카운트 조회
                사용처 : Header
        ********************************************/
        const getCount = async () => {

            const id = localStorage.getItem("user_id");
            if (id.length) {
                const result = await axios.post("http://localhost:9000/cart/count", { "id": id })
                setCartCount(result.data.count)
                return result.data.count;
            } else {
                return; 
            }
        };



        /********************************************
            장바구니 카운트 초기화
            사용처 : Header
        ********************************************/

        const setCount = (value) => { setCartCount(value); }


        /********************************************
                장바구니 아이템 삭제
                사용처 : Carts
        ********************************************/

        const deleteCartItem = async (no) => {
            const result = await axios.delete("http://localhost:9000/cart/deleteItem", { data: { "no": no } })
            // 삭제 성공 후 장바구니 리스트 재호출
            result.data.result_rows && getCartList();
        }



        /*********************************************
                장바구니 아이템 다중 선택 삭제
                사용처 : Carts
        *******************************************/

                const deleteCheckedItems = async (nos) => {
                    const result = await axios.delete("http://localhost:9000/cart/deleteCheck", {
                        data: { nos } 
                    });
                    if (result.data.result_rows > 0) {
                        await getCartList(); // 삭제 후 최신 목록 불러오기
                    }
                    return result.data.result_rows;
                }
        

    /********************************************
        회원 정보에서 주소 가져오기 (member 테이블)
    ********************************************/
    const getUserAddress = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.post("http://localhost:9000/member/mypage", { id });
            if (res.data) {
                setCartAddress({
                    zipcode: res.data.zipcode || "",
                    address: res.data.address || "주소 정보 없음",
                    detailaddress: res.data.detailaddress || ""
                });
            }
        } catch (error) {
            console.error("주소 정보 불러오기 실패:", error);
        }
    };

    return { getCartList, getUserAddress,  saveToCartList, updateCartList, getCartList, getCount, setCount, deleteCartItem, deleteCheckedItems };
    }