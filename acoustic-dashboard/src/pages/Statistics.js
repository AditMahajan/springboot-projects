import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Statistics() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        // Count occurrences of each type
        const typeCounts = {};
        data.forEach(alert => {
          const type = alert.anomalyType;
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        // Convert to chart format
        const formattedData = Object.entries(typeCounts).map(([type, count]) => ({
          name: type,
          value: count
        }));

        setChartData(formattedData);
      })
      .catch((err) => console.error("Failed to fetch alerts:", err));
  }, []);

  const COLORS = ['#03a9f4', '#e91e63', '#ff9800', '#4caf50'];

  return (
    <div className="page-content">
      <h1>Statistics</h1>
      <p>Analytics and graphs of anomaly data</p>

      {chartData.length === 0 ? (
        <p>No data available for chart.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Statistics;
