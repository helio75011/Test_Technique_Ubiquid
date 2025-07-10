import { useEffect, useState } from 'react';
import './Stats.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/jobs/stats')
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <p>Chargement des statistiques...</p>;

  const cityData = Object.entries(stats.offersPerCity).map(([city, count]) => ({
    name: city,
    value: count,
  }));

  return (
    <div className="stats">
      <h2>📊 Statistiques des offres</h2>
      <p><strong>Salaire moyen :</strong> {stats.averageSalary} €</p>
      <p><strong>Contrat le plus courant :</strong> {stats.mostCommonContractType.toUpperCase()}</p>
      <p><strong>Poste le plus proposé :</strong> {stats.mostCommonJobTitle}</p>

      <h3>Offres par ville</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cityData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#5d3dfd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

