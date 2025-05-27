import { ItemWrapper, LeftColumn, RightColumn } from "./ExpenseItemStyles";

const ExpenseItem = ({ title, amount, date }) => {
  return (
    <ItemWrapper>
      <LeftColumn>
        <strong>{title}</strong>
        <span>{date}</span>
      </LeftColumn>
      <RightColumn>${amount.toFixed(2)}</RightColumn>
    </ItemWrapper>
  );
};

export default ExpenseItem;
