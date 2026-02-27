import React from 'react';

interface ZoneData {
  id: string;
  name: string;
  status: 'safe' | 'warning' | 'critical';
  position: { top: string; left: string };
}

interface DigitalTwinProps {
  onZoneClick: (zoneId: string) => void;
}

const zones: ZoneData[] = [
  {
    id: 'zone1',
    name: 'Haul Road Sector 7',
    status: 'safe',
    position: { top: '25%', left: '20%' }
  },
  {
    id: 'zone2',
    name: 'North Face - Bench B2',
    status: 'safe',
    position: { top: '40%', left: '60%' }
  },
  {
    id: 'zone3',
    name: 'South Wall - Bench C4',
    status: 'warning',
    position: { top: '70%', left: '35%' }
  },
  {
    id: 'sector7g',
    name: 'Sector 7G - Overhang',
    status: 'critical',
    position: { top: '15%', left: '75%' }
  }
];

const DigitalTwin: React.FC<DigitalTwinProps> = ({ onZoneClick }) => {
  const getZoneColor = (status: string) => {
    switch (status) {
      case 'safe':
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
    <div className="digital-twin">
      <div className="twin-header">
        <h3>3D Digital Twin - Mine Overview</h3>
        <div className="twin-controls">
          <button className="control-btn">Rotate</button>
          <button className="control-btn">Zoom</button>
          <button className="control-btn">Layers</button>
        </div>
      </div>
      
      <div className="twin-viewport">
        {/* Placeholder for 3D scene - would be React Three Fiber scene */}
        <div className="mine-representation">
          <div className="mine-background">
            <div className="terrain-layer"></div>
            <div className="pit-structure">
              <div className="bench bench-1"></div>
              <div className="bench bench-2"></div>
              <div className="bench bench-3"></div>
              <div className="bench bench-4"></div>
            </div>
            <div className="haul-roads">
              <div className="road road-1"></div>
              <div className="road road-2"></div>
            </div>
          </div>
          
          {/* Zone overlays */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="zone-marker"
              role="button"
              tabIndex={0}
              aria-label={`${zone.name} - Status: ${zone.status}`}
              style={{
                top: zone.position.top,
                left: zone.position.left,
                backgroundColor: getZoneColor(zone.status),
                boxShadow: `0 0 20px ${getZoneColor(zone.status)}40`
              }}
              onClick={() => onZoneClick(zone.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onZoneClick(zone.id); } }}
            >
              <div className="zone-pulse"></div>
              <div className="zone-label">
                <span className="zone-name">{zone.name}</span>
                <span className="zone-status">{zone.status.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="twin-overlay">
          <div className="view-controls">
            <div className="compass">
              <div className="compass-needle"></div>
              <span>N</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="twin-footer">
        <div className="view-info">
          <span>View: Aerial Overview | Scale: 1:2500 | Last Updated: 52s ago</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
