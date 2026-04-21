import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { getTodayDate } from "../utils/date";
import { smartCategorize, learnCategory } from "../utils/smartCategorizer";

export const useExpenseFormState = (expenseToEdit) => {
  const titleInputRef = useRef(null);
  const isCategoryManuallySet = useRef(false);
  const originalAutoCategory = useRef(null);

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
      isCategoryManuallySet.current = true;
      originalAutoCategory.current = null;
    } else {
      setFormState(defaultFormState);
      isCategoryManuallySet.current = false;
      originalAutoCategory.current = null;
    }
    titleInputRef.current?.focus();
  }, [expenseToEdit, defaultFormState]);

  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      
      if (field === "title" && !isCategoryManuallySet.current) {
        const autoCategory = smartCategorize(value);
        originalAutoCategory.current = autoCategory;
        setFormState((prev) => ({
          ...prev,
          title: value,
          category: autoCategory,
        }));
      } else if (field === "category") {
        isCategoryManuallySet.current = true;
        setFormState((prev) => ({
          ...prev,
          [field]: value,
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

  const learnUserChoice = useCallback(() => {
    if (formState.title && formState.category) {
      if (isCategoryManuallySet.current && 
          formState.category !== originalAutoCategory.current) {
        learnCategory(formState.title, formState.category);
      }
    }
  }, [formState]);

  const resetForm = useCallback(() => {
    setFormState(defaultFormState);
    isCategoryManuallySet.current = false;
    originalAutoCategory.current = null;
    titleInputRef.current?.focus();
  }, [defaultFormState]);

  return {
    formState,
    setFormState,
    handleInputChange,
    resetForm,
    learnUserChoice,
    titleInputRef,
  };
};
