import React from 'react';
import '../../scss/cart.scss';

export default function CheckBox({ checked, onChange }) {
  return (
    <>
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={checked ? "checkbox-active" : "checkbox"}
        onClick={onChange}
      ></div>
    </>
  );
}
