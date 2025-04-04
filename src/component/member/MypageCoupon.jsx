import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";

export default function MypageCoupon() {
    return (
        <>
            <div>
                <div className='member_my_right_title'>쿠폰 </div>
                <div className='member_coupon_box'>
                    <div>
                        <span style={{ color: '#999999' }}>
                            현재 사용 가능한 쿠폰이 없습니다.

                        </span>

                    </div>
                </div>
            </div>
            <div className='member_my_right_2'>
            </div>
        </>
    );
}

