import axios from 'axios';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { BsCart2 } from "react-icons/bs";
import { CartContext } from '../../context/CartContext.js';
import { useCart } from '../../hooks/useCart.js';
import { useNavigate } from 'react-router-dom';



export default function MypageHeart() {
  const [pidArray, setPidArray] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const { cartList, wishListCnt, setWishListCnt, setWishList, wishList } = useContext(CartContext);
  const { saveToCartList, updateCartList } = useCart();
  const id = localStorage.getItem('user_id');

  useEffect(()=>{
      axios.post('http://54.180.92.85:9000/main/wishListInfo', {id})
           .then((res)=>{
              setPidArray(res.data)
              setWishListCnt(res.data.length)            
            })    
           .catch((error)=>console.log(error))    
  },[pidArray]);

    const handleDelete =useCallback((pid) => {
      setWishList((prevWishList)=>{
        const updateWishList =  prevWishList.filter((item)=> item !== pid);
        console.log('updateWishList',updateWishList);
        axios.post("http://54.180.92.85:9000/main/wishListUpdate", {id, 'wishList':updateWishList})
             .then((res)=>{
               if(res.data === 1 ){
                 setWishList(updateWishList);
               }
             })
             .catch((error)=>console.log(error))
      })
  }, [id]);

  const cartAddItem = (pid) => {
    const cartItem = {
      pid: pid,
      qty: count
    };
    const findItem = cartList.find((item) => item.pid === pid);
    if (findItem) {
      const result = updateCartList(findItem.no, "increase", count);
      result && alert('장바구니에 추가되었습니다.');
      handleDelete(pid);
    } else {
      const id = localStorage.getItem('user_id');
      const formData = { id: id, cartList: [cartItem] };
      const result = saveToCartList(formData);
      result && alert('장바구니에 추가되었습니다.');
      handleDelete(pid);
    }
  };

  return (
    <>
      <div>
        <div className='member_my_right_title'>
          찜한 상품 <span>찜한 상품은 최대 10개까지 저장됩니다.</span>
        </div>
      </div>
      <div className='wish_list'>
        <div className='wish_list_cnt'>
          전체 <strong>{wishListCnt}</strong>개
        </div>
        {pidArray && pidArray.map((item, i) => (
          <div className='wish_list_porduct1' key={i}>
            <div className='wish_image'>
              <img src={item.image_url} alt="product img" onClick={() => navigate(`/goods/detail/${item.pid}`)} />
            </div>
            <div className='wish_list_porduct2'>
              <div className='wish_list_porduct_info'>
                <div className='wish_list_porduct_info1'>
                  <div onClick={() => navigate(`/goods/detail/${item.pid}`)}>{item.name}</div>
                  <div className='wish_list_porduct_info2'>
                    <span>{item.dc}%</span>
                    <span>{item.discountedPrice}</span>
                    <span>{item.originalPrice}원</span>
                  </div>
                </div>
                <div className='wish_btn'>
                  <button type="button" className='wish_delete' onClick={() => handleDelete(item.pid)}>삭제</button>
                  <button type="button" className='wish_cart' onClick={() => cartAddItem(item.pid)}><BsCart2 className='wish_icon' />담기</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishListCnt <= 0 ? (
        <div className='member_order_box_false'>
          <div>
            <span style={{ color: '#999999' }}>찜한 상품이 없습니다.</span>
          </div>
        </div>
      ) : null}
    </>
  );
}  
