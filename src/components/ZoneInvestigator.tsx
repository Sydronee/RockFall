import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import VisualEvidence from './VisualEvidence';
import DataAnalysis from './DataAnalysis';
import ActionPlan from './ActionPlan';

interface ZoneInvestigatorProps {
  zoneId: string;
  onBack: () => void;
  onSimulateScenario: (zoneId: string) => void;
}

interface ZoneData {
  name: string;
  riskLevel: number;
  aiConfidence: number;
  minesite: string;
  lastUpdate: string;
}

// Zone data lookup - defined outside component to avoid re-creation on each render
const zoneDataMap: Record<string, ZoneData> = {
  zone1: { 
    name: "Haul Road Sector 7", 
    riskLevel: 25, 
    aiConfidence: 78.5,
    minesite: "Ironstone Ridge Quarry",
    lastUpdate: "2025-09-16 14:32:00"
  },
  zone2: { 
    name: "North Face - Bench B2", 
    riskLevel: 35, 
    aiConfidence: 82.1,
    minesite: "Ironstone Ridge Quarry",
    lastUpdate: "2025-09-16 14:28:00"
  },
  zone3: { 
    name: "South Wall - Bench C4", 
    riskLevel: 65, 
    aiConfidence: 89.3,
    minesite: "Ironstone Ridge Quarry",
    lastUpdate: "2025-09-16 14:25:00"
  },
  sector7g: {
    name: "Sector 7G - Overhang",
    riskLevel: 98,
    aiConfidence: 97.8,
    minesite: "Ironstone Ridge Quarry",
    lastUpdate: "2025-09-16 14:35:00"
  }
};

const defaultZoneData: ZoneData = { 
  name: "Unknown Zone", 
  riskLevel: 50, 
  aiConfidence: 70.0,
  minesite: "Ironstone Ridge Quarry",
  lastUpdate: "2025-09-16 14:30:00"
};

const ZoneInvestigator: React.FC<ZoneInvestigatorProps> = ({
  zoneId,
  onBack,
  onSimulateScenario
}) => {
  // State for critical alert management
  const [isCriticalAlert, setIsCriticalAlert] = useState(false);
  const [isAlertAcknowledged, setIsAlertAcknowledged] = useState(false);

  const zoneData = zoneDataMap[zoneId] || defaultZoneData;

  // Critical Alert Effect - triggers when AI confidence > 92.5%
  useEffect(() => {
    if (zoneData.aiConfidence <= 92.5 || isAlertAcknowledged) {
      return;
    }

    setIsCriticalAlert(true);

    let alarmInterval: ReturnType<typeof setInterval> | null = null;
    let audioContext: AudioContext | null = null;

    try {
      audioContext = new AudioContext();

      const playBeep = () => {
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(800, audioContext.currentTime);
        osc.type = 'square';
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.2);
      };

      playBeep();
      alarmInterval = setInterval(playBeep, 1000);
    } catch (error) {
      console.warn('Audio not available:', error);
    }

    return () => {
      if (alarmInterval) clearInterval(alarmInterval);
      if (audioContext) audioContext.close();
    };
  }, [zoneData.aiConfidence, isAlertAcknowledged]);

  // Function to acknowledge and silence the alarm
  const handleAcknowledgeAlert = () => {
    setIsCriticalAlert(false);
    setIsAlertAcknowledged(true);
  };
  const zoneName = zoneData.name;
  const riskLevel = zoneData.riskLevel;

  const getRiskStatus = (risk: number) => {
    if (risk >= 70) return { label: 'CRITICAL', color: '#FF4136' };
    if (risk >= 50) return { label: 'WARNING', color: '#FFA500' };
    return { label: 'STABLE', color: '#00FF88' };
  };

  const riskStatus = getRiskStatus(riskLevel);

  return (
    <div className="zone-investigator">
      {/* Critical Alert Modal Overlay */}
      {isCriticalAlert && (
        <div className="critical-alert-overlay">
          <div className="critical-alert-modal">
            <div className="alert-icon">
              <AlertTriangle size={64} />
            </div>
            <h1 className="alert-title">CRITICAL ALERT: IMMINENT ROCKFALL DETECTED</h1>
            <div className="alert-details">
              <div className="alert-detail-row">
                <span className="alert-label">Location:</span>
                <span className="alert-value">{zoneData.name}</span>
              </div>
              <div className="alert-detail-row">
                <span className="alert-label">AI Confidence:</span>
                <span className="alert-value">{zoneData.aiConfidence}%</span>
              </div>
              <div className="alert-detail-row">
                <span className="alert-label">Minesite:</span>
                <span className="alert-value">{zoneData.minesite}</span>
              </div>
            </div>
            <div className="alert-action">
              <p className="alert-prescription">
                IMMEDIATE EVACUATION REQUIRED. ESTABLISH 200m EXCLUSION ZONE.
              </p>
              <button 
                className="acknowledge-button"
                onClick={handleAcknowledgeAlert}
              >
                Acknowledge & Silence Alarm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="zone-header">
        <div className="zone-header-left">
          <button 
            className="back-button"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
        
        <div className="zone-header-center">
          <h1>Zone Investigator: {zoneName}</h1>
          <div className="zone-subtitle">
            {zoneData.minesite} | AI Confidence: {zoneData.aiConfidence}%
          </div>
        </div>
        
        <div className="zone-header-right">
          <div className="risk-badge">
            <span className="risk-label">CURRENT RISK:</span>
            <span 
              className="risk-value"
              style={{ color: riskStatus.color }}
            >
              {riskLevel}% ({riskStatus.label})
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content Grid */}
      <div className="zone-content">
        {/* Left Column - Visual Evidence */}
        <div className="zone-column zone-left">
          <VisualEvidence />
        </div>
        
        {/* Middle Column - Data Analysis */}
        <div className="zone-column zone-middle">
          <DataAnalysis />
        </div>
        
        {/* Right Column - Action Plan */}
        <div className="zone-column zone-right">
          <ActionPlan
            aiConfidence={zoneData.aiConfidence}
            riskLevel={zoneData.riskLevel}
            onSimulateScenario={() => onSimulateScenario(zoneId)}
          />
        </div>
      </div>
    </div>
  );
};

export default ZoneInvestigator;
