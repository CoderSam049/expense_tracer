import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({
  setExpenseData,
  formData,
  setformData,
  editrowid,
  setEditingrowid,
}) {
  const [errors, setErrors] = useState({});

  const validationinput = {
    title: [
      { required: true, message: "Please enter a title" },
      { minlength: 2, message: "Title should be at least 5 characters long" },
    ],
    category: [{ required: true, message: "Choose a category" }],
    amount: [
      { required: true, message: "Enter an amount" },
      { pattern: /^[0-9]*$/, message: "Valid only numbers are allowed" },
    ],
  };

  const validate = (formData) => {
    let errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (validationinput[key]) {
        validationinput[key].forEach((rule) => {
          // Check for required fields
          if (rule.required && !value) {
            errors[key] = rule.message;
          }
          // Check for minlength
          if (rule.minlength && value.length < rule.minlength) {
            errors[key] = rule.message;
          }
          // Check for pattern match
          if (rule.pattern && !rule.pattern.test(value)) {
            errors[key] = rule.message;
          }
        });
      }
    });

    setErrors(errors);
    return errors;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const { title, amount, category } = formData;
    const expenseData = { title, amount, category };
    const validationErrors = validate(expenseData);
    if (Object.keys(validationErrors).length) {
      return;
    }

    if (editrowid) {
      // Update the existing entry when in edit mode
      setExpenseData((prev) =>
        prev.map((singleExpense) => {
          if (singleExpense.id === editrowid) {
            return { ...formData, id: editrowid }; // Keep the same id while editing
          }
          return singleExpense;
        })
      );
      // Reset the form and exit the edit mode
      setformData({
        title: "",
        category: "",
        amount: "",
      });
      setEditingrowid(""); // Reset the edit row ID after updating
    } else {
      // Add a new entry if not in edit mode
      setExpenseData((prevData) => [
        ...prevData,
        { ...expenseData, id: crypto.randomUUID() },
      ]);
    }

    // Reset the form fields
    setformData({ title: "", amount: "", category: "" });
  };

  const dataChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear only the specific error
  };

  return (
    <div className="htmlForm-section">
      <h2>Track Our Expense</h2>
      <form id="expensehtmlForm" onSubmit={handlesubmit}>
        <Input
          label="Title"
          name="title" // Set unique name
          value={formData.title} // Pass the specific formData field
          dataChange={dataChange} // Handle data change
          errors={errors.title} // Pass specific error
        />

        <Select
          value={formData.category}
          category={formData.category}
          dataChange={dataChange}
          errors={errors.category}
        ></Select>

        <div className="title">
          <label htmlFor="amount">Amount</label>
          <input
            name="amount"
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={dataChange}
          />
          <p className="errors">{errors.amount}</p>{" "}
          {/* Display the error here */}
        </div>

        <button className="addbtn" type="submit">
          {editrowid ? "save" : "Submit"}
        </button>
      </form>
    </div>
  );
}
