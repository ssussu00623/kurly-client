import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import axios from 'axios';

export default function Find() {
    const navigate = useNavigate();
    const [isFindId, setIsFindId] = useState(true); // 기본값 : 아이디 찾기
    const [isFindPwd, setIsFindPwd] = useState(false); // classname 변경
    const [formIdData, setFormIdData] = useState({ 'name': '', 'phone': '' }); // 아이디 찾기 폼 데이터
    const [formPwdData, setFormPwdData] = useState({ 'id': '', 'phone': '', 'emailname': '', 'emaildomain': 'default' }); // 비밀번호 찾기 폼 데이터
    const [message, setMessage] = useState(''); // 메시지를 저장할 상태
    const [isFormVisible, setIsFormVisible] = useState(true); // 폼의 표시 여부 상태
    const refs = {
        idRef: useRef(null),
        phoneRef: useRef(null),
        nameRef: useRef(null),
        eamilnameRef: useRef(null),
        emaildomainRef: useRef("default"),
    };

    // 아이디 찾기 폼 데이터 처리
    const handleIdForm = (e) => {
        const { name, value } = e.target;
        setFormIdData({ ...formIdData, [name]: value });
    };

    // 비밀번호 찾기 폼 데이터 처리
    const handlePwdForm = (e) => {
        const { name, value } = e.target;
        setFormPwdData({ ...formPwdData, [name]: value });
    };

    // 아이디 찾기 폼 제출 처리
    const handleFindIdSubmit = (e) => {
        e.preventDefault();
        const name = formIdData.name;
        const phone = formIdData.phone;

        let result = true;

        if (!name) {
            setMessage('이름을 입력해주세요!'); // 메시지를 상태로 저장
            refs.nameRef.current.focus();
            result = false;
        } else if (!phone) {
            setMessage('전화번호 입력해주세요!'); // 메시지를 상태로 저장
            refs.phoneRef.current.focus();
            result = false;
        } else {
            // Axios 요청 - 아이디 찾기
            axios
                .post('http://localhost:9000/member/findid', { name, phone })
                .then((response) => {
                    if (response.data.success) {
                        setMessage(`${response.data.id}`); // 성공 메시지 상태로 저장
                        setIsFormVisible(false); // 폼을 숨기기
                    } else {
                        setMessage('해당 정보에 대한 아이디를 찾을 수 없습니다.'); // 실패 메시지 상태로 저장
                    }
                    
                })
                .catch((error) => {
                    console.error('아이디 찾기 오류:', error);
                    alert('서버 오류. 다시 시도해 주세요.'); // 오류 메시지 상태로 저장 
                });
        }
    };

    // 비밀번호 찾기 폼 제출 처리
    const handleFindPwdSubmit = (e) => {
        e.preventDefault();
        const { id, phone, emailname, emaildomain } = formPwdData; // formPwdData에서 값 추출
        let result = true;

        if (!id) {
            setMessage('아이디를 입력해주세요!');
            if (refs.idRef.current) {
                refs.idRef.current.focus();
            }
            result = false;
        } else if (!phone) {
            setMessage('전화번호 입력해주세요!');
            if (refs.phoneRef.current) {
                refs.phoneRef.current.focus();
            }
            result = false;
        } else if (!emailname) {
            setMessage('이메일을 입력해주세요!');
            if (refs.eamilnameRef.current) {
                refs.eamilnameRef.current.focus();
            }
            result = false;
        } else if (emaildomain === 'default') {
            setMessage('이메일 주소를 선택해주세요!');
            if (refs.emaildomainRef.current) {
                refs.emaildomainRef.current.focus();
            }
            result = false;
        }

        if (result) {
            // Axios 요청 - 비밀번호 찾기
            axios
                .post('http://localhost:9000/member/findpwd', { id, phone, emailname, emaildomain }) // emailname과 emaildomain을 합쳐서 서버에 전달
                .then((response) => {
                    if (response.data.success) {
                        setMessage(`${response.data.pwd}`); // 성공 메시지 상태로 저장 
                        setIsFormVisible(false); // 폼을 숨기기
                    } else {
                        alert('해당 정보에 대한 비밀번호를 찾을 수 없습니다.');
                    } 
                })
                .catch((error) => {
                    console.error('비밀번호 찾기 오류:', error);
                    alert('서버 오류. 다시 시도해 주세요.'); 
                });
        }
    };

    // 아이디 찾기 폼으로 전환
    const showFindIdForm = () => {
        setIsFindId(true);
        setMessage(''); // 폼 전환 시 메시지 초기화
        setIsFormVisible(true); // 폼 다시 보이기
    };

    // 비밀번호 찾기 폼으로 전환
    const showFindPasswordForm = () => {
        setIsFindId(false);
        setMessage(''); // 폼 전환 시 메시지 초기화
        setIsFormVisible(true); // 폼 다시 보이기
    };
    
    // 복사 정보
    const textRef = useRef();
    // 복사 이벤트
    const handleCopy = () => {
        const text = textRef.current.innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('정보를 복사했습니다.');
            })
            .catch((err) => {
                console.error('복사 실패: ', err);
            });
    };

    // JSX 반환 부분 (return should be inside the function)
    return (
        <div className="content">
            <div className="member_form_box">
                <div className="find_box">
                    <div className="member_title_box">
                        <div className='find_button'>
                            <div className='find_button_toggle' onClick={showFindIdForm}>
                                <label>아이디 찾기</label>
                                <div className={isFindId ? 'button_toggle_on' : 'button_toggle_off'}></div>
                            </div>
                            <div className='find_button_toggle' onClick={showFindPasswordForm}>
                                <label>비밀번호 찾기</label>
                                <div className={isFindId ? 'button_toggle_off' : 'button_toggle_on'}></div>
                            </div>
                        </div>
                        <div style={{marginTop: "20px"}}>
                        <span>{isFindId ? '아이디 찾기' : '비밀번호 찾기'}</span> 
                        </div>
                    </div>

                    {/* 메시지 출력 */}
                    {message && (
                        <>
                            <div className="message_box">
                            <FaCheck className='message_icon' />
                                <div className='message_top'> 
                                    <span>고객님의 컬리 정보를 확인하였습니다.</span>
                                </div>
                                <div className='message_bottom'>
                                    <span>확인 후 로그인 해 주세요.</span>

                                </div>
                                <div className='message_result'>
                                <p ref={textRef}>{message}</p> 
                                <button onClick={handleCopy} style={{ marginLeft: "10px", backgroundColor:"#e9e7f1" }}><LuCopy /></button>
                                </div>
                            </div>
                            <div>
                                <button className="member_none_button"
                                    onClick={() => { navigate('/member/login') }}
                                    style={{ width: "320px" }}>
                                    로그인
                                </button>
                            </div>
                        </>
                    )}

                    {/* 폼 */}
                    {isFormVisible && (
                        isFindId ? (
                            <form onSubmit={handleFindIdSubmit}>
                                <ul>
                                    <li>
                                        <input
                                            className="loginform_input"
                                            type="text"
                                            name="name"
                                            value={formIdData.name}
                                            onChange={handleIdForm}
                                            placeholder="이름을 입력하세요"
                                            ref={refs.nameRef}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            className="loginform_input"
                                            type="text"
                                            name="phone"
                                            value={formIdData.phone}
                                            onChange={handleIdForm}
                                            placeholder="전화번호를 입력하세요"
                                            ref={refs.phoneRef}
                                        />
                                    </li>
                                    <li>
                                        <button className="member_true_button" type="submit" style={{ width: "320px" }}>
                                            확인
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        ) : (
                            <form onSubmit={handleFindPwdSubmit}>
                                <ul>
                                    <div className='find_messege'>
                                        <label>
                                            개인정보 확인 후 임시비밀번호가 발급됩니다.
                                        </label>
                                    </div>
                                    <li>
                                        <input
                                            className="loginform_input"
                                            type="text"
                                            name="id"
                                            value={formPwdData.id}
                                            onChange={handlePwdForm}
                                            placeholder="아이디를 입력하세요"
                                            ref={refs.idRef}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            className="loginform_input"
                                            type="text"
                                            name="phone"
                                            value={formPwdData.phone}
                                            onChange={handlePwdForm}
                                            placeholder="전화번호를 입력하세요"
                                            ref={refs.phoneRef}
                                        />
                                    </li>
                                    <li>
                                        <div>
                                            <input
                                                className="find_email_name"
                                                type="text"
                                                name="emailname"
                                                value={formPwdData.emailname}
                                                onChange={handlePwdForm}
                                                placeholder="예:marketkurly"
                                                ref={refs.eamilnameRef}
                                            />
                                            <span>@</span>
                                            <select
                                                name="emaildomain"
                                                ref={refs.emaildomainRef}
                                                onChange={handlePwdForm}
                                                className="find_email_domain"
                                            >
                                                <option value="default">선택</option>
                                                <option value="@naver.com">naver.com</option>
                                                <option value="@gmail.com">gmail.com</option>
                                                <option value="@hanmail.net">hanmail.net</option>
                                                <option value="@kakao.com">kakao.com</option>
                                                <option value="@daum.net">daum.net</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <button className="member_true_button" type="submit" style={{ width: "320px" }}>
                                            확인
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
