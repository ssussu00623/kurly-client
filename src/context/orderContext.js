import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const [orderlist, setorderlist] = useState([]);
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
        <OrderContext.Provider value={{ orderlist, setorderlist, orderPrice, setOrderPrice, member, setMember, userInfo, setUserInfo }}>
            {children}
        </OrderContext.Provider>
    );

}