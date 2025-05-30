import { SelectWrapper, Select, Label } from "./ExpensesFilterStyles";

const YearSelect = ({ selectedYear, onYearChange, years }) => {

    const handleYearChange = (e) => onYearChange(e.target.value);

    return (
        <SelectWrapper>
            <Label htmlFor="yearFilter">Filter by year:</Label>
            <Select id="yearFilter" value={selectedYear} onChange={handleYearChange}>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Select>
        </SelectWrapper>
    );
};

export default YearSelect;