import React, { useState, useEffect, useContext } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { CartContext } from "../../context/CartContext.js";
import '../../scss/cart.scss';

export default function Postcode() {
    const { cartAddress, setCartAddress } = useContext(CartContext);
    const [userId, setUserId] = useState(null);
    const [tempAddress, setTempAddress] = useState({ 
        zipcode: '', 
        address: '', 
        detailaddress: ''  // ✅ 초기값을 빈칸으로 설정
    });

    useEffect(() => {
        const id = localStorage.getItem("user_id");
        if (id) {
            setUserId(id);
        }
    }, []);

    const handleComplete = (addressData) => {
        let fullAddress = addressData.address;
        let extraAddress = '';

        if (addressData.addressType === 'R') {
            if (addressData.bname !== '') {
                extraAddress += addressData.bname;
            }
            if (addressData.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${addressData.buildingName}` : addressData.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // ✅ detailaddress를 초기화하여 항상 빈칸으로 유지
        setTempAddress({
            zipcode: addressData.zonecode,
            address: fullAddress,
            detailaddress: ''
        });
    };

    // ✅ 상세 주소 입력 시 tempAddress 업데이트
    const handleDetailAddressChange = (e) => {
        setTempAddress((prev) => ({
            ...prev,
            detailaddress: e.target.value
        }));
    };

    const handleUpdateAddress = async () => {
        if (!tempAddress.address) {
            alert("변경할 주소를 먼저 검색해주세요.");
            return;
        }

        const updatedData = { ...tempAddress, id: userId };
        setCartAddress(updatedData);
        localStorage.setItem("cartAddress", JSON.stringify(updatedData));

        try {
            const response = await axios.post("http://54.180.92.85:9000/member/addressUpdate", updatedData);
            if (response.data.result_rows) {
                alert("배송지가 성공적으로 변경되었습니다.");
            } else {
                alert("배송지 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("배송지 업데이트 오류:", error);
        }
    };

    return (
        <div className='c-layout' style={{ padding: "5px" }}>
            <p className='f18 w600'>배송지 관리</p>
            <div>
                <span className='delivery-default' style={{ margin: "15px 0 0px 0" }} >기본배송지</span>
                {cartAddress.address} {cartAddress.detailaddress}
            </div>
            <div className='align-center' style={{ height: "1px", width: "100%", backgroundColor: "#dfe4eb", margin: "20px 0 20px 0" }}></div>

            <p className='f18 w600'>배송지 변경</p>
            <div className='address-ud'>
                <p className='road-address-ud'>{tempAddress.address || "주소를 검색해주세요"}</p>
                <div className='address-ud-bt'>
                    <input 
                        className='detail-address-ud' 
                        type="text" 
                        placeholder='나머지 주소를 입력해주세요' 
                        value={tempAddress.detailaddress}  // ✅ 초기값이 빈칸이므로 검색 후에도 빈칸 유지됨
                        onChange={handleDetailAddressChange}
                    />
                    <button className='w-btn3' onClick={handleUpdateAddress}>배송지 수정</button>
                </div>
                <div className='align-center' style={{ height: "1px", width: "100%", backgroundColor: "#dfe4eb", margin: "20px 0 20px 0" }}></div>
            </div>
            <p className='f18 w600'>주소 검색</p>
            <DaumPostcode onComplete={handleComplete} autoClose={false} />
        </div>
    );
}
