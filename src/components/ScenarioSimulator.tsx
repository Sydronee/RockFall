import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SimulationControls from './SimulationControls.tsx';
import SimulationOutput from './SimulationOutput.tsx';

interface ScenarioSimulatorProps {
  zoneId: string;
  onBack: () => void;
}

interface SimulationParameters {
  rainfall: number;
  seismic: number;
  rockBolts: boolean;
  dewatering: boolean;
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ zoneId, onBack }) => {
  const [simulationParams, setSimulationParams] = useState<SimulationParameters>({
    rainfall: 60,
    seismic: 0,
    rockBolts: false,
    dewatering: false
  });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  // Map zone IDs to zone data
  const getZoneData = (id: string) => {
    const zoneMap: Record<string, { name: string; initialStability: number }> = {
      zone1: { name: "Haul Road Sector 7", initialStability: 75 },
      zone2: { name: "North Face - Bench B2", initialStability: 65 },
      zone3: { name: "South Wall - Bench C4", initialStability: 65 },
    };
    return zoneMap[id] || { name: "Unknown Zone", initialStability: 50 };
  };

  const zoneData = getZoneData(zoneId);
  const zoneName = zoneData.name;

  const updateParameter = (key: keyof SimulationParameters, value: number | boolean) => {
    setSimulationParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSimulating(false);
    setHasSimulated(true);
  };

  const resetSimulation = () => {
    setSimulationParams({
      rainfall: 60,
      seismic: 0,
      rockBolts: false,
      dewatering: false
    });
    setHasSimulated(false);
    setIsSimulating(false);
  };

  return (
    <div className="scenario-simulator">
      {/* Header */}
      <header className="simulator-header">
        <div className="simulator-header-left">
          <button 
            className="back-button"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
            Back to Investigator
          </button>
        </div>
        
        <div className="simulator-header-center">
          <h1>Scenario Simulator: {zoneName}</h1>
        </div>
        
        <div className="simulator-header-right">
          {/* Optional status indicator */}
        </div>
      </header>

      {/* Main Content */}
      <div className="simulator-content">
        {/* Left Panel - Controls */}
        <div className="simulator-left">
          <SimulationControls
            parameters={simulationParams}
            isSimulating={isSimulating}
            onUpdateParameter={updateParameter}
            onRunSimulation={runSimulation}
            onReset={resetSimulation}
          />
        </div>

        {/* Right Panel - Output */}
        <div className="simulator-right">
          <SimulationOutput
            parameters={simulationParams}
            hasSimulated={hasSimulated}
            isSimulating={isSimulating}
            initialStability={zoneData.initialStability}
          />
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
