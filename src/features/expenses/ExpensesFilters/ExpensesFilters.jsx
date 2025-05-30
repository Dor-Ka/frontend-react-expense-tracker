import { useMemo } from "react";
import YearSelect from "./YearSelect";
import CategorySelect from "./CategorySelect";

import { FilterContainer } from "./ExpensesFilterStyles";

const ExpensesFilters = ({ expenses, selectedYear, onChangeYear, selectedCategory, onChangeCategory, categories }) => {

  const years = useMemo(() => {
    return ["All", ...new Set(expenses.map(exp => new Date(exp.date).getFullYear().toString()))];
  }, [expenses]);


  return (
    <FilterContainer>
      <YearSelect
        selectedYear={selectedYear}
        onChange={onChangeYear}
        years={years}
      />
      <CategorySelect
        selectedCategory={selectedCategory}
        onChange={onChangeCategory}
        categories={categories}
      />
    </FilterContainer>
  );
};

export default ExpensesFilters;
