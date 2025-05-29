import { ItemWrapper, LeftColumn, RightColumn, CategoryTag } from "./ExpenseItemStyles";
import { IconButton } from "../../../components/StyledButton";
import { Trash2, EditIcon } from "lucide-react";

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const ExpenseItem = ({ id, title, amount, date, category, onDelete, onEdit }) => {
  return (
    <ItemWrapper>
      <LeftColumn>
        <strong>{title}</strong>
        <span>{formatDate(date)}</span>
        <CategoryTag>{category}</CategoryTag>
      </LeftColumn>
      <RightColumn>${amount.toFixed(2)}</RightColumn>
      <IconButton onClick={() => onEdit(id)} aria-label="Edit expense">
        <EditIcon />  
      </IconButton>
      <IconButton onClick={() => onDelete(id)} aria-label="Delete expense">
        <Trash2 />
      </IconButton>
    </ItemWrapper>
  );
};

export default ExpenseItem;
