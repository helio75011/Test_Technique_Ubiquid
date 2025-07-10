import { useEffect, useState } from "react";
import "./JobModal.css";

export default function JobModal({ isOpen, onClose, onSave, jobToEdit }) {
  const [form, setForm] = useState({
    companyName: "",
    jobType: "",
    contractType: "",
    remoteType: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    if (jobToEdit) {
      setForm(jobToEdit);
    } else {
      setForm({
        companyName: "",
        jobType: "",
        contractType: "",
        remoteType: "",
        location: "",
        salary: "",
      });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      salary: parseFloat(form.salary), // ← transforme "43000" → 43000
    };
    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{jobToEdit ? "Modifier" : "Ajouter"} une offre</h3>

        <label>
          Intitulé du poste
          <input name="jobType" value={form.jobType} onChange={handleChange} />
        </label>

        <label>
          Entreprise
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />
        </label>

        <label>
          Ville
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Type de contrat
          <select
            name="contractType"
            value={form.contractType}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner --</option>
            <option value="cdi">CDI</option>
            <option value="cdd">CDD</option>
            <option value="stage">Stage</option>
          </select>
        </label>

        <label>
          Télétravail
          <select
            name="remoteType"
            value={form.remoteType}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner --</option>
            <option value="partial">Télétravail partiel</option>
            <option value="ponctual">Télétravail ponctuel</option>
            <option value="total">Télétravail total</option>
            <option value="unspecified">Non spécifié</option>
          </select>
        </label>

        <label>
          Salaire (en K€)
          <input
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
          />
        </label>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="save">
            Enregistrer
          </button>
          <button onClick={onClose} className="cancel">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
