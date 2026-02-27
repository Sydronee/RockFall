import React from 'react';
import { Eye, Activity, Cloud, Brain } from 'lucide-react';

interface PillarMetric {
  label: string;
  value: string;
}

interface PillarData {
  id: string;
  title: string;
  icon: React.ReactNode;
  metrics: [PillarMetric, PillarMetric];
  operationalPercent: number;
  status: 'good' | 'warning' | 'critical';
}

const pillarsData: PillarData[] = [
  {
    id: 'geospatial',
    title: 'Geospatial Eye',
    icon: <Eye size={24} />,
    metrics: [
      { label: 'Last Drone Scan', value: '16 Sep 2025, 14:00' },
      { label: 'New Anomalies Detected', value: '3' }
    ],
    operationalPercent: 98,
    status: 'good'
  },
  {
    id: 'vital-signs',
    title: 'Vital Signs Monitor',
    icon: <Activity size={24} />,
    metrics: [
      { label: 'Sensor Network', value: '498 / 500 Online' },
      { label: 'Max Displacement', value: '2.1mm (Zone B2)' }
    ],
    operationalPercent: 98,
    status: 'good'
  },
  {
    id: 'environmental',
    title: 'Environmental Trigger',
    icon: <Cloud size={24} />,
    metrics: [
      { label: 'Live Rainfall', value: '1.2 mm/hr' },
      { label: 'Seismic Activity', value: 'Minor (0.2 richter)' }
    ],
    operationalPercent: 98,
    status: 'good'
  },
  {
    id: 'fusion-brain',
    title: 'The Fusion Brain',
    icon: <Brain size={24} />,
    metrics: [
      { label: 'Last Analysis', value: '52 seconds ago' },
      { label: 'Prediction Model Confidence', value: '94%' }
    ],
    operationalPercent: 94,
    status: 'good'
  }
];

const PillarStatus: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#00FF88';
      case 'warning':
        return '#FFA500';
      case 'critical':
        return '#FF4136';
      default:
        return '#00FFFF';
    }
  };

  return (
    <div className="pillar-status">
      <div className="pillar-header">
        <h3>Four Pillars Status</h3>
        <div className="header-indicator">
          <div className="status-dot status-operational"></div>
          <span>All Systems Operational</span>
        </div>
      </div>
      
      <div className="pillars-container">
        {pillarsData.map((pillar, index) => (
          <div key={pillar.id} className={`pillar-card pillar-${index + 1}`}>
            <div className="pillar-header-section">
              <div 
                className="pillar-icon"
                style={{ color: getStatusColor(pillar.status) }}
              >
                {pillar.icon}
              </div>
              <h4 className="pillar-title">{pillar.title}</h4>
              <div 
                className="pillar-status-indicator"
                style={{ backgroundColor: getStatusColor(pillar.status) }}
              ></div>
            </div>
            
            <div className="pillar-data">
              {pillar.metrics.map((metric, i) => (
                <div key={i} className="data-line">
                  <span className="data-label">{metric.label}:</span>
                  <span className="data-value">{metric.value}</span>
                </div>
              ))}
            </div>
            
            <div className="pillar-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${pillar.operationalPercent}%`,
                    backgroundColor: getStatusColor(pillar.status)
                  }}
                ></div>
              </div>
              <span className="progress-label">
                {pillar.operationalPercent}% Operational
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pillars-summary">
        <div className="summary-metric">
          <span className="metric-number">498</span>
          <span className="metric-label">Active Sensors</span>
        </div>
        <div className="summary-metric">
          <span className="metric-number">52s</span>
          <span className="metric-label">Last Update</span>
        </div>
        <div className="summary-metric">
          <span className="metric-number">94%</span>
          <span className="metric-label">AI Confidence</span>
        </div>
      </div>
    </div>
  );
};

export default PillarStatus;
