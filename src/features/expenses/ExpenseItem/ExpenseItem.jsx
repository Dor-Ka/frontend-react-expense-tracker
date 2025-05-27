import { ItemWrapper, LeftColumn, RightColumn } from "./ExpenseItemStyles";

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const ExpenseItem = ({ id, title, amount, date, onDelete }) => {
  return (
    <ItemWrapper>
      <LeftColumn>
        <strong>{title}</strong>
        <span>{formatDate(date)}</span>
      </LeftColumn>
      <RightColumn>${amount.toFixed(2)}</RightColumn>
      <button onClick={() => onDelete(id)}>🗑️</button>
    </ItemWrapper>
  );
};

export default ExpenseItem;
