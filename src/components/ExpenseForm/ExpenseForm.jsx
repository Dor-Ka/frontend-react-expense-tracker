import { useExpenseFormState } from "../../hooks/useExpenseFormState";
import { CATEGORY_OPTIONS } from "../../constants/categories";

import { Form, FormGroup } from "./ExpenseFormStyles";
import { SubmitButton, CancelButton } from "../StyledButton";

const ExpenseForm = ({ onAddExpense, expenseToEdit, onSaveExpense, onCancelEdit }) => {
  const {
    formState,
    handleInputChange,
    resetForm,
    titleInputRef,
  } = useExpenseFormState(expenseToEdit);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      id: expenseToEdit ? expenseToEdit.id : crypto.randomUUID(),
      title: formState.title,
      amount: parseFloat(parseFloat(formState.amount).toFixed(2)),
      date: formState.date,
      category: formState.category,
    };

    if (expenseToEdit) {
      onSaveExpense(expenseData);
    } else {
      onAddExpense(expenseData);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="title">Title</label>
        <input
          ref={titleInputRef}
          id="title"
          type="text"
          value={formState.title}
          onChange={handleInputChange("title")}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={formState.amount}
          onChange={handleInputChange("amount")}
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
          onChange={handleInputChange("date")}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={formState.category}
          onChange={handleInputChange("category")}
          required
        >
          {CATEGORY_OPTIONS.map((option) => (
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