import React, { useEffect, useState, useRef } from 'react';
import AlertCard from '../components/AlertCard';
import NotificationBanner from '../components/NotificationBanner';

// 👇 Change this to your Laptop 2's IP address
const BACKEND_URL = "http://192.168.239.1:8080";//experiment this with putting new ip url

function AnomalyLogs() {
  const [alerts, setAlerts] = useState([]);
  const [notification, setNotification] = useState(null);
  const lastAlertCountRef = useRef(0); // ✅ NEW: Track alert count to detect external device alerts

  useEffect(() => {
    // ✅ NEW: Move fetchAlertsWithNotification INSIDE useEffect to fix ESLint warning
    const fetchAlertsWithNotification = () => {
      fetch(`${BACKEND_URL}/api/alerts`)  // ✅ updated
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map(alert => ({
            id: alert.id,
            type: alert.anomalyType,
            timestamp: new Date(alert.timestamp).toLocaleString(),
            //audioUrl: alert.audioUrl //change it so it uses both local source and backend url sources too
            audioUrl: alert.audioUrl ? `${alert.audioUrl.startsWith('http') ? '' : BACKEND_URL}${alert.audioUrl}` : null,
          }));

          // ✅ NEW: Check if we have new alerts from external devices (TI AM64x board)
          if (formatted.length > lastAlertCountRef.current) {
            const newAlertsCount = formatted.length - lastAlertCountRef.current;
            const latestAlert = formatted[0]; // Most recent alert (assuming sorted by timestamp desc)
            
            console.log(`🔔 ${newAlertsCount} new external alert(s) detected from edge device`);
            showNotification(`🚨 ${latestAlert.type} detected by edge device!`);
          }

          setAlerts(formatted);
          lastAlertCountRef.current = formatted.length; // ✅ NEW: Update count for next comparison
        })
        .catch((err) => console.error("Failed to load alerts:", err));
    };

    fetchAlerts(); // Initial fetch on component mount
    
    // ✅ NEW: Poll for external alerts every 3 seconds to detect TI AM64x alerts
    const pollInterval = setInterval(() => {
      fetchAlertsWithNotification();
    }, 3000);

    return () => clearInterval(pollInterval); // Cleanup interval on unmount
  }, []); // ✅ Empty dependency array is now correct (no ESLint warning)

  const fetchAlerts = () => {
    fetch(`${BACKEND_URL}/api/alerts`)  // ✅ updated
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map(alert => ({
          id: alert.id,
          type: alert.anomalyType,
          timestamp: new Date(alert.timestamp).toLocaleString(),
          //audioUrl: alert.audioUrl //change it so it uses both local source and backend url sources too
          audioUrl: alert.audioUrl ? `${alert.audioUrl.startsWith('http') ? '' : BACKEND_URL}${alert.audioUrl}` : null,
        }));
        setAlerts(formatted);
        lastAlertCountRef.current = formatted.length; // ✅ NEW: Update count after regular fetch
      })
      .catch((err) => console.error("Failed to load alerts:", err));
  };

  const simulateNewAlert = () => {
    const sampleTypes = [
      { type: "Glass Break", audio: "glass_break.mp3" },
      { type: "Screaming-sound", audio: "screaming-sound.mp3" }
    ];
    const random = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];

    const newAlert = {
      anomalyType: random.type,
      timestamp: new Date().toISOString(),
      audioUrl: `${BACKEND_URL}/audio/${random.audio}`  // ✅ updated
    };

    fetch(`${BACKEND_URL}/api/alerts`, {  // ✅ updated
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAlert)
    })
      .then((res) => res.json())
      .then(() => {
        fetchAlerts();
        showNotification(`📱 ${random.type} simulated alert⚠️`); // ✅ UPDATED: Different icon for simulated vs external
      })
      .catch((err) => console.error("Failed to post alert:", err));
  };

  const deleteAlert = (id) => {
    fetch(`${BACKEND_URL}/api/alerts/${id}`, {  // ✅ updated
      method: "DELETE"
    })
      .then(() => {
        setAlerts(alerts.filter(alert => alert.id !== id));
        lastAlertCountRef.current = alerts.length - 1; // ✅ NEW: Update count after delete to prevent false notifications
      })
      .catch((err) => console.error("Failed to delete alert:", err));
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="page-content">
      <h1>Sound Anomalies</h1>

      <button
        onClick={simulateNewAlert}
        style={{
          marginBottom: '20px',
          backgroundColor: '#03a9f4',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Simulate Alert
      </button>

      {notification && (
        <NotificationBanner message={notification} onClose={() => setNotification(null)} />
      )}

      {alerts.length === 0 ? (
        <p>No alerts found.</p>
      ) : (
        alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            id={alert.id}
            type={alert.type}
            timestamp={alert.timestamp}
            audioUrl={alert.audioUrl}
            onDelete={() => deleteAlert(alert.id)}
          />
        ))
      )}
    </div>
  );
}

export default AnomalyLogs;
