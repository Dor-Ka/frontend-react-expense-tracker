import { useState, useEffect, useRef } from "react";
import { Form, FormGroup } from "./ExpenseFormStyles";
import { SubmitButton, CancelButton } from "../StyledButton";


const categoryOptions = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Other",
];

const ExpenseForm = ({ onAddExpense, expenseToEdit, onSaveExpense, onCancelEdit }) => {
 
  const todayDate = new Date().toISOString().split("T")[0];

  const defaultFormState = {
    title: "",
    amount: "",
    date: todayDate, 
    category: "Other",
  };

  const [formState, setFormState] = useState(defaultFormState);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (expenseToEdit) {
      setFormState({
        title: expenseToEdit.title,
        amount: expenseToEdit.amount.toString(),
        date: expenseToEdit.date,
        category: expenseToEdit.category,
      });
    } else {
      setFormState(defaultFormState);
    }
    titleInputRef.current?.focus();
  }, [expenseToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      id: expenseToEdit ? expenseToEdit.id : crypto.randomUUID(),
      title: formState.title,
      amount: parseFloat(formState.amount),
      date: formState.date,
      category: formState.category,
    };

    if (expenseToEdit) {
      onSaveExpense(expenseData);
    } else {
      onAddExpense(expenseData);
    }

    if (!expenseToEdit) {
      setFormState(defaultFormState);
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
          value={formState.title}
          onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={formState.amount}
          onChange={(e) => setFormState(prev => ({ ...prev, amount: e.target.value }))}
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
          value={formState.date}
          onChange={(e) => setFormState(prev => ({ ...prev, date: e.target.value }))}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formState.category}
          onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
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