import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { getTodayDate } from "../utils/date";
import { getCategorizer } from "../services/categorizer";

export const useExpenseFormState = (expenseToEdit) => {
  const titleInputRef = useRef(null);
  const isCategoryManuallySet = useRef(false);
  const originalAutoCategory = useRef(null);
  const categorizationPromise = useRef(null);
  const lastTitleForCategorization = useRef("");

  const defaultFormState = useMemo(() => ({
    title: "",
    amount: "",
    date: getTodayDate(),
    category: "Other",
  }), []);

  const [formState, setFormState] = useState(defaultFormState);
  const [isCategorizing, setIsCategorizing] = useState(false);

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

  const runCategorization = useCallback(async (title) => {
    if (!title || title.trim() === "") {
      return "Other";
    }

    try {
      const categorizer = getCategorizer();
      const result = await categorizer.categorize(title);
      return result.category;
    } catch (error) {
      console.error("Categorization failed:", error);
      return "Other";
    }
  }, []);

  const handleTitleChange = useCallback(
    (e) => {
      const value = e.target.value;
      
      setFormState((prev) => ({
        ...prev,
        title: value,
      }));

      if (isCategoryManuallySet.current) {
        return;
      }

      if (categorizationPromise.current) {
        categorizationPromise.current = null;
      }

      lastTitleForCategorization.current = value;
      const currentTitle = value;

      setIsCategorizing(true);

      const promise = (async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (categorizationPromise.current !== promise || 
            lastTitleForCategorization.current !== currentTitle) {
          return;
        }

        const category = await runCategorization(currentTitle);
        
        if (categorizationPromise.current === promise && 
            !isCategoryManuallySet.current) {
          originalAutoCategory.current = category;
          setFormState((prev) => ({
            ...prev,
            category: category,
          }));
        }
        
        setIsCategorizing(false);
      })();

      categorizationPromise.current = promise;
    },
    [runCategorization]
  );

  const handleCategoryChange = useCallback(
    (e) => {
      const value = e.target.value;
      isCategoryManuallySet.current = true;
      setFormState((prev) => ({
        ...prev,
        category: value,
      }));
    },
    []
  );

  const handleInputChange = useCallback(
    (field) => {
      if (field === "title") {
        return handleTitleChange;
      } else if (field === "category") {
        return handleCategoryChange;
      }
      
      return (e) => {
        const value = e.target.value;
        setFormState((prev) => ({
          ...prev,
          [field]: value,
        }));
      };
    },
    [handleTitleChange, handleCategoryChange]
  );

  const learnUserChoice = useCallback(() => {
    if (formState.title && formState.category) {
      if (isCategoryManuallySet.current && 
          formState.category !== originalAutoCategory.current) {
        try {
          const categorizer = getCategorizer();
          categorizer.learn(formState.title, formState.category);
        } catch (error) {
          console.error("Failed to learn category:", error);
        }
      }
    }
  }, [formState]);

  const resetForm = useCallback(() => {
    setFormState(defaultFormState);
    isCategoryManuallySet.current = false;
    originalAutoCategory.current = null;
    categorizationPromise.current = null;
    lastTitleForCategorization.current = "";
    setIsCategorizing(false);
    titleInputRef.current?.focus();
  }, [defaultFormState]);

  return {
    formState,
    setFormState,
    handleInputChange,
    resetForm,
    learnUserChoice,
    titleInputRef,
    isCategorizing,
  };
};
