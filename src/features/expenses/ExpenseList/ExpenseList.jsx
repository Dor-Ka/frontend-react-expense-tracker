import { ListWrapper, Message } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <Message>No expenses found for this year.</Message>;
  }

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ListWrapper>
      {sortedExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          category={expense.category} 
          onDelete={onDelete}
        />
      ))}
    </ListWrapper>
  );
};

export default ExpenseList;
