import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/alerts")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(alert => ({
          id: alert.id,
          type: alert.anomalyType,
          timestamp: new Date(alert.timestamp).toLocaleString(),
          audioUrl: alert.audioUrl
        }));
        setAlerts(formatted);
      })
      .catch(err => console.error("Failed to fetch alerts", err));
  }, []);

  const totalAlerts = alerts.length;
  const latestAlert = alerts[alerts.length - 1]; // According to recent last due to simulate fetch order, if it was first then simply replace [alerts.length - 1] with [0]
  const uniqueTypes = [...new Set(alerts.map(a => a.type))];

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>Welcome to the Acoustic Guardian Dashboard!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Alerts</h2>
          <p>{totalAlerts}</p>
        </div>

        <div className="card">
          <h2>Most Recent</h2>
          {latestAlert ? (
            <>
              <p><strong>{latestAlert.type}</strong></p>
              <p>{latestAlert.timestamp}</p>
            </>
          ) : (
            <p>—</p>
          )}
        </div>

        <div className="card">
          <h2>Anomaly Types</h2>
          {uniqueTypes.length > 0 ? (
            <ul>
              {uniqueTypes.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          ) : (
            <p>—</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
