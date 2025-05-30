import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { getTodayDate } from "../utils/date";

export const useExpenseFormState = (expenseToEdit) => {
  const titleInputRef = useRef(null);

  const defaultFormState = useMemo(() => ({
    title: "",
    amount: "",
    date: getTodayDate(),
    category: "Other",
  }), []);

  const [formState, setFormState] = useState(defaultFormState);

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
  }, [expenseToEdit, defaultFormState]);

 const handleInputChange = useCallback(
    (field) => (e) => {
      setFormState((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormState(defaultFormState);
    titleInputRef.current?.focus();
  }, [defaultFormState]);

  return {
    formState,
    setFormState,
    handleInputChange,
    resetForm,
    titleInputRef,
  };
};
