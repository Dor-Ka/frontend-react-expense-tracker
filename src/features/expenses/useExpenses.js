import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  return { expenses, addExpense };
};
