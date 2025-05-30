import { useState, useEffect, useCallback } from "react";
import sampleExpenses from "../utils/sampleExpenses";

const LOCAL_STORAGE_KEY = "expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = useCallback((expense) => {
    setExpenses((prev) => [expense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  const updateExpense = useCallback((updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
  }, []);

  const loadSampleExpenses = useCallback(() => {
    sampleExpenses.forEach((expense) => addExpense({ ...expense, id: crypto.randomUUID() }));
  }, [addExpense]);

  return {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    loadSampleExpenses,
  };
};
