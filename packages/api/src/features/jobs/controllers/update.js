import { db } from '../../../../db/db.js';

export const update = async (req, res) => {
  const jobId = parseInt(req.params.id);
  const updatedJob = req.body;

  if (!jobId || !updatedJob) {
    return res.status(400).json({ error: 'ID ou données manquantes' });
  }

  const index = db.data.jobs.findIndex(job => job.id === jobId);

  if (index === -1) {
    return res.status(404).json({ error: 'Offre non trouvée' });
  }

  db.data.jobs[index] = {
    ...db.data.jobs[index],
    ...updatedJob,
    id: jobId,
  };

  await db.write();

  res.json(db.data.jobs[index]);
};
