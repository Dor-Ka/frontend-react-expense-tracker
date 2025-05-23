import { ListWrapper } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses }) => {
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
