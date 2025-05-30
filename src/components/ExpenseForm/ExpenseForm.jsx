import { useState, useEffect, useRef } from "react";
import { Form, FormGroup } from "./ExpenseFormStyles";
import { SubmitButton, CancelButton } from "../StyledButton";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const categoryOptions = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Other",
];

const ExpenseForm = ({ onAddExpense, expenseToEdit, onSaveExpense, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [category, setCategory] = useState("Other");
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
      titleInputRef.current?.focus();
    } else {
      setTitle("");
      setAmount("");
      setDate(getTodayDate());
      setCategory("Other");
    }
  }, [expenseToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      id: expenseToEdit ? expenseToEdit.id : crypto.randomUUID(),
      title,
      amount: parseFloat(amount),
      date,
      category,
    };

    if (expenseToEdit) {
      onSaveExpense(expenseData);
    } else {
      onAddExpense(expenseData);
    }

    if (!expenseToEdit) {
      setTitle("");
      setAmount("");
      setCategory("Other");
      setDate(getTodayDate());
      titleInputRef.current?.focus();
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input
          ref={titleInputRef}
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormGroup>

      <SubmitButton type="submit">
        {expenseToEdit ? "Save Changes" : "Add Expense"}
      </SubmitButton>

      {expenseToEdit && (
        <CancelButton type="button" onClick={onCancelEdit}>
          Cancel
        </CancelButton>
      )}
    </Form>
  );
};

export default ExpenseForm;
