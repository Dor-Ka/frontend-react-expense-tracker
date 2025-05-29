import { ListWrapper, Message } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete, selectedYear, selectedCategory }) => {

  if (expenses.length === 0) {
    const yearText = selectedYear === "All" ? "" : ` in ${selectedYear}`;
    const categoryText = selectedCategory === "all" ? "" : ` under "${selectedCategory}" category`;
    const combinedText = (yearText || categoryText) 
      ? ` for selected filters${yearText}${categoryText}`
      : "";
  
    return <Message>No expenses found{combinedText}.</Message>;
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
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      ))}
    </ListWrapper>
  );
};

export default ExpenseList;
