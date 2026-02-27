import React from 'react';
import Header from './Header';
import DigitalTwin from './DigitalTwin';
import MainKPI from './MainKPI';
import PillarStatus from './PillarStatus';
import AlertTicker from './AlertTicker';

interface MissionControlDashboardProps {
  onZoneClick: (zoneId: string) => void;
  onMobileAccess: (workOrderId?: string) => void;
}

const MissionControlDashboard: React.FC<MissionControlDashboardProps> = ({ onZoneClick, onMobileAccess }) => {
  return (
    <div className="mission-control-dashboard">
      {/* Header */}
      <Header />
      
      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Left Sidebar - Main KPI */}
        <aside className="left-sidebar">
          <MainKPI />
          
          {/* Mobile Access Button */}
          <div className="mobile-access-card">
            <h3>Field Operations</h3>
            <button 
              className="mobile-access-btn"
              onClick={() => onMobileAccess('WO-C4-0916')}
            >
              📱 Open Mobile Work Order
            </button>
            <p className="mobile-description">
              Access field-optimized interface for tablet/mobile devices
            </p>
          </div>

          {/* Critical Alert Test Button */}
          <div className="critical-test-card">
            <h3>🚨 Critical Alert Test</h3>
            <button 
              className="critical-test-btn"
              onClick={() => onZoneClick('sector7g')}
            >
              ⚠️ Access Sector 7G - Overhang
            </button>
            <p className="critical-description">
              Test critical alert system (AI Confidence: 97.8%)
            </p>
          </div>
        </aside>
        
        {/* Center Panel - Digital Twin */}
        <main className="center-panel">
          <DigitalTwin onZoneClick={onZoneClick} />
        </main>
        
        {/* Right Sidebar - Pillar Status */}
        <aside className="right-sidebar">
          <PillarStatus />
        </aside>
      </div>
      
      {/* Footer - Alert Ticker */}
      <footer className="dashboard-footer">
        <AlertTicker />
      </footer>
      
      {/* Floating Mobile Access Button */}
      <button 
        className="floating-mobile-btn"
        onClick={() => onMobileAccess('WO-C4-0916')}
        title="Open Mobile Work Order (Press M)"
        aria-label="Open Mobile Work Order"
      >
        📱
      </button>
    </div>
  );
};

export default MissionControlDashboard;
