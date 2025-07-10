import { useEffect, useState } from 'react';
import './JobModal.css';

export default function JobModal({ isOpen, onClose, onSave, jobToEdit }) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    city: '',
    contractType: '',
    remoteType: '',
    salary: '',
  });

  useEffect(() => {
    if (jobToEdit) {
      setForm(jobToEdit);
    } else {
      setForm({
        title: '',
        company: '',
        city: '',
        contractType: '',
        remoteType: '',
        salary: '',
      });
    }
  }, [jobToEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{jobToEdit ? 'Modifier' : 'Ajouter'} une offre</h3>

        <label>
          Intitulé du poste
          <input name="title" value={form.title} onChange={handleChange} />
        </label>

        <label>
          Entreprise
          <input name="company" value={form.company} onChange={handleChange} />
        </label>

        <label>
          Ville
          <input name="city" value={form.city} onChange={handleChange} />
        </label>

        <label>
          Type de contrat
          <select name="contractType" value={form.contractType} onChange={handleChange}>
            <option value="">-- Sélectionner --</option>
            <option>CDI</option>
            <option>CDD</option>
            <option>Stage</option>
          </select>
        </label>

        <label>
          Télétravail
          <select name="remoteType" value={form.remoteType} onChange={handleChange}>
            <option value="">-- Sélectionner --</option>
            <option>Télétravail partiel</option>
            <option>Télétravail ponctuel</option>
            <option>Télétravail total</option>
            <option>Non spécifié</option>
          </select>
        </label>

        <label>
          Salaire (en K€)
          <input name="salary" value={form.salary} onChange={handleChange} />
        </label>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="save">Enregistrer</button>
          <button onClick={onClose} className="cancel">Annuler</button>
        </div>
      </div>
    </div>
  );
}
