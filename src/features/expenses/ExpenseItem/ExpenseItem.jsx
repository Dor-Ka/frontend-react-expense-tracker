import { formatDate } from "../../../utils/date";
import { IconButton } from "../../../components/StyledButton";
import { Trash2, EditIcon } from "lucide-react";
import { ItemWrapper, LeftColumn, RightColumn, CategoryTag } from "./ExpenseItemStyles";




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
