import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

export default function Postcode({ addAddress }) {
    const [data, setData] = useState({ zipcode: '', address: '', detailaddress: '' });
    const [isOpen, setIsOpen] = useState(false); // 검색창 열기/닫기 상태
    const [userId, setUserId] = useState(null); // 사용자 ID 저장

    useEffect(() => {
        // 로컬 스토리지에서 사용자 ID 가져오기
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

        setData(prevData => ({
            ...prevData,
            zipcode: addressData.zonecode,
            address: fullAddress,
        }));

        setIsOpen(false); // 주소 검색창 닫기
    };

    const handleInputChange = (e) => {
        setData(prevData => ({
            ...prevData,
            detailaddress: e.target.value, // 상세 주소 업데이트
        }));
    };

    const handleUpdateAddress = async () => {
        if (!data.zipcode || !data.address || !data.detailaddress) {
            alert("모든 주소 정보를 입력해주세요.");
            return;
        }

        const updatedData = {
            ...data,
            id: userId, // 사용자 ID 추가
        };

        try {
            const response = await axios.post("http://localhost:9000/member/addressUpdate", updatedData);
            if (response.data.result_rows) {
                alert("배송지가 성공적으로 변경되었습니다.");
                addAddress(updatedData); // 부모 컴포넌트에도 주소 업데이트
            } else {
                alert("배송지 변경에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("배송지 업데이트 오류:", error);
            alert("배송지 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <div>
                <label>우편번호</label>
                <input
                    type="text"
                    value={data.zipcode}
                    placeholder="우편번호"
                    readOnly
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <div>
                <label>주소</label>
                <input
                    type="text"
                    value={data.address}
                    placeholder="기본 주소"
                    readOnly
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <div>
                <label>상세주소</label>
                <input
                    type="text"
                    value={data.detailaddress}
                    placeholder="상세 주소 입력"
                    onChange={handleInputChange}
                />
            </div>

            <button type="button" onClick={handleUpdateAddress}>
                배송지 저장
            </button>

            {isOpen && (
                <DaumPostcode onComplete={handleComplete} autoClose={false} />
            )}
        </div>
    );
}
