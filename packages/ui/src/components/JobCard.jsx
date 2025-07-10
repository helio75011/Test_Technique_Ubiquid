// import './JobCard.css';

function JobCard({ job, onEdit }) {
  const {
    title,
    company,
    city,
    contractType,
    remoteType,
    salary,
    createdAt,
  } = job;

  return (
    <div className="job-card">
      <div className="job-initial">{title?.[0] || '?'}</div>

      <div className="job-content">
        <div className="job-title-row">
          <h3 className="job-title">{title}</h3>
          {remoteType && (
            <span className="job-remote-tag">
              {remoteType}
            </span>
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

// Utilitaire de calcul "il y a X jours"
function daysSince(dateString) {
  const date = new Date(dateString);
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default JobCard;
