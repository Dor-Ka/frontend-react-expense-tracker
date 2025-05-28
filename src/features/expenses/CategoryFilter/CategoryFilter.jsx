
const CategoryFilter = ({ selectedCategory, onChangeCategory, categories }) => {
  return (
    <div>
      <label htmlFor="categoryFilter">Filter by category: </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
