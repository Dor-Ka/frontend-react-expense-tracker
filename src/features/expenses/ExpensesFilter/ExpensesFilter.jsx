import { FilterContainer, Select } from "./ExpensesFilterStyles";

function ExpensesFilter({ selectedYear, onChangeYear }) {
  const years = ["All", "2025", "2024", "2023", "2022"];

  return (
    <FilterContainer>
      <label>
        Filter by year:{" "}
        <Select value={selectedYear} onChange={(e) => onChangeYear(e.target.value)}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </label>
    </FilterContainer>
  );
}

export default ExpensesFilter;
