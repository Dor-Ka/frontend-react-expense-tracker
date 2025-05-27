import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return { expenses, addExpense };
};
