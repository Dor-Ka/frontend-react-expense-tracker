import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import { dummyExpenses } from "./features/expenses/dummyExpenses";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";


function App() {
  const handleAddExpense = (expense) => {
    console.log("New expense added:", expense);
  };

  return (
    <>
      <Header />
      <ExpenseList expenses={dummyExpenses} />

      <Container>
        <Card>
          <ExpenseForm onAddExpense={handleAddExpense} />
        </Card>
      </Container>
    </>
  );
};

export default App;
