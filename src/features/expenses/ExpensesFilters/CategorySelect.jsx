import { SelectWrapper, Select, Label } from "./ExpensesFilterStyles";

const CategorySelect = ({ selectedCategory, onCategoryChange, categories }) => {

  const handleCategoryChange = (e) => onCategoryChange(e.target.value);

  return (
    <SelectWrapper>
      <Label htmlFor="categoryFilter">Filter by category:</Label>
      <Select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="all">All</option>
        {categories
          .filter((cat) => cat?.trim())
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </Select>
    </SelectWrapper>
  );
};

export default CategorySelect;
