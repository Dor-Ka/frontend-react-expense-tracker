import { FilterContainer, SelectWrapper, Select, Label } from "./ExpensesFilterStyles";

const ExpensesFilters = ({ expenses, selectedYear, onChangeYear, selectedCategory, onChangeCategory, categories }) => {
  const years = ["All", ...new Set(expenses.map(exp => new Date(exp.date).getFullYear().toString()))];


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
          {categories
            .filter((cat) => cat && cat.trim() !== "")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}

        </Select>
      </SelectWrapper>
    </FilterContainer>
  );
};

export default ExpensesFilters;
