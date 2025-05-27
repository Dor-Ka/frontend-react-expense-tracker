import { ListWrapper, Message } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) {
    return <Message>No expenses found for this year.</Message>;
  }

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      {sortedExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ListWrapper>
  );
};

export default ExpenseList;
