import React from 'react';

export default function kurlyFirst({ isChecked, handleRadioChange }) {
    return (
      <>
        <div className='order-page-title'>
          <p className='f20 w500'>첫 결제 혜택</p>
        </div>
        <div className='order-card-content flex'>
          <span className='order-mt'>즉시할인</span>
          <div className='flex110'>
            <div className='order-card-row'>
              <div>
                <p>첫 결제 1만원 할인</p>
                <div>
                  <label className='coupon-radio'>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleRadioChange}
                      className='radio-input'
                    />
                    <div className='radio-btn'>
                      <svg
                        className={`icon unchecked ${isChecked ? 'hidden' : ''}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12Z"
                          stroke="#ddd"
                          fill="#fff"
                        ></path>
                        <path
                          d="M7 12.6667L10.3846 16L18 8.5"
                          stroke="#ddd"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <svg
                        className={`icon checked ${isChecked ? '' : 'hidden'}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                          fill="#5f0080"
                        ></path>
                        <path
                          d="M7 12.6667L10.3846 16L18 8.5"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </label>
                  <span style={{ color: 'rgb(153, 153, 153)' }}>-10,000원 즉시할인 적용</span>
                </div>
              </div>
              <button className='order-btn2' onClick={() => alert('준비중 입니다.')}>카드발급</button>
            </div>
          </div>
        </div>
      </>
    );
  }