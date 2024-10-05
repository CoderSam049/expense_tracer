import React, { useState } from 'react'

export default function UseFilter(data, callback) {
const[ query, setQuery]= useState('');

    const filteredData = data.filter((item) => {
    // If 'All' is selected or nothing is selected, return all idata
    if (query === "" || query === "All") return true;
    return callback(item).toLowerCase().includes(query.toLowerCase());
  });

  return[ filteredData, setQuery]

}
