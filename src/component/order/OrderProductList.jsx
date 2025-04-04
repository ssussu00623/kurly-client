import React from 'react';

export default function OrderProductList({ isToggled, toggleList, orderList }) {
  return (
    <div className={isToggled ? 'order-list' : 'hide-list'} onClick={toggleList}>
      {isToggled ? (
        <div className='order-list-wrap'>
          <p className='f16 w600' style={{ padding: "16px 0px 0px 16px" }}>샛별배송</p>
          <div className='order-list-bar'></div>
          <ul>
            {orderList.map(item => (
              <li key={item.no}>
                <div className='space-between'>
                  <div className='order-item flex'>
                    <img style={{ width: "56px", borderRadius: "10px" }} src={`http://54.180.92.85:9000/${item.upload_img}`} alt="" />
                    <div className='order-item-text'>
                      <p>{item.subject}</p>
                      <p style={{ fontSize: "13px", color: "#bcc4cc" }}>{item.sub_desc}</p>
                      <div className='flex'>
                        <p className="product-price f16 w600">{`${((item.price * (1 - item.dc / 100)) * item.qty).toLocaleString()}원`}</p>{'\u00a0'}{'\u00a0'}
                        <p className='discount' style={{ fontSize: "13px", textDecoration: "line-through", color: "#bcc4cc" }}>{`${(item.price * item.qty).toLocaleString()}원`}</p>
                      </div>
                    </div>
                  </div>
                  <div className='f16' style={{ marginRight: "20px" }}>{item.qty}개</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className='f16'>
          {orderList.length <= 1
            ? `${orderList[0]?.subject} 상품을 주문합니다`
            : `${orderList[0]?.subject} 외 ${orderList.length - 1}개 상품을 주문합니다`}
        </p>
      )}
    </div>
  );
}
