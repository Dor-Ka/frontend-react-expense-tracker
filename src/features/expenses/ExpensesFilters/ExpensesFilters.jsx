import { FilterContainer, SelectWrapper, Select, Label } from "./ExpensesFilterStyles";

const ExpensesFilters = ({ selectedYear, onChangeYear, selectedCategory, onChangeCategory, categories }) => {
  const years = ["All", "2025", "2024", "2023", "2022"];

  return (
    <FilterContainer>
      <SelectWrapper>
        <Label htmlFor="yearFilter">Filter by year:</Label>
        <Select id="yearFilter" value={selectedYear} onChange={(e) => onChangeYear(e.target.value)}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </SelectWrapper>

      <SelectWrapper>
        <Label htmlFor="categoryFilter">Filter by category:</Label>
        <Select id="categoryFilter" value={selectedCategory} onChange={(e) => onChangeCategory(e.target.value)}>
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
      </SelectWrapper>
    </FilterContainer>
  );
};

export default ExpensesFilters;
