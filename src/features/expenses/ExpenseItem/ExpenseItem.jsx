import { ItemWrapper } from "./ExpenseItemStyles";

const ExpenseItem = ({ title, amount, date }) => {
  return (
    <ItemWrapper>
      <strong>{title}</strong> $ {amount}
      <span>{date}</span>
    </ItemWrapper>
  );
};

export default ExpenseItem;
