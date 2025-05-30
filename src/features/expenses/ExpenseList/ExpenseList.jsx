import { ListWrapper, Message } from "./ExpenseListStyles";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete, selectedYear, selectedCategory }) => {

  const getNoExpensesMessage = (year, category) => {
    const yearText = year === "All" ? "" : ` in ${year}`;
    const categoryText = category === "all" ? "" : ` under "${category}" category`;
    return (yearText || categoryText)
      ? `No expenses found for selected filters${yearText}${categoryText}.`
      : "No expenses found.";
  };

  if (expenses.length === 0) {
    return <Message>{getNoExpensesMessage(selectedYear, selectedCategory)}</Message>;
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
