import React,{useState, useEffect} from 'react';
import ProductThumb from '../component/detail/ProductThumb.jsx';
import '../scss/detail.scss';
import axios from 'axios';

export default function ProductList() {
    const [productList, setProductList ]= useState([]);

    useEffect(() =>{
        axios.post('http://54.180.92.85:9000/main/category', {category:'new'})
                .then(res => setProductList(res.data))
                .catch(err => console.log(err));
    },[]);
    
    return (
        <div className='product_list'>
            <div className="inner">
                {
                    productList.map((item) =>
                        <ProductThumb product={item} />
                    )
                }
            </div>     
        </div>
    );
}

