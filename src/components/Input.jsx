import React from 'react';

export default function Input({ label, value, dataChange, errors, name }) {
  return (
    <div className="title">
      <label htmlFor={name}>{label}</label> {/* Dynamically set htmlFor */}
      <input
        name={name}            // Dynamically set name
        type="text"
        id={name}              // Dynamically set id
        value={value}          // Use value instead of title for clarity
        placeholder={`Enter ${label.toLowerCase()}`}  // Dynamic placeholder
        onChange={dataChange}
      />
      <p className="errors">{errors}</p>  {/* Show errors if present */}
    </div>
  );
}
