import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/member.scss'
import Signup from './Signup.jsx';
import axios from 'axios';
import { validateLogin } from '../utils/funcValidate.js';
import { AuthContext } from '../auth/AuthContext.js';

export default function Login() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin, setUserType } = useContext(AuthContext);
    const [formData, setFormData] = useState({ 'id': '', 'pwd': '', })
    const refs = {
        idRef: useRef(null),
        pwdRef: useRef(null)
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value }); 
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateLogin(refs)) { 
            //서버전송
            try {
                const res = await axios.post('http://54.180.92.85:9000/member/login', formData);

                if (res.data.result_rows === 1) {
                    const user_type = await axios.post('http://54.180.92.85:9000/member/type', { 'id': formData.id });
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user_id", formData.id);
                    localStorage.setItem("user_type", user_type.data);
                    setIsLogin(true);
                    setUserType(user_type.data.type);
                    navigate('/')
                } else {
                    alert("아이디와 비밀번호를 확인해주세요.")
                }
            } catch (error) {
                console.log('로그인에러', error);
                alert("로그인 실패. 서버 오류")
            } 

        }
    }
    return (
        <div className='content'>
            <div className='member_form_box'>
                <div className='login_box'>
                    <div className='member_title_box'>
                        <span>
                            로그인
                        </span>
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                        <ul>
                            <li>
                                <div>
                                    <input
                                        className='loginform_input'
                                        type="text"
                                        name='id'
                                        placeholder='아이디를 입력해주세요'
                                        onChange={handleChangeForm}
                                        ref={refs.idRef}
                                    />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <input
                                        className='loginform_input'
                                        type="password"
                                        name='pwd'
                                        placeholder='비밀번호를 입력해주세요'
                                        onChange={handleChangeForm}
                                        ref={refs.pwdRef}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className='login_founder'>
                                    <span onClick={()=>{navigate('/member/findid')}}>아이디·비밀번호 찾기</span>
                                    <span>&gt;</span> 
                                </div>
                            </li>
                            <li>
                                <button className='member_true_button'>로그인</button>
                            </li>
                            <li>
                                <button className='member_none_button'> 
                                    <Link to={'/member/signup'}>
                                        회원가입
                                    </Link>
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
                {/* form-box end */}
            </div>
            {/* Loginbox end */}
        </div> // content end 
    );
} 