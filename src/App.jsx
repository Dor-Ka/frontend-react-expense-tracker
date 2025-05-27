import { useState } from "react";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import { dummyExpenses } from "./features/expenses/dummyExpenses";

function App() {
  const [expenses, setExpenses] = useState(dummyExpenses);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  return (
    <>
      <Header />
      <ExpenseList expenses={expenses} />

      <Container>
        <Card>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </Card>
      </Container>
    </>
  );
}

export default App;
