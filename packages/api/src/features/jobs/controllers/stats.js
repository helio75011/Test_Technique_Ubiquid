import { db } from '../../../../db/db.js';

export const stats = async (req, res) => {
  const jobs = db.data.jobs;

  if (!jobs || jobs.length === 0) {
    return res.status(200).json({
      averageSalary: 0,
      mostCommonContractType: null,
      mostCommonJobTitle: null,
      offersPerCity: {}
    });
  }

  const averageSalary = Math.round(
    jobs.reduce((sum, job) => sum + Number(job.salary || 0), 0) / jobs.length
  );

  const countBy = (key) =>
    jobs.reduce((acc, job) => {
      const value = job[key];
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {});

  const mostCommon = (counts) =>
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const contractCounts = countBy('contractType');
  const jobTypeCounts = countBy('jobType');
  const cityCounts = countBy('location');

  res.json({
    averageSalary,
    mostCommonContractType: mostCommon(contractCounts),
    mostCommonJobTitle: mostCommon(jobTypeCounts),
    offersPerCity: cityCounts
  });
};
