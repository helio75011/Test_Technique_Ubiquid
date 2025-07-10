import './Filter.css';

function Filters({ filters, onFilterChange }) {
  const TITLE_OPTIONS = [
    'Dev Backend',
    'Dev Fullstack',
    'Dev Frontend',
    'Project / Product Management'
  ];
  const CONTRACT_OPTIONS = ['CDD', 'CDI', 'Stage'];
  const REMOTE_OPTIONS = [
    'Télétravail partiel',
    'Télétravail ponctuel',
    'Télétravail total',
    'Non spécifié'
  ];

  const handleCheckboxChange = (category, value) => {
    const isSelected = filters[category].includes(value);
    const updated = isSelected
      ? filters[category].filter(v => v !== value)
      : [...filters[category], value];

    onFilterChange(category, updated);
  };

  return (
    <div className="filters-container">
      <FilterGroup
        title="Poste"
        options={TITLE_OPTIONS}
        selected={filters.titles}
        onChange={val => handleCheckboxChange('titles', val)}
      />

      <FilterGroup
        title="Contrat"
        options={CONTRACT_OPTIONS}
        selected={filters.contracts}
        onChange={val => handleCheckboxChange('contracts', val)}
      />

      <FilterGroup
        title="Télétravail"
        options={REMOTE_OPTIONS}
        selected={filters.remotes}
        onChange={val => handleCheckboxChange('remotes', val)}
      />
    </div>
  );
}

function FilterGroup({ title, options, selected, onChange }) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {options.map(option => (
        <label key={option} className="filter-option">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
}

export default Filters;
