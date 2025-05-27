import { useState } from "react";
import { useExpenses } from "./features/expenses/useExpenses";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesFilter from "./features/expenses/ExpensesFilter/ExpensesFilter";

function App() {
  const { expenses, addExpense } = useExpenses();
  const [selectedYear, setSelectedYear] = useState("2025");

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseYear = new Date(expense.date).getFullYear().toString();
    return expenseYear === selectedYear;
  });

  return (
    <>
      <Header />
      <Container>
        <Card>
          <ExpenseForm onAddExpense={addExpense} />
        </Card>

        <ExpensesFilter selectedYear={selectedYear} onChangeYear={handleYearChange} />

        <ExpenseList expenses={filteredExpenses} />
      </Container>
    </>
  );
}

export default App;
