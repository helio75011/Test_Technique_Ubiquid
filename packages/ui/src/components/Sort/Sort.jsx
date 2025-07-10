import "./Sort.css";

function Sort({ sortBy, onChange }) {
  return (
    <div className="sort-container">
      <label>
        Trier par :
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="salaire">Salaire</option>
        </select>
      </label>
    </div>
  );
}

export default Sort;
