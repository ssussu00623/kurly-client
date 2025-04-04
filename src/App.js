import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './component/auth/AuthContext.js';
import React, { useEffect, useState } from 'react';
import './scss/common.scss';
import Layout from'./pages/Layout.jsx';
import KurlyMain from'./pages/KurlyMain.jsx';
import Detail from'./pages/Detail.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductListCategory from './pages/ProductListCategory.jsx';
import ProductListCategoryDetail from './pages/ProductListCategoryDetail.jsx';
import Login from './component/member/Login.jsx';
import Signup from './component/member/Signup.jsx';
import Mypage from './component/member/Mypage.jsx';
import Find from './component/member/Find.jsx';
import ScrollToTop from './context/ScrollToTop.js'
import Carts from './pages/Carts.jsx';
import Order from './pages//Order.jsx';
import CheckoutPage from './component/payments/Checkout.jsx';
import SuccessPage from './component/payments/Success.jsx';
import FailPage from './component/payments/Fail.jsx';
import NewProduct from './pages/NewProduct.jsx';
import MainSpecialCategory from './component/main/MainSpecialCategory.jsx';
import { CartProvider } from './context/CartContext.js';
import { OrderProvider } from './context/orderContext.js';
import { SearchProvider } from './context/searchContext.js';
import Delivery from './component/member/Delivery.jsx';
import MemberError from './component/member/MemberError.jsx';

function App() {

  return (
    <div className="App">
      <OrderProvider>
      <CartProvider >
      <SearchProvider>
      <AuthProvider>
      <BrowserRouter>
      <ScrollToTop />
      {/* 스크롤을 최상단으로 유지하는 기능을 삽입하는 것이므로 <></>로 감싸주면 화면에 null을 리턴함.*/}
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<KurlyMain />} />
              <Route path="/main/special" element={<MainSpecialCategory />} />
              <Route path="/main/category/:categoryName" element={<ProductListCategory />} />
              <Route path="/main/categories/:categoryCid" element={<ProductListCategoryDetail />} />
              <Route path="/main/subcategories/:categoryCid/:categorySid" element={<ProductListCategoryDetail />} />
              <Route path="/goods/list" element={<ProductList />} />
              <Route path="/goods/detail/:pid" element={<Detail />} />
              <Route path="/member/login" element={<Login />} />
              <Route path="/member/signup" element={<Signup />} />
              <Route path="/member/delivery" element={<Delivery />} />
              <Route path="/member/error" element={<MemberError />} />
              <Route path="/member/mypage/:active" element={<Mypage />} />
              <Route path='/member/findid' element={<Find />} />
              <Route path="/cart" element={<Carts />} />
              <Route path="/order" element={<Order />} />
              <Route path="/sandbox" element={<CheckoutPage />} />
              <Route path="/sandbox/success" element={<SuccessPage />} />
              <Route path="/sandbox/fail" element={<FailPage />} />
              <Route path="/goods/new" element={<NewProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      </SearchProvider>
      </CartProvider>
      </OrderProvider>
    </div>
  );
}

export default App;

