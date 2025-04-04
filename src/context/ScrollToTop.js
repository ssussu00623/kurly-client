import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // pathname이 바뀔 때마다 스크롤을 최상단으로 이동
    }, [pathname]);

    return null; // 화면에는 아무것도 렌더링하지 않음
};

export default ScrollToTop;
