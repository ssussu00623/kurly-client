import React, { useEffect } from 'react';

const KakaoTalkButton = () => {
    useEffect(() => {
        // 카카오 SDK 로드
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // 카카오 SDK 초기화
            if (window.Kakao) {
                window.Kakao.init('c666a0fafe9c0615bedc060788a6e7b2'); // 카카오 개발자 사이트에서 받은 앱 키
            }
        };
    }, []);

    const handleClick = () => {
        // 카카오톡 채널로 연결
        if (window.Kakao) {
            window.Kakao.Channel.chat({
                channelPublicId: '_bLnGn', // 채널 공개 아이디
            });
        }
    };

    return (
        <button onClick={handleClick} style={{marginLeft:"15px"}}>
            <img src="https://developers.kakao.com/tool/resource/static/img/button/channel/consult/consult_small_yellow_pc.png" alt="" />
        </button>
    );
};
export default KakaoTalkButton;
