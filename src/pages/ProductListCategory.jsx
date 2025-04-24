import '../scss/detail.scss';
import axios from 'axios';
import React,{useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { SearchContext } from '../context/searchContext.js';
import ProductThumb from '../component/detail/ProductThumb.jsx';

export default function ProductListCategory() {
    const { categoryName } = useParams();
    const [ productList, setProductList ]= useState([]);
    const { search } = useContext(SearchContext);
    const categoryMap = {new:'신상품', best:'베스트', discount: '알뜰쇼핑', special: '특가/혜택'};

    useEffect(() =>{
      axios.post('http://localhost:9000/main/category' , {category: categoryName, searchKeyword:search })
           .then(res =>  setProductList(res.data))
           .catch(error => console.log(error));
    },[categoryName, search]);
    
    return (
        <div className='product_list'>
            <p className='category_pro_list'>
              {categoryName==='search' && search !== '' ? (
                <>
                    <span className="search_keyword">"{search}"</span>에 대한 검색결과
                </>
                ) : categoryMap[categoryName] }
            </p> 
            { (productList.length > 0)  ? (
                <div className="inner">
                    {productList.map((item, i) =>
                            <ProductThumb product={item} key={i}/>
                     ) }
                </div>     
               ) : (
               <div className="inner"></div>
            )}  
        </div>
    );
}

