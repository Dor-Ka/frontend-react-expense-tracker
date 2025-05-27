import { useExpenses } from "./features/expenses/useExpenses";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";

function App() {

  const { expenses, addExpense } = useExpenses();

  return (
    <>
      <Header />
      <ExpenseList expenses={expenses} />

      <Container>
        <Card>
          <ExpenseForm onAddExpense={addExpense} />
        </Card>
      </Container>
    </>
  );
}

export default App;
