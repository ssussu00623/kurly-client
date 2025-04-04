import React, { useState, useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function Postcode({ addAddress }) {
    const [data, setData] = useState({ zipcode: '', address: '' });
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const refs = {
        zipcodeRef: useRef(null),
        addressRef: useRef(null)
    };

    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        console.log(data.zonecode, data.address);

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        addAddress({ zipcode: data.zonecode, address: fullAddress });

    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button type='button' onClick={handleClick} className='address_botton'>
            주소검색
        </button>
    );
}

