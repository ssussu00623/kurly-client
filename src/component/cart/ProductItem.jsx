import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from "../../context/CartContext.js";
import { useCart } from "../../hooks/useCart.js";

export default function ProductItem({no, name, price, dc, img, packaging, icons,Packaging2, CheckBox, handleCheck}) {


    const { cartList, setCartCount, checkProduct, setCheckProduct } = useContext(CartContext);
    const { updateCartList, deleteCartItem, updateChecked } = useCart();
    const [qty, setQty] = useState(1);

    // console.log(cartList);
    


    /* carts페이지 접속시 view_cart_list 테이블  */
    useEffect(() => {
        const cartItem = cartList.find(item => item.no === no);
        if (cartItem) {
            setQty(cartItem.qty);
        }
    }, [cartList, no]);


    /* 장바구니 수량 증가 cart 테이블의 qty 업뎃 */
    const handleQtyChange = (type) => {
        const updatedQty = type === "increase" ? qty + 1 : qty - 1;
        if (updatedQty < 1) return; 

        setQty(updatedQty);
        setCartCount(updatedQty);
        updateCartList(no, type, 1);
    }; 



    return (
        <>
              <div className="product-item">  {/* 패키징에 따른 아이템 1개 정보 */}
                        <div className='product-item-title'>
                            <CheckBox checked={checkProduct.includes(no)} onChange={()=>{handleCheck(no)}} />
                            <p>{name}</p>
                            <button onClick={()=>{deleteCartItem(no)}}>
                            {icons.find(icon => icon.label === "xmark")?.icon || "실패"} 
                            </button>
                        </div>
                        <div className='product-bottom'>
                            <Packaging2 packaging={packaging} />
                            <div className='product-item-center'>
                                <img src={`http://localhost:9000/${img}`} alt="상품 미리보기 이미지" />
                                <div className='product-item-center2'>
                                    <div>
                                        <p className="product-price f16 w600">
                                        {`${((price * (1 - dc / 100)) * qty).toLocaleString()}원`} </p>
                                        <p className='discount' style={{ fontSize: "13px", textDecoration: "line-through", color: "#bcc4cc" }}>{`${(price * qty).toLocaleString()}원`}</p>
                                    </div>
                                    <div className='quantity-selector'>
                                        <button className='decrease' onClick={()=>{handleQtyChange( "decrease")}}> 
                                        {icons.find(icon => icon.label === "decrease")?.icon || "실패"} 
                                            </button>
                                        <div className='quantitiy-count'>{qty}</div>
                                        <button className="increase" onClick={()=>{
                                            handleQtyChange("increase")}}> 
                                        {icons.find(icon => icon.label === "increase")?.icon || "실패"} 
            
                                        </button>
                                    </div>
            
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
}

