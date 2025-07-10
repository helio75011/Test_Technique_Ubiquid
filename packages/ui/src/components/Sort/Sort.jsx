// import './Sort.css';

function Sort({ sortBy, onChange }) {
  return (
    <div className="sort-container">
      <label htmlFor="sort-select" className="sort-label">
        Trier par :
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={e => onChange(e.target.value)}
        className="sort-select"
      >
        <option value="date">Date</option>
        <option value="salaire">Salaire</option>
      </select>
    </div>
  );
}

export default Sort;
