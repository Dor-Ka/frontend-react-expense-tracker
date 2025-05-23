import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import { dummyExpenses } from "./features/expenses/dummyExpenses";


const App = () => {
  return (
    <>
      <Header />
      <ExpenseList expenses={dummyExpenses} />

      <Container>
        <Card>
          <h2>Sample Card</h2>
          <p>This is a sample card component.</p>
        </Card>
      </Container>
    </>
  );
};

export default App;
