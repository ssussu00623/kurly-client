import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const [orderList, setOrderList] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [member, setMember] = useState({});
    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        address: "",
        emailname: "",
        emaildomain: ""
    });



    return (
        <OrderContext.Provider value={{ orderList, setOrderList, orderPrice, setOrderPrice, member, setMember, userInfo, setUserInfo }}>
            {children}
        </OrderContext.Provider>
    );

}