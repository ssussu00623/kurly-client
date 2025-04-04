import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import Postcode from './Postcode.jsx';
import { AuthContext } from '../auth/AuthContext.js';
import MemberError from './MemberError.jsx';
import { validateMember } from '../utils/funcValidate.js';

export default function MemberUpdate() {
    //네비게이트
    const navigate = useNavigate();

    // AuthContext에서 로그인 상태(isLogin) 가져오기
    const { isLogin } = useContext(AuthContext);

    // 수정 가능한 필드 상태 관리
    const [isEditing, setIsEditing] = useState({
        pwd: false,
        emailname: false,
        emaildomain: false,
        phone: false,
        zipcode: false,
        address: false,
        detailaddress: false,
    });

    // 원본 폼 데이터 (취소 버튼을 눌렀을 때 원래 상태로 돌아가기 위해 사용)
    const [originalFormData, setOriginalFormData] = useState({
        id: '',
        name: '',
        pwd: '',
        emailname: '',
        emaildomain: '',
        phone: '',
        zipcode: '',
        address: '',
        detailaddress: ''
    });

    // 입력된 폼 정보
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        pwd: '',
        emailname: '',
        emaildomain: '',
        phone: '',
        zipcode: '',
        address: '',
        detailaddress: ''
    });

    // refs 
    const refs = {
        idRef: useRef(null),
        pwdRef: useRef(null),
        nameRef: useRef(null),
        phoneRef: useRef(null),
        zipcodeRef: useRef(null),
        addressRef: useRef(null),
        detailaddresRef: useRef(null),
        emailnameRef: useRef(null),
        emaildomainRef: useRef("default")
    };

    // 주소 상태 관리
    const [addressData, setAddressData] = useState({});
    const addAddress = (data) => {
        setAddressData(data);
        setFormData({
            ...formData,
            "zipcode": data.zipcode,
            "address": data.address
        });
    };

    useEffect(() => {
        if (isLogin) {
            const id = localStorage.getItem("user_id");

            // 서버에서 사용자 기존 정보를 가져오기
            axios
                .post('http://54.180.92.85:9000/member/mypage', { id })
                .then((res) => {
                    const memberData = res.data;
                    // 기존 데이터로 전환
                    setOriginalFormData({
                        id: id,
                        name: memberData.name,
                        pwd: memberData.pwd,
                        emailname: memberData.emailname,
                        emaildomain: memberData.emaildomain,
                        phone: memberData.phone,
                        address: memberData.address,
                        detailaddress: memberData.detailaddress,
                        zipcode: memberData.zipcode
                    });
                    // 끌어오는 데이터 
                    setFormData({
                        id: id,
                        name: memberData.name,
                        pwd: memberData.pwd,
                        emailname: memberData.emailname,
                        emaildomain: memberData.emaildomain,
                        phone: memberData.phone,
                        address: memberData.address,
                        detailaddress: memberData.detailaddress,
                        zipcode: memberData.zipcode
                    });
                })
                .catch((error) => {
                    console.error('데이터 파싱 에러:', error);
                });
        }
    }, [isLogin]);

    //로그인 상태가 아닐 때 에러 페이지 송출
    if (!isLogin) {
        navigate("/member/error")
    }

    // 수정하기 버튼 클릭 시 상태 토글
    const handleEditClick = () => {
        setIsEditing({
            pwd: true,
            emailname: true,
            emaildomain: true,
            phone: true,
            zipcode: true,
            address: true,
            detailaddress: true
        });
    };

    // 수정된 값 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 회원 정보 수정 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateMember(refs)) {
            // 유효성 검사를 통과하면 서버로 데이터 전송
            axios
                .post('http://54.180.92.85:9000/member/update', formData)
                .then((res) => {
                    if (res.data.result_rows) {
                        alert('업데이트 완료!');
                        // 업데이트가 성공한 후, 수정 모드 비활성화
                        setIsEditing({
                            pwd: false,
                            emailname: false,
                            emaildomain: false,
                            phone: false,
                            zipcode: false,
                            address: false,
                            detailaddress: false
                        });

                        // formData를 업데이트된 값으로 설정
                        setOriginalFormData({ ...formData });

                        // formData에 최신 값을 반영하여 화면에 업데이트된 정보 표시
                        setFormData({ ...formData });
                    } else {
                        alert('업데이트 실패!');
                    }
                })
                .catch((error) => {
                    console.error('에러사유:', error);
                    alert('정보 수정 실패!');
                });
        } else {
            // 유효성 검사 실패
            return false;
        }
    };


    // 취소 버튼 클릭 시 원래의 데이터로 되돌리기
    const handleCancelClick = () => {
        setFormData(originalFormData); // 원본 데이터로 되돌리기
        setIsEditing({
            pwd: false,
            emailname: false,
            emaildomain: false,
            phone: false,
            zipcode: false,
            address: false,
            detailaddress: false
        }); // 수정 불가능한 상태로 되돌리기
    };

    // 저장 버튼 클릭시 수정하기 버튼 노출
    const handleTrueClick = () => {
        setFormData(originalFormData); // 원본 데이터로 되돌리기
        setIsEditing({
            pwd: false,
            emailname: false,
            emaildomain: false,
            phone: false,
            zipcode: false,
            address: false,
            detailaddress: false
        }); // 수정 불가능한 상태로 되돌리기
    };

    return (
        <div className='member_update_form'>
            <div className="member_my_right_title">회원정보 수정</div>
            <form className='update_form' onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>이름</label>
                        <span ref={refs.nameRef}>{formData.name}</span>
                    </li>
                    <li>
                        <label>아이디</label>
                        <span ref={refs.idRef}>{formData.id}</span>
                    </li>
                    <li>
                        <label>비밀번호</label>
                        {isEditing.pwd ? (
                            <input
                                type="password"
                                name="pwd"
                                className='update_full_input'
                                value={formData.pwd}
                                ref={refs.pwdRef}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <span>**********</span>
                                <span ref={refs.pwdRef} style={{ display: 'none' }}>{formData.pwd}</span>
                            </>
                        )}
                    </li>
                    <li>
                        <label>휴대폰</label>
                        {isEditing.phone ? (
                            <input
                                className='update_full_input'
                                type="text"
                                name="phone"
                                value={formData.phone}
                                ref={refs.phoneRef}
                                onChange={handleChange}
                            />
                        ) : (
                            <span ref={refs.phoneRef}>{formData.phone}</span>
                        )}
                    </li>
                    <li>
                        <label>이메일</label>
                        {isEditing.emailname && isEditing.emaildomain ? (
                            <div className='email_full'>
                                <input
                                    type="text"
                                    name="emailname"
                                    className='emailname'
                                    ref={refs.emailnameRef}
                                    value={formData.emailname}
                                    onChange={handleChange}
                                />
                                <span>@</span>
                                <select
                                    name="emaildomain"
                                    value={formData.emaildomain}
                                    onChange={handleChange}
                                    ref={refs.emaildomainRef}
                                    className='emaildomain'>
                                    <option value="default">선택</option>
                                    <option value="@naver.com">naver.com</option>
                                    <option value="@gmail.com">gmail.com</option>
                                    <option value="@hanmail.net">hanmail.net</option>
                                    <option value="@kakao.com">kakao.com</option>
                                    <option value="@daum.net">daum.net</option>
                                </select>
                            </div>
                        ) : (
                            <>
                                <span ref={refs.emailnameRef}>{formData.emailname}</span>
                                <span ref={refs.emaildomainRef}>{formData.emaildomain}</span>
                            </>
                        )}
                    </li>
                    <li>
                        {isEditing.address ? (
                            <>
                                <div className='address_full'>
                                    <label className='address_label'>주소</label>
                                    <div>
                                        <div className='address_top'>
                                            <div className='address_zipcode'>
                                                <input
                                                    type="text"
                                                    name="zipcode"
                                                    className='address_zipcode_input'
                                                    ref={refs.zipcodeRef}
                                                    value={addressData.zipcode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <Postcode
                                                    addAddress={addAddress} />
                                            </div>
                                        </div>
                                        <div className='address_bottom'>
                                            <input
                                                type="text"
                                                name="address"
                                                className='address_text'
                                                ref={refs.addressRef}
                                                value={addressData.address}
                                                onChange={handleChange}
                                            />
                                            <input
                                                type="text"
                                                name="detailaddress"
                                                className='address_text'
                                                ref={refs.detailaddresRef}
                                                value={formData.detailaddress}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </>
                        ) : (
                            <>
                                <label>주소</label>
                                <span ref={refs.zipcodeRef}>{formData.zipcode} </span>
                                <div className='member_address'>
                                    <div>
                                        <span ref={refs.addressRef}>{formData.address}</span>
                                    </div>
                                    <div>
                                        <span ref={refs.detailaddresRef}>{formData.detailaddress}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </li>
                </ul>
                {!(
                    isEditing.pwd || isEditing.emailname || isEditing.emaildomain || isEditing.phone || isEditing.zipcode || isEditing.address || isEditing.detailaddress
                ) && (
                        <div className='member_update_button'>
                            <button
                                type="button"
                                className="member_true_button"
                                onClick={handleEditClick}
                            >
                                수정하기
                            </button>
                        </div>
                    )}
                {(isEditing.pwd || isEditing.emailname || isEditing.emaildomain || isEditing.phone || isEditing.zipcode || isEditing.address || isEditing.detailaddress) && (
                    <div className='member_update_button2'>
                        <button type="submit" className="member_true_button" style={{ width: '100px' }}  >
                            저장
                        </button>
                        <button type="button" className="member_true_button" style={{ width: '100px' }} onClick={handleCancelClick}>
                            취소
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
