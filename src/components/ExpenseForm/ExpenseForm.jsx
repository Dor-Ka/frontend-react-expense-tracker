import { useState, useRef } from "react";
import { Form, FormGroup, SubmitButton } from "./ExpenseFormStyles";

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const titleInputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      title,
      amount: parseFloat(amount),
      date,
    };
    onAddExpense(expenseData);
    setTitle("");
    setAmount("");
    setDate(getTodayDate());

    titleInputRef.current?.focus();
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

      <SubmitButton type="submit">Add Expense</SubmitButton>
    </Form>
  );
};

export default ExpenseForm;