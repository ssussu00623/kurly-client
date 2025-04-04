import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import Postcode from './Postcode.jsx';
import { handleDuplicateIdCheck, validateSignup } from '../utils/funcValidate.js';
import '../../scss/member.scss'

export default function Signup() {

    //다음 api를 통한 주소값 호출
    const [addressData, setAddressData] = useState({});
    const addAddress = (data) => {
        setAddressData(data);
        setFormData({
            ...formData,
            "zipcode": data.zipcode,
            "address": data.address
        });
    };

    //네비게이트
    const navigate = useNavigate();
    // id중복체크
    const [idCheckResult, setIdCheckResult] = useState('default');

    const [formData, setFormData] = useState({
        id: '',
        pwd: '',
        cpwd: '',
        name: '',
        emailname: '',
        emaildomain: '',
        phone: '',
        gender: '',
        zipcode: '',
        address: '',
        detailaddress: '',
        birthy: '',
        birthm: '',
        birthd: ''
    });

    const refs = {
        idRef: useRef(null),
        pwdRef: useRef(null),
        cpwdRef: useRef(null),
        nameRef: useRef(null),
        genderRef: useRef(null),
        emailnameRef: useRef(null),
        emaildomainRef: useRef("default"),
        phoneRef: useRef(null),
        birthyRef: useRef(null),
        birthmRef: useRef(null),
        birthdRef: useRef(null),
        zipcodeRef: useRef(null),
        addressRef: useRef(null),
        detailaddresRef: useRef(null)
    }

    //이용약관 동의
    const totalRef = useRef(null)
    const [agreeArr, setAgreeArr] = useState([])
    const agreeRefs = {
        memberuseRef: useRef(null),
        memberpsnRef: useRef(null),
        memberpsnmktRef: useRef(null),
        membermktRef: useRef(null),
        memberageRef: useRef(null)
    }

    //생년월일 select
    const BIRTHDAY_YEAR_LIST = Array.from(
        { length: 46 },
        (_, i) => `${i + 1960}년`,
    );
    const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
    const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

    //폼 입력 정보
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    //회원가입 이벤트
    const handleSubmit = (e) => {
        e.preventDefault();
        //비밀번호 일치 확인
        const { pwd, cpwd } = formData;
        if (pwd !== cpwd) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 필수항목 동의 체크 
        const requiredCheckboxes = ['memberuse', 'memberpsn', 'memberage'];
        const uncheckedRequiredCheckboxes = requiredCheckboxes.filter((item) => !agreeArr.includes(item));
        if (uncheckedRequiredCheckboxes.length > 0) {
            alert('필수 항목에 동의해 주세요.');
            return;
        }

        //회원가입 정보 전달
        if (validateSignup(refs)) {
            if (idCheckResult === "default") {
                alert("중복 확인을 진행해 주세요");
                return false;
            } else {
                axios.post('http://54.180.92.85:9000/member/signup', formData)
                    .then(res => {
                        if (res.data.result_rows === 1) {
                            alert("회원가입에 성공하셨습니다.");

                            //1초후에 로그인 페이지 이동
                            setTimeout(() => {
                                navigate('/member/login');
                            }, 1000);
                        } else {
                            alert("회원가입에 실패하셨습니다.");
                        }
                    })
                    .catch(error => {
                        alert("회원가입에 실패하셨습니다.");
                        console.log(error);
                    });
            }
            //완료
            alert('회원가입 완료! 로그인 페이지로 이동합니다.');

        };
    }

    const handleRadioChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const isCheck = agreeArr.includes(name)
        if (isCheck) {
            setAgreeArr((prev) => prev.filter((el) => el !== name));
        }
        else {
            setAgreeArr([...agreeArr, name]);
        }
    };

    const allBtnEvent = ({ target: { checked } }) => {
        const refs = Object.values(agreeRefs).map((el) => el.current.name);
        setAgreeArr(checked ? refs : []);
    };

    return (
        <div className='content'>
            <div className='signup_body'>
                <div>
                    <div className='signup_title'>회원가입</div>
                    <div className='signup_sub_title'><span>*</span>필수입력사항</div>
                </div>
                <div className='member_signup_form'></div>
                <form className='signup_form' onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label className='signup_con_title'>아이디<span>*</span> </label>
                            <input type="text"
                                placeholder='아이디를 입력해주세요'
                                name='id'
                                ref={refs.idRef}
                                onChange={handleChangeForm}
                                className='signup_input' />
                            <button type='button' className='signup_phone_botton'
                                onClick={() => {
                                    handleDuplicateIdCheck(
                                        refs.idRef, // Corrected reference
                                        refs.pwdRef, // Corrected reference
                                        setIdCheckResult
                                    )
                                }}

                            >중복체크</button>
                        </li>
                        <li>
                            <label>비밀번호<span>*</span></label>
                            <input type="password"
                                placeholder='비밀번호를 입력해주세요'
                                name='pwd'
                                ref={refs.pwdRef}
                                onChange={handleChangeForm}
                                className='signup_input' />
                        </li>
                        <li>
                            <label>비밀번호 확인<span>*</span> </label>
                            <input type="password"
                                placeholder='비밀번호를 한번 더 입력해주세요'
                                name='cpwd'
                                ref={refs.cpwdRef}
                                onChange={handleChangeForm}
                                className='signup_input' />
                        </li>
                        <li>
                            <label>이름<span>*</span> </label>
                            <input type="text"
                                placeholder='이름을 입력해주세요'
                                name='name'
                                ref={refs.nameRef}
                                onChange={handleChangeForm}
                                className='signup_input' />
                        </li>
                        <li>
                            <label>이메일<span>*</span></label>
                            <div className='email_full'>
                                <input type="text"
                                    placeholder='예:marketkurly'
                                    name='emailname'
                                    ref={refs.emailnameRef}
                                    onChange={handleChangeForm}
                                    className='email_address' />
                                <span>@</span>
                                <select
                                    name="emaildomain"
                                    ref={refs.emaildomainRef}
                                    onChange={handleChangeForm}
                                    className='email_domain'>
                                    <option value="default">선택</option>
                                    <option value="@naver.com">naver.com</option>
                                    <option value="@gmail.com">gmail.com</option>
                                    <option value="@hanmail.net">hanmail.net</option>
                                    <option value="@kakao.com">kakao.com</option>
                                    <option value="@daum.net">daum.net</option>
                                </select>
                            </div>
                        </li>
                        <li className='phone_full'>
                            <label>휴대폰<span>*</span></label>
                            <input type="text"
                                name='phone'
                                ref={refs.phoneRef}
                                onChange={handleChangeForm}
                                placeholder='예:010-1234-1234'
                                className='signup_input' />
                        </li>
                        <li className='address_full'>
                            <label>주소<span>*</span></label>
                            <div >
                                <div className='address_zipcode'>
                                    <input type="text"
                                        ref={refs.zipcodeRef}
                                        onChange={handleChangeForm}
                                        value={addressData.zipcode}
                                        name='zipcode'
                                        className='address_zipcode_input'
                                        placeholder='  우편번호' />
                                    <div className='address_botton'>
                                        <Postcode
                                            addAddress={addAddress} />
                                    </div>
                                </div>
                                <div>
                                    <input type="text"
                                        ref={refs.addressRef}
                                        onChange={handleChangeForm}
                                        value={addressData.address}
                                        className='address_text'
                                        placeholder='  도로명 주소'
                                        name='address' />
                                    <input type="text"
                                        ref={refs.detailaddresRef}
                                        onChange={handleChangeForm}
                                        className='address_text'
                                        placeholder='  상세 주소'
                                        name='detailaddress' />
                                </div>
                                <p> 배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                            </div>
                        </li>
                        <li>
                            <label>성별</label>
                            <div className='signup_gender'
                                ref={refs.gender}>
                                <input type='radio' name='gender' value='m'
                                    ref={refs.genderRef}
                                    onChange={handleChangeForm} /> 남자
                                <input type="radio" name='gender' value='f'
                                    ref={refs.genderRef}
                                    onChange={handleChangeForm} /> 여자
                                <input type="radio" name='gender' value='n' defaultChecked="checked"
                                    ref={refs.genderRef}
                                    onChange={handleChangeForm} /> 선택 안함
                            </div>
                        </li>
                        <li className='signup_birth'>
                            <label>생년월일</label>
                            <div>
                                <div className="birthdayFrame"
                                >
                                    <select className="birthdayBox yearBox"
                                        name='birthy'
                                        ref={refs.birthyRef}
                                        onChange={handleChangeForm} >
                                        <option value="default">선택</option>
                                        {BIRTHDAY_YEAR_LIST.map((year, index) => (
                                            <option key={index}>{year}</option>
                                        ))}
                                    </select>
                                    <select className="birthdayBox monthBox"
                                        name='birthm'
                                        ref={refs.birthmRef}
                                        onChange={handleChangeForm}
                                    >
                                        <option value="default">선택</option>
                                        {BIRTHDAY_MONTH_LIST.map((month, index) => (
                                            <option key={index}>{month}</option>
                                        ))}
                                    </select>
                                    <select className="birthdayBox dayBox"
                                        name='birthd'
                                        ref={refs.birthdRef}
                                        onChange={handleChangeForm}
                                    >
                                        <option value="default">선택</option>
                                        {BIRTHDAY_DAY_LIST.map((day, index) => (
                                            <option key={index}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='member_line_top'> </div>
                        </li>
                        <div className='signup_bottom'>
                            <div className='signup_bottom_title'>
                                <label>이용약관동의</label>
                            </div>
                            <div className="signup_notic">
                                {/* 전체 동의 */}
                                <div className="control_container">
                                    <div className="label_box">
                                        <label className="member_radio">
                                            <input
                                                type="checkbox"
                                                checked={agreeArr.length === 5}
                                                ref={agreeRefs.memberuseRef}
                                                onChange={allBtnEvent}
                                                name="memberall"
                                                className="radio_input"
                                            />
                                            <div className="radio_btn">
                                                {agreeArr.length === 5 ? <FaCircleCheck style={{ fontSize: "2rem", fill: "#5f0080" }} /> : <FaRegCircleCheck style={{ fontSize: "2rem", fill: "#dddddd" }} />}
                                            </div>
                                        </label>
                                        <label className="member_radio_title">전체 동의합니다.</label>
                                        <p className='signup_notic_sub'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                    </div>
                                </div>

                                {/* 개별 항목들 */}
                                {['memberuse', 'memberpsn', 'memberpsnmkt', 'membermkt', 'memberage'].map((item, idx) => (
                                    <div className="control_container" key={idx}>
                                        <label className="member_radio">
                                            <input
                                                type="checkbox"
                                                checked={agreeArr.includes(item)}
                                                name={item}
                                                ref={agreeRefs[item + 'Ref']}
                                                onChange={handleRadioChange}
                                                className="radio_input"
                                            />
                                            <div className="radio_btn">
                                                {agreeArr.includes(item) ? <FaCircleCheck style={{ fontSize: "2rem", fill: "#5f0080" }} /> : <FaRegCircleCheck style={{ fontSize: "2rem", fill: "#dddddd" }} />}
                                            </div>
                                        </label>
                                        <label className="member_radio_title">
                                            {item === 'memberuse' && '이용약관 동의(필수)'}
                                            {item === 'memberpsn' && '개인정보 수집·이용 동의(필수)'}
                                            {item === 'memberpsnmkt' && '개인정보 수집·이용 동의(선택)'}
                                            {item === 'membermkt' && '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'}
                                            {item === 'memberage' && '본인은 만 14세 이상입니다. (필수)'}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='member_line_bottom'></div>
                        <div className='button_box'>
                            <button type="submit"
                                className='member_true_button'

                            >가입하기</button>
                        </div>
                    </ul>{/* signup_body_end */}
                </form>
            </div>
        </div>// signup_end

    );
}
