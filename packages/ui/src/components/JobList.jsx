import React, { useEffect, useState, useMemo } from 'react';

const TITLES = [
  'Dev Backend',
  'Dev Fullstack',
  'Dev Frontend',
  'Project / Product Management'
];

const CONTRACTS = ['CDD', 'CDI', 'Stage'];

const REMOTES = [
  'Télétravail partiel',
  'Télétravail ponctuel',
  'Télétravail total',
  'Non spécifié'
];

const SORT_OPTIONS = ['date', 'salaire'];

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    titles: [],
    contracts: [],
    remotes: []
  });
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetch('http://localhost:3000/jobs/list')
      .then(res => res.json())
      .then(setJobs)
      .catch(err => console.error('Erreur chargement jobs:', err));
  }, []);

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const alreadySelected = prev[category].includes(value);
      const updated = alreadySelected
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(job => filters.titles.length === 0 || filters.titles.includes(job.title))
      .filter(job => filters.contracts.length === 0 || filters.contracts.includes(job.contractType))
      .filter(job => filters.remotes.length === 0 || filters.remotes.includes(job.remoteType));
  }, [jobs, filters]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'salaire') return parseFloat(b.salary) - parseFloat(a.salary);
      return 0;
    });
  }, [filteredJobs, sortBy]);

  return (
    <div className="job-list">
      <h2>Les jobs</h2>

      <div className="filters">
        <FilterGroup title="Poste" options={TITLES} selected={filters.titles} onChange={val => handleFilterChange('titles', val)} />
        <FilterGroup title="Contrat" options={CONTRACTS} selected={filters.contracts} onChange={val => handleFilterChange('contracts', val)} />
        <FilterGroup title="Télétravail" options={REMOTES} selected={filters.remotes} onChange={val => handleFilterChange('remotes', val)} />
      </div>

      <div className="sort">
        Trier par :
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="salaire">Salaire</option>
        </select>
      </div>

      <ul className="job-cards">
        {sortedJobs.map((job, index) => (
            <JobCard key={index} job={job} onEdit={job => console.log('Éditer', job)} />
        ))}
      </ul>
    </div>
  );
}

function FilterGroup({ title, options, selected, onChange }) {
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function daysSince(dateString) {
  const date = new Date(dateString);
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default JobList;
