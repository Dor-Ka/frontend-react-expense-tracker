import { useMemo } from "react";
import { FilterContainer, SelectWrapper, Select, Label } from "./ExpensesFilterStyles";

const ExpensesFilters = ({ expenses, selectedYear, onChangeYear, selectedCategory, onChangeCategory, categories }) => {

  const years = useMemo(() => {
    return ["All", ...new Set(expenses.map(exp => new Date(exp.date).getFullYear().toString()))];
  }, [expenses]);

  const handleYearChange = (e) => onChangeYear(e.target.value);
  const handleCategoryChange = (e) => onChangeCategory(e.target.value);


  return (
    <FilterContainer>
      <SelectWrapper>
        <Label htmlFor="yearFilter">Filter by year:</Label>
        <Select id="yearFilter" value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </SelectWrapper>

      <SelectWrapper>
        <Label htmlFor="categoryFilter">Filter by category:</Label>
        <Select id="categoryFilter" value={selectedCategory} onChange={handleCategoryChange}>
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
