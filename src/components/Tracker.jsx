import "./Tracker.css";
import React, { useState } from "react";

function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate amount input (numbers only)
    if (name === "amount" && !/^[0-9]*\.?[0-9]*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if (!formData.description) {
      alert("Please provide a description!");
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Please provide a valid amount greater than 0!");
      return;
    }
    if (!formData.category) {
      alert("Please select a category!");
      return;
    }

    // Create new expense
    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount).toFixed(2), // Ensure amount is stored as a fixed decimal
    };

    // Add expense to the list
    setExpenses([...expenses, newExpense]);

    // Reset form fields
    setFormData({ description: "", amount: "", category: "" });
  };

  // Handle deleting an expense
  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Expense Tracker Form</h1>

      {/* Expense Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text" // Changed from number to text
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" style={{ padding: "5px 10px" }}>Add Expense</button>
      </form>

      {/* Expense List */}
      <h2>List of Expenses</h2>
      {expenses.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>No expenses recorded yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} style={{ marginBottom: "10px" }}>
              <strong>{expense.description}</strong> - ₱{expense.amount} ({expense.category})
              <button
                onClick={() => handleDelete(expense.id)}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  background: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Total Expenses */}
      <h2>Total: ₱{calculateTotal().toFixed(2)}</h2>
    </div>
  );
}

export default Tracker;
