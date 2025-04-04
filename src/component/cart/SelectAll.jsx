import React from 'react';
import CheckBox from './CheckBox';

export default function SelectAll({ CheckBox, checked, onChange, deleteCheckedItems, setCheckProduct, checkProduct }) {
  const delCheckedItems = async () => {
    deleteCheckedItems(checkProduct); // 선택된 상품 삭제 요청
    setCheckProduct([]); // 삭제 후 선택 초기화
  };

  return (
    <div className='cart-header w-full'>
      <div className='cart-select-all'>
        <CheckBox checked={checked} onChange={onChange} />
        <p className='f16 margin00016'>전체선택</p>
      </div>
      <button className='w-btn' onClick={delCheckedItems}>선택삭제</button>
    </div>
  );
}
