import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaWaveSquare, FaChartBar, FaInfoCircle } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">🔊Acoustic<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Guardian</h2>
      <nav>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/"><FaHome /> Dashboard</Link>
          </li>
          <li className={location.pathname === '/logs' ? 'active' : ''}>
            <Link to="/logs"><FaWaveSquare /> Anomaly Logs</Link>
          </li>
          <li className={location.pathname === '/statistics' ? 'active' : ''}>
            <Link to="/statistics"><FaChartBar /> Statistics</Link>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about"><FaInfoCircle /> About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
