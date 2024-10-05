import React, { useRef, useState } from "react";
import TableSection from "./components/TableSection";
import ExpenseForm from "./components/ExpenseForm";
import "./index.css";
import ExpenseData from "./components/ExpenseData";
import { UseLocalStorage } from "./hooks/UseLocalStorage";


export default function App() {
  const [data, setExpenseData] = UseLocalStorage('keys', ExpenseData);
  const [editrowid, setEditingrowid] = useState("");
  const [formData, setformData] = useState({
    title: "",
    category: "",
    amount: "",
  });




  return (
    <>

   
      <ExpenseForm
        setExpenseData={setExpenseData}
        formData={formData}
        setformData={setformData}
        editrowid={editrowid}
        setEditingrowid={setEditingrowid}
      ></ExpenseForm>

      <TableSection
        expenseData={data}
        setExpenseData={setExpenseData}
        setformData={setformData}
        data={data}
        setEditingrowid={setEditingrowid}
      ></TableSection>
    </>
  );
}
