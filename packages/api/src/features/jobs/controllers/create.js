import { db } from '../../../../db/db';

export const create = async (req, res) => {
  const newJob = req.body;

  if (!newJob) {
    return res.status(400).json({ error: 'Aucune donnée envoyée' });
  }

  const lastId = db.data.jobs.length > 0 ? Math.max(...db.data.jobs.map(j => j.id || 0)) : 0;
  const jobWithId = {
    ...newJob,
    id: lastId + 1,
    createdAt: new Date().toISOString()
  };

  db.data.jobs.push(jobWithId);
  await db.write();

  res.status(201).json(jobWithId);
};
