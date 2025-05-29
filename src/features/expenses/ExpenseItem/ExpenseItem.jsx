import { IconButton } from "../../../components/StyledButton";
import { ItemWrapper, LeftColumn, RightColumn, CategoryTag } from "./ExpenseItemStyles";

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const ExpenseItem = ({ id, title, amount, date, category, onDelete }) => {
  return (
    <ItemWrapper>
      <LeftColumn>
        <strong>{title}</strong>
        <span>{formatDate(date)}</span>
        <CategoryTag>{category}</CategoryTag>
      </LeftColumn>
      <RightColumn>${amount.toFixed(2)}</RightColumn>
      <IconButton onClick={() => onDelete(id)}>🗑️</IconButton>
    </ItemWrapper>
  );
};

export default ExpenseItem;
