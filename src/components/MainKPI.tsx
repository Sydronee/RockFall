import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MainKPI: React.FC = () => {
  const stabilityIndex = 88;
  const status = "Stable";

  return (
    <div className="main-kpi">
      <div className="kpi-header">
        <h3>Overall Mine Stability Index</h3>
      </div>
      
      <div className="kpi-gauge-container">
        <div className="gauge-wrapper">
          <CircularProgressbar
            value={stabilityIndex}
            text={`${stabilityIndex}%`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: 'round',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: stabilityIndex >= 80 ? '#00FF88' : stabilityIndex >= 60 ? '#FFA500' : '#FF4136',
              textColor: '#ffffff',
              trailColor: '#1a1a1a',
              backgroundColor: '#00FFFF',
            })}
          />
        </div>
        
        <div className="gauge-indicators">
          <div className="indicator-ring"></div>
          <div className="pulse-ring"></div>
        </div>
      </div>
      
      <div className="kpi-status">
        <div className="status-main">
          <span className="status-label">Status:</span>
          <span className={`status-value status-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        
        <div className="status-details">
          <p>No critical alerts.</p>
          <div className="status-metrics">
            <div className="metric">
              <span className="metric-label">Last Analysis:</span>
              <span className="metric-value">52 seconds ago</span>
            </div>
            <div className="metric">
              <span className="metric-label">Trend:</span>
              <span className="metric-value trending-stable">Stable ↔</span>
            </div>
            <div className="metric">
              <span className="metric-label">Confidence:</span>
              <span className="metric-value">94%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="kpi-breakdown">
        <h4>Stability Factors</h4>
        <div className="factor-bars">
          <div className="factor">
            <span className="factor-name">Ground Movement</span>
            <div className="factor-bar">
              <div className="factor-fill" style={{ width: '92%', backgroundColor: '#00FF88' }}></div>
            </div>
            <span className="factor-value">92%</span>
          </div>
          <div className="factor">
            <span className="factor-name">Structural Integrity</span>
            <div className="factor-bar">
              <div className="factor-fill" style={{ width: '89%', backgroundColor: '#00FF88' }}></div>
            </div>
            <span className="factor-value">89%</span>
          </div>
          <div className="factor">
            <span className="factor-name">Environmental</span>
            <div className="factor-bar">
              <div className="factor-fill" style={{ width: '83%', backgroundColor: '#00FF88' }}></div>
            </div>
            <span className="factor-value">83%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainKPI;
