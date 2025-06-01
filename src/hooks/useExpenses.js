import { useState, useEffect, useCallback } from "react";
import sampleExpenses from "../utils/sampleExpenses";

const LOCAL_STORAGE_KEY = "expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [hasLoadedSample, setHasLoadedSample] = useState(false);

  useEffect(() => {
    if (expenses.length === 0) {
      setHasLoadedSample(false);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

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
    if (hasLoadedSample) return;
    sampleExpenses.forEach((expense) =>
      addExpense({ ...expense, id: crypto.randomUUID() })
    );
    setHasLoadedSample(true);
  }, [addExpense, hasLoadedSample]);

  return {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    loadSampleExpenses,
    hasLoadedSample,
  };
};
