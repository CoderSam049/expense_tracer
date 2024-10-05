import React from "react";
import "./contextmenu.css";

export default function ContextMenu({
  position,
  setPosition,
  setExpenseData,
  setformData,
  rowId,
  data,
  setEditingrowid
}) {
  if (position.left === 0) {
    return;
  }
  return (
    <div
      className="contextmenu"
      style={{ top: position.top, left: position.left }}
    >
      <div
        onClick={() => {
          console.log(rowId)
          setPosition({ left: 0 }); // Hide context menu
          const {amount, category, title}=  data.find((expense)=> expense.id=== rowId);

          setformData({amount, category, title})
          setEditingrowid(rowId)
        

        }}
        className="bod"
      >
        Edit
      </div>

      <div
        onClick={() => {
          setExpenseData((prev) => {
            // Filter out the rowId from the previous data
            return prev.filter((data) => data.id !== rowId);
          });
          setPosition({ left: 0 }); // Reset the context menu position
        }}
        className="bod del"
      >
        Delete
      </div>
    </div>
  );
}
