import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./JobList.css";
import JobCard from "../JobCard/JobCard";
import Filters from "../Filter/Filter";
import Sort from "../Sort/Sort";
import JobModal from "../JobModal/JobModal";

const TITLES = [
  "Dev Backend",
  "Dev Fullstack",
  "Dev Frontend",
  "Project / Product Management",
];

const CONTRACTS = ["CDD", "CDI", "Stage"];

const REMOTES = [
  "Télétravail partiel",
  "Télétravail ponctuel",
  "Télétravail total",
  "Non spécifié",
];

const SORT_OPTIONS = ["date", "salaire"];

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    titles: [],
    contracts: [],
    remotes: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetch("http://localhost:3000/jobs/list")
      .then((res) => res.json())
      .then(setJobs)
      .catch((err) => console.error("Erreur chargement jobs:", err));
  }, []);

  const handleFilterChange = (category, updatedValues) => {
    setFilters((prev) => ({ ...prev, [category]: updatedValues }));
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          filters.titles.length === 0 ||
          filters.titles.includes(job.jobType?.toLowerCase())
      )
      .filter(
        (job) =>
          filters.contracts.length === 0 ||
          filters.contracts.includes(job.contractType?.toLowerCase())
      )
      .filter(
        (job) =>
          filters.remotes.length === 0 ||
          filters.remotes.includes(job.remoteType?.toLowerCase())
      );
  }, [jobs, filters]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "salaire")
        return parseFloat(b.salary) - parseFloat(a.salary);
      return 0;
    });
  }, [filteredJobs, sortBy]);

  return (
    <div className="job-list">
      <Link to="/stats" className="stats-link">
        Voir les statistiques 📊
      </Link>
      <button
        className="add-button"
        onClick={() => {
          setJobToEdit(null);
          setShowModal(true);
        }}
      >
        Ajouter une offre
      </button>

      <h2>Les jobs</h2>
      <div className="sort-filter-bar">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        <Sort sortBy={sortBy} onChange={setSortBy} />
      </div>

      {sortedJobs.length === 0 ? (
        <p>Aucune offre ne correspond aux filtres sélectionnés.</p>
      ) : (
        <ul className="job-cards">
          {sortedJobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onEdit={(job) => {
                setJobToEdit(job);
                setShowModal(true);
              }}
            />
          ))}
        </ul>
      )}

      <JobModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        jobToEdit={jobToEdit}
        onSave={async (jobData) => {
          if (jobData.deletedId) {
            setJobs((prev) => prev.filter((j) => j.id !== jobData.deletedId));
            return;
          }

          if (jobToEdit) {
            const res = await fetch(
              `http://localhost:3000/jobs/${jobToEdit.id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
              }
            );

            const updatedJob = await res.json();

            setJobs((prev) =>
              prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
            );
          } else {
            const res = await fetch("http://localhost:3000/jobs", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(jobData),
            });

            const createdJob = await res.json();
            setJobs((prev) => [...prev, createdJob]);
          }
        }}
      />
    </div>
  );
}

export default JobList;
