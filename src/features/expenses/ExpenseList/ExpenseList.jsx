import { ListWrapper, Message } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) {
    return <Message>No expenses found for this year.</Message>;
  }

  return (
    <ListWrapper>
      {expenses.map((expense) => (
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
