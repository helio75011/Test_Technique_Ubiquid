import './JobCard.css';

function JobCard({ job, onEdit }) {
  const adaptedJob = {
    title: capitalize(job.jobType),
    company: job.companyName,
    city: job.location,
    contractType: job.contractType?.toUpperCase(),
    remoteType: mapRemote(job.remoteType),
    salary: formatSalary(job.salary),
    createdAt: job.createdAt
  };

  // ⬇️ EXTRACTION des champs
  const {
    title,
    company,
    city,
    contractType,
    remoteType,
    salary,
    createdAt
  } = adaptedJob;

  return (
    <div className="job-card">
      <div className="job-initial">{title?.[0] || '?'}</div>

      <div className="job-content">
        <div className="job-title-row">
          <h3 className="job-title">{title}</h3>
          {remoteType && (
            <span className="job-remote-tag">{remoteType}</span>
          )}
        </div>

        <p className="job-company-city">{company} – {city}</p>
        <p className="job-contract">{contractType}</p>

        <div className="job-footer">
          <span className="job-salary">Salaire {salary}k</span>
          <span className="job-date">il y a {daysSince(createdAt)} jours</span>
        </div>
      </div>

      <button className="job-edit-button" onClick={() => onEdit(job)}>
        Modifier
      </button>
    </div>
  );
}

// Utilitaires
function capitalize(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}

function mapRemote(value) {
  const dict = {
    partial: "Télétravail partiel",
    ponctual: "Télétravail ponctuel",
    total: "Télétravail total",
    unspecified: "Non spécifié"
  };
  return dict[value] || value;
}

function formatSalary(amount) {
  return (amount / 1000).toFixed(1); // 38681 → 38.7
}

function daysSince(dateString) {
  const date = new Date(dateString);
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default JobCard;
