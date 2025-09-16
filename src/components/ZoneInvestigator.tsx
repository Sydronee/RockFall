import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import VisualEvidence from './VisualEvidence.tsx';
import DataAnalysis from './DataAnalysis.tsx';
import ActionPlan from './ActionPlan.tsx';

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

const ZoneInvestigator: React.FC<ZoneInvestigatorProps> = ({
  zoneId,
  onBack,
  onSimulateScenario
}) => {
  // State for critical alert management
  const [isCriticalAlert, setIsCriticalAlert] = useState(false);
  const [isAlertAcknowledged, setIsAlertAcknowledged] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Map zone IDs to zone data with new critical scenario
  const getZoneData = (id: string): ZoneData => {
    const zoneMap: Record<string, ZoneData> = {
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
      // Critical scenario - Sector 7G Overhang
      "sector7g": {
        name: "Sector 7G - Overhang",
        riskLevel: 98,
        aiConfidence: 97.8,
        minesite: "Ironstone Ridge Quarry",
        lastUpdate: "2025-09-16 14:35:00"
      }
    };
    return zoneMap[id] || { 
      name: "Unknown Zone", 
      riskLevel: 50, 
      aiConfidence: 70.0,
      minesite: "Ironstone Ridge Quarry",
      lastUpdate: "2025-09-16 14:30:00"
    };
  };

  const zoneData = getZoneData(zoneId);

  // Critical Alert Effect - triggers when AI confidence > 92.5%
  useEffect(() => {
    if (zoneData.aiConfidence > 92.5 && !isAlertAcknowledged) {
      setIsCriticalAlert(true);
      
      // Create audio using Web Audio API for cross-browser compatibility
      // Generate a synthesized alarm sound
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        
        // Set up repeating alarm
        const alarmInterval = setInterval(() => {
          if (isCriticalAlert && !isAlertAcknowledged) {
            const newOscillator = audioContext.createOscillator();
            const newGainNode = audioContext.createGain();
            
            newOscillator.connect(newGainNode);
            newGainNode.connect(audioContext.destination);
            
            newOscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            newOscillator.type = 'square';
            newGainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            
            newOscillator.start(audioContext.currentTime);
            newOscillator.stop(audioContext.currentTime + 0.2);
          } else {
            clearInterval(alarmInterval);
          }
        }, 1000);
        
        // Store interval reference for cleanup
        (audioRef as any).current = { interval: alarmInterval, context: audioContext };
      } catch (error) {
        console.warn('Audio not available:', error);
      }
    }
  }, [zoneData.aiConfidence, isCriticalAlert, isAlertAcknowledged]);

  // Function to acknowledge and silence the alarm
  const handleAcknowledgeAlert = () => {
    setIsCriticalAlert(false);
    setIsAlertAcknowledged(true);
    
    // Stop the audio
    if ((audioRef as any).current?.interval) {
      clearInterval((audioRef as any).current.interval);
    }
    if ((audioRef as any).current?.context) {
      (audioRef as any).current.context.close();
    }
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
          <ActionPlan onSimulateScenario={() => onSimulateScenario(zoneId)} />
        </div>
      </div>
    </div>
  );
};

export default ZoneInvestigator;
