import axios from 'axios';
/***********************************
    Signup : 회원가입 폼
************************************/
/*validate 함수 */
export const validateSignup = (refs) => {
    // Make sure refs is not null
    if (!refs) {
        console.error("데이터를 찾을 수 없음");
        return false;
    }

    const refEntries = Object.entries(refs);

    for (let i = 0; i < refEntries.length; i++) {
        const item = refEntries[i];
        const name = item[0];
        const ref = item[1];

        // Check if the ref is assigned and valid before accessing its value
        if (ref.current) {
            if (name !== 'emaildomain') {
                if (ref.current.value === '') {
                    ref.current.focus();
                    return false;
                }
            } else {
                if (ref.current.value === 'default') {
                    alert('이메일 주소를 선택해주세요.')
                    ref.current.focus();
                    return false;
                }
            }
        } else {
            console.error(` ${name} 값을 찾을 수 없음.`);
            return false;
        }
    }

    return true;
};


/***********************************
    Signup : 아이디 중복체크
************************************/
export const handleDuplicateIdCheck = (idRef, pwdRef, setIdCheckResult) => {
    if (idRef.current.value === '') {
        idRef.current.focus();
        return false;
    } else {
        axios
            .post('http://localhost:9000/member/idcheck', { "id": idRef.current.value })
            .then(res => {
                if (res.data.result === 1) {
                    alert('이미 사용중인 아이디 입니다. 새로운 아이디를 입력해주세요.')
                    idRef.current.focus();
                    return false;
                } else {
                    alert('사용 가능한 아이디 입니다.')
                    setIdCheckResult("complete");
                    pwdRef.current.focus();
                    return false;
                }
            })
            .catch(error => console.log(error));
    }
};
/***********************************
    Login : 로그인 체크
************************************/
export const validateLogin = ({ idRef, pwdRef }) => {
    let result = true;

    if (idRef.current.value === '') {
        alert("아이디를 입력해주세요")
        idRef.current.focus(); 
        result = false;
    } else if (pwdRef.current.value === '') {
        pwdRef.current.focus(); 
        alert("비밀번호를 입력해주세요")
        result = false;
    }
    return result;
} 
/***********************************
    mypage : 마이페이지 정보 업데이트
************************************/
export const validateMember = ({ pwdRef, phoneRef, zipcodeRef, detailaddresRef, emailnameRef, emaildomainRef}) => {
    let result = true;

    if (pwdRef.current.value === '') {
        alert("비밀번호를 입력해주세요")
        pwdRef.current.focus(); 
        result = false;
    } else if (phoneRef.current.value === '') {
        phoneRef.current.focus(); 
        alert("휴대폰 번호를 입력해주세요")
        result = false;
    } else if (zipcodeRef.current.value === '') {
        zipcodeRef.current.focus(); 
        alert("주소를 입력해주세요")
        result = false;
    } else if (detailaddresRef.current.value === '') {
        detailaddresRef.current.focus(); 
        alert("상세 주소를 입력해주세요")
        result = false;
    } else if (emailnameRef.current.value === '') {
        emailnameRef.current.focus(); 
        alert("이메일 주소를 입력해주세요")
        result = false;
    } else if (emaildomainRef.current.value === 'default') {
        emaildomainRef.current.focus(); 
        alert("이메일 도메인을 선택해주세요")
        result = false;
    }
    return result;
} 