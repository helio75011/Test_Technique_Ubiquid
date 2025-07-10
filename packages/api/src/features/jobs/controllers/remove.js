import { db } from '../../../../db/db.js';

export const remove = async (req, res) => {
  const jobId = parseInt(req.params.id);

  if (!jobId) {
    return res.status(400).json({ error: 'ID manquant ou invalide' });
  }

  const index = db.data.jobs.findIndex(job => job.id === jobId);

  if (index === -1) {
    return res.status(404).json({ error: 'Offre non trouvée' });
  }

  db.data.jobs.splice(index, 1);
  await db.write();

  res.status(204).send();
};
