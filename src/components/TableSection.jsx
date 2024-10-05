import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Font Awesome
import UseFilter from "../hooks/UseFilter";
import ContextMenu from "./ContextMenu";
import { UseLocalStorage } from "../hooks/UseLocalStorage";

export default function TableSection({
  expenseData,
  setExpenseData,
  setformData,
  data,
  setEditingrowid,
}) {
  const [filteredData, setQuery] = UseFilter(
    expenseData,
    (data) => data.category
  );

  // Handle category change
  const handleCategoryChange = (e) => {
    setQuery(e.target.value); // Update selected category
  };

  console.log(expenseData);

  //Calculate total amount
  let totalAmount = 0;
  filteredData.forEach((data) => {
    totalAmount += +data.amount;
  });

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [rowId, setRowId] = UseLocalStorage("rowid",'');   //Fixed: Use correct capitalization for 'rowId'

  // const [sortCallback, setsortCallback] = useState(() => () => {});
  // console.log(sortCallback);

  return (
    <>
      <ContextMenu
        position={position}
        setPosition={setPosition}
        setExpenseData={setExpenseData} //Fixed typo here
        rowId={rowId}
        setformData={setformData}
        data={data}
        setEditingrowid={setEditingrowid}
      />
      <div
        className="table-section"
        onClick={() => {
          if (position.left) {
            setPosition({ left: 0 });
          }
        }}
      >
        <table className="expense-table">
          <thead>
            <tr>
            <th className="amount-column">
                <div>
                  <span>Title &nbsp;</span>
                  <FaArrowDown
                    className="arrow"
                    onClick={() =>
                      setExpenseData((prev) => [
                        ...prev.sort((a, b) => a.title.localeCompare(b.title)),
                      ])
                    }
                  />
                  &nbsp;
                  <FaArrowUp
                    className="arrow"
                    onClick={() =>
                      setExpenseData((prev) => [
                        ...prev.sort((a, b) => b.title.localeCompare(a.title)),
                      ])
                    }
                  />
                </div>
              </th>
              <th>
                <select className="category" onChange={handleCategoryChange}>
                  <option value="All">All</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothes">Clothes</option>
                  <option value="bills">Bills</option>
                  <option value="education">Education</option>
                </select>
              </th>
              <th className="amount-column">
                <div>
                  <span>Amount &nbsp;</span>
                  <FaArrowDown
                    className="arrow"
                    onClick={() =>
                      setExpenseData((prev) => [
                        ...prev.sort((a, b) => b.amount - a.amount),
                      ])
                    }
                  />
                  &nbsp;
                  <FaArrowUp
                    className="arrow"
                    onClick={() =>
                      setExpenseData((prev) => [
                        ...prev.sort((a, b) => a.amount - b.amount),
                      ])
                    }
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData
             
              .map(({ id, title, category, amount }) => (
                <tr
                  key={id}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setPosition({ top: e.clientY + 8, left: e.clientX + 6 });
                    setRowId(id); //Updated to 'setRowId'
                  }}
                >
                  <td>{title}</td>
                  <td>{category}</td>
                  <td>₹{amount}</td>
                </tr>
              ))}
            <tr>
              <th>Total</th>
              <th ></th>
              <th>₹{totalAmount}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
