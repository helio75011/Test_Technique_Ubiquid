import React, { useState } from 'react';
import './Filter.css';

function Filters({ filters, onFilterChange }) {
  // ✅ Données du backend (clés)
  const TITLE_OPTIONS = ['backend', 'frontend', 'fullstack', 'manager'];
  const CONTRACT_OPTIONS = ['cdi', 'cdd', 'stage'];
  const REMOTE_OPTIONS = ['partial', 'ponctual', 'total', 'unspecified'];

  return (
    <div className="filters-container">
      <FilterDropdown title="Poste" options={TITLE_OPTIONS} selected={filters.titles} onChange={(val) => handle(val, 'titles')} />
      <FilterDropdown title="Contrat" options={CONTRACT_OPTIONS} selected={filters.contracts} onChange={(val) => handle(val, 'contracts')} />
      <FilterDropdown title="Télétravail" options={REMOTE_OPTIONS} selected={filters.remotes} onChange={(val) => handle(val, 'remotes')} />
    </div>
  );

  function handle(value, category) {
    const isSelected = filters[category].includes(value);
    const updated = isSelected
      ? filters[category].filter((v) => v !== value)
      : [...filters[category], value];

    onFilterChange(category, updated);
  }
}

function FilterDropdown({ title, options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter-dropdown">
      <button className="filter-toggle" onClick={() => setOpen(!open)}>
        {title} <span className="arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <fieldset className="filter-group">
          {/* <legend>{title}</legend> */}
          {options.map(option => (
            <label key={option} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
              />
              {formatLabel(option, title)}
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}

function formatLabel(value, category) {
  if (category === 'Télétravail') {
    const map = {
      partial: 'Télétravail partiel',
      ponctual: 'Télétravail ponctuel',
      total: 'Télétravail total',
      unspecified: 'Non spécifié'
    };
    return map[value] || value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1); // capitaliser les autres
}

export default Filters;