import React from 'react';

export default function ProductInfo({detailImgs}) {
    return (
        <div className="tab_product_info" key="tab1">
            <ul>
                {
                    detailImgs&& detailImgs.map((img,i) =>
                        <li key={`image-${i}`}><img src={`http://43.201.27.254:9000/${img}`} alt="" /></li> 
                    )
                }
            </ul>
        </div>
    );
}

