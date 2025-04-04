import React from 'react';
import { Link } from 'react-router-dom';


export default function MemberError() {
    return (
        <div className='content'>
            <div className='member_form_box'>
                <div className='login_box'>
                    <div className='member_title_box'>

                    </div>
                    <img src="/images/memberImages/logo.png"
                        alt="Welcome to Kurly" style={{ width:"300px"}} /> 
                    <div>  
                        <button className='member_true_button' style={{width:"300px", marginBottom:"10px"}}>
                            <Link to={'/member/login'} style={{ color: "#ffff" }} >
                                로그인
                            </Link>
                        </button>
                        <button className='member_none_button' style={{width:"300px"}}>
                            <Link to={'/member/signup'}>
                                회원가입
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

