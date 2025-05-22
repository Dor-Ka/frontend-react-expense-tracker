import { ListWrapper, ListItem } from "./ExpenseListStyles";

const ExpenseList = ({ expenses }) => {
  return (
    <ListWrapper>
      {expenses.map((expense) => (
        <ListItem key={expense.id}>
          <strong>{expense.title}</strong> — ${expense.amount}  
          <span>{expense.date}</span>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default ExpenseList;