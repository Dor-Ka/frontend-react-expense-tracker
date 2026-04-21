import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { getTodayDate } from "../utils/date";
import { categorizeByTitle } from "../utils/categoryClassifier";

export const useExpenseFormState = (expenseToEdit) => {
  const titleInputRef = useRef(null);
  const categoryManuallyChanged = useRef(false);

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
      categoryManuallyChanged.current = true;
    } else {
      setFormState(defaultFormState);
      categoryManuallyChanged.current = false;
    }
    titleInputRef.current?.focus();
  }, [expenseToEdit, defaultFormState]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;

      if (field === "title") {
        const suggestedCategory = categorizeByTitle(value);

        if (!categoryManuallyChanged.current || suggestedCategory !== "Other") {
          setFormState((prev) => ({
            ...prev,
            title: value,
            category: suggestedCategory !== "Other" ? suggestedCategory : prev.category,
          }));
        } else {
          setFormState((prev) => ({
            ...prev,
            title: value,
          }));
        }
      } else if (field === "category") {
        categoryManuallyChanged.current = true;
        setFormState((prev) => ({
          ...prev,
          category: value,
        }));
      } else {
        setFormState((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormState(defaultFormState);
    categoryManuallyChanged.current = false;
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
