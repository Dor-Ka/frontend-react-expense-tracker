import { useState } from "react";
import { useExpenses } from "./features/expenses/useExpenses";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesFilters from "./features/expenses/ExpensesFilters/ExpensesFilters";
import sampleExpenses from "./utils/sampleExpenses";
import { SampleButton } from "./components/StyledButton";

function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [...new Set(expenses.map(exp => exp.category))];

  const filteredExpenses = expenses.filter((expense) => {
    const year = new Date(expense.date).getFullYear().toString();
    const matchesYear = selectedYear === "All" || year === selectedYear;
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory;
    return matchesYear && matchesCategory;
  });

  const loadSampleExpenses = () => {
    sampleExpenses.forEach((expense) => addExpense({ ...expense, id: crypto.randomUUID() }));
  };


  return (
    <>
      <Header />
      <Container>
        <Card>
          <ExpenseForm onAddExpense={addExpense} />
        </Card>

        <SampleButton onClick={loadSampleExpenses}>Load Sample Expenses</SampleButton>

        <ExpensesFilters
          expenses={expenses}
          selectedYear={selectedYear}
          onChangeYear={setSelectedYear}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          categories={categories}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
        />
      </Container>
    </>
  );
}

export default App;
