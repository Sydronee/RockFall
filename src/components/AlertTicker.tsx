import React, { useState, useEffect } from 'react';

interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  message: string;
}

const alertsData: Alert[] = [
  {
    id: '1',
    severity: 'warning',
    timestamp: '16:42',
    message: 'Zone C4 - Pore pressure approaching threshold (65% risk)'
  },
  {
    id: '2',
    severity: 'info',
    timestamp: '15:45',
    message: 'Routine drone scan of North Face complete'
  },
  {
    id: '3',
    severity: 'info',
    timestamp: '15:10',
    message: 'Sensor #241-T back online'
  },
  {
    id: '4',
    severity: 'info',
    timestamp: '14:55',
    message: 'Weather station data updated - Clear conditions expected'
  },
  {
    id: '5',
    severity: 'warning',
    timestamp: '14:30',
    message: 'Bench B2 - Minor ground movement detected (2.1mm displacement)'
  }
];

const AlertTicker: React.FC = () => {
  const [currentAlerts, setCurrentAlerts] = useState(alertsData);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    console.log('AlertTicker mounted, isAnimating:', isAnimating);
    
    // Simulate new alerts being added periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance to add new alert
        const alertMessages = [
          `Zone ${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 5) + 1} - Routine sensor check complete`,
          `Automated drilling analysis complete for Sector ${Math.floor(Math.random() * 10) + 1}`,
          `Weather update: Wind conditions ${Math.random() > 0.5 ? 'optimal' : 'moderate'} for operations`,
          `Equipment status update: All systems operational in Zone ${Math.floor(Math.random() * 8) + 1}`,
          `Safety perimeter check completed - No issues detected`,
          `Vibration monitoring normal across all active zones`
        ];
        
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          severity: Math.random() > 0.85 ? 'warning' : 'info',
          timestamp: new Date().toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)]
        };
        
        console.log('Adding new alert:', newAlert);
        setCurrentAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 8000); // Every 8 seconds for testing

    return () => {
      console.log('AlertTicker unmounting');
      clearInterval(interval);
    };
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FF4136';
      case 'warning':
        return '#FFA500';
      case 'info':
        return '#00FFFF';
      default:
        return '#00FFFF';
    }
  };

  const getSeverityLabel = (severity: string) => {
    return severity.toUpperCase();
  };

  const toggleAnimation = () => {
    console.log('Toggling animation from', isAnimating, 'to', !isAnimating);
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="alert-ticker">
      <div className="ticker-header">
        <div className="ticker-title">
          <span className="ticker-icon">🚨</span>
          <span>Live Alert Feed</span>
        </div>
        <div className="ticker-controls">
          <button 
            className={`control-btn ${isAnimating ? 'active' : ''}`}
            onClick={toggleAnimation}
          >
            {isAnimating ? '⏸️' : '▶️'}
          </button>
          <div className="alert-count">
            {currentAlerts.length} alerts
          </div>
        </div>
      </div>
      
      <div className="ticker-container">
        <div className={`ticker-content ${isAnimating ? 'scrolling' : 'paused'}`}>
          {/* Duplicate the alerts for continuous scrolling */}
          {[...currentAlerts, ...currentAlerts, ...currentAlerts].map((alert, index) => (
            <div key={`${alert.id}-${index}`} className="alert-item">
              <span 
                className="alert-severity"
                style={{ 
                  backgroundColor: getSeverityColor(alert.severity),
                  color: alert.severity === 'info' ? '#000' : '#fff'
                }}
              >
                {getSeverityLabel(alert.severity)}
              </span>
              <span className="alert-timestamp">{alert.timestamp}:</span>
              <span className="alert-message">{alert.message}</span>
              <span className="alert-separator">•</span>
            </div>
          ))}
        </div>
        
        {/* Debug overlay to show animation state */}
        <div className="animation-debug">
          Animation: {isAnimating ? 'ON' : 'OFF'} | Alerts: {currentAlerts.length}
        </div>
      </div>
      
      <div className="ticker-footer">
        <div className="system-status">
          <div className="status-indicator status-online"></div>
          <span>Alert System: Online</span>
        </div>
        <div className="last-update">
          Last updated: Just now
        </div>
      </div>
    </div>
  );
};

export default AlertTicker;
