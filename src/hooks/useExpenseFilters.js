import { useState, useMemo } from "react";

export const useExpenseFilters = (expenses) => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return [...new Set(expenses.map((exp) => exp.category))];
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const year = new Date(expense.date).getFullYear().toString();
      const matchesYear = selectedYear === "all" || year === selectedYear;
      const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
      return matchesYear && matchesCategory;
    });
  }, [expenses, selectedYear, selectedCategory]);

  return {
    selectedYear,
    setSelectedYear,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredExpenses,
  };
};