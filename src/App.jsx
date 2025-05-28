import { useState } from "react";
import { useExpenses } from "./features/expenses/useExpenses";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesFilter from "./features/expenses/ExpensesFilter/ExpensesFilter";
import CategoryFilter from "./features/expenses/CategoryFilter/CategoryFilter";

function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [...new Set(expenses.map(exp => exp.category))];

  const filteredExpenses = expenses.filter((expense) => {
    const year = new Date(expense.date).getFullYear().toString();
    return selectedYear === "All" || year === selectedYear;
  });

  return (
    <>
      <Header />
      <Container>
        <Card>
          <ExpenseForm onAddExpense={addExpense} />
        </Card>

        <ExpensesFilter
          selectedYear={selectedYear}
          onChangeYear={setSelectedYear}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          categories={categories}
        />

        <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
      </Container>
    </>
  );
}

export default App;
