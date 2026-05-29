function Filter({ filter, onFilterChange }) {
  return (
    <div className="filter-box">
      <label htmlFor="filter">Сортування:</label>
      <select
        id="filter"
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        <option value="default">Без сортування</option>
        <option value="rating">За рейтингом</option>
        <option value="year">За роком</option>
        <option value="title">За назвою</option>
      </select>
    </div>
  );
}

export default Filter;
