import React from "react";

export default function Select({ category, dataChange, errors }) {
  const categories = ["Grocery", "Clothes", "Bills", "Education"]; 
  
  return (
    <div className="title">
      <label htmlFor="category">Category</label>
      <select
        className="selectcategory"
        name="category"
        value={category}
        onChange={dataChange}
      >
        <option value="" disabled hidden>
          Select Category
        </option>
        {categories.map((data, i) => {
          return <option key={i} value={data}> {data} </option>;
        })}
      </select>
      <p className="errors">{errors}</p>
    </div>
  );
}
