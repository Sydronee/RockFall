import React from 'react';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

interface SimulationParameters {
  rainfall: number;
  seismic: number;
  rockBolts: boolean;
  dewatering: boolean;
}

interface SimulationOutputProps {
  parameters: SimulationParameters;
  hasSimulated: boolean;
  isSimulating: boolean;
  initialStability: number;
}

const SimulationOutput: React.FC<SimulationOutputProps> = ({
  parameters,
  hasSimulated,
  isSimulating,
  initialStability
}) => {
  // Calculate simulation results based on parameters
  const calculateResults = () => {
    if (!hasSimulated) {
      return {
        stabilityIndex: initialStability,
        failureProbability: 'Low',
        failurePercentage: 15
      };
    }

    let stabilityImpact = 0;
    let failureImpact = 0;

    // Environmental impacts (negative)
    stabilityImpact -= parameters.rainfall * 0.4; // Heavy rain reduces stability
    stabilityImpact -= parameters.seismic * 8; // Seismic events reduce stability significantly
    failureImpact += parameters.rainfall * 0.8;
    failureImpact += parameters.seismic * 16;

    // Mitigation benefits (positive)
    if (parameters.rockBolts) {
      stabilityImpact += 15; // Rock bolts improve stability
      failureImpact -= 20;
    }
    if (parameters.dewatering) {
      stabilityImpact += 10; // Dewatering improves stability
      failureImpact -= 15;
    }

    const finalStability = Math.max(5, Math.min(100, initialStability + stabilityImpact));
    const finalFailurePercentage = Math.max(5, Math.min(95, 15 + failureImpact));
    
    let failureProbability = 'Low';
    if (finalFailurePercentage > 70) failureProbability = 'HIGH';
    else if (finalFailurePercentage > 40) failureProbability = 'Medium';

    return {
      stabilityIndex: Math.round(finalStability),
      failureProbability,
      failurePercentage: Math.round(finalFailurePercentage)
    };
  };

  const results = calculateResults();

  const getStabilityStatus = (stability: number) => {
    if (stability >= 70) return { label: 'STABLE', color: '#00FF88' };
    if (stability >= 40) return { label: 'WARNING', color: '#FFA500' };
    return { label: 'CRITICAL', color: '#FF4136' };
  };

  const getFailureStatus = (probability: string) => {
    if (probability === 'HIGH') return { color: '#FF4136' };
    if (probability === 'Medium') return { color: '#FFA500' };
    return { color: '#00FF88' };
  };

  const stabilityStatus = getStabilityStatus(results.stabilityIndex);
  const failureStatus = getFailureStatus(results.failureProbability);

  return (
    <div className="simulation-output">
      {/* KPI Cards */}
      <div className="output-kpis">
        <div className="kpi-card stability-card">
          <div className="kpi-header">
            <Shield size={20} />
            <h4>Predicted Stability Index</h4>
          </div>
          <div className="kpi-value" style={{ color: stabilityStatus.color }}>
            {results.stabilityIndex}%
          </div>
          <div className="kpi-status" style={{ color: stabilityStatus.color }}>
            {stabilityStatus.label}
          </div>
        </div>

        <div className="kpi-card failure-card">
          <div className="kpi-header">
            <AlertTriangle size={20} />
            <h4>Probability of Failure</h4>
          </div>
          <div className="kpi-value" style={{ color: failureStatus.color }}>
            {results.failurePercentage}%
          </div>
          <div className="kpi-status" style={{ color: failureStatus.color }}>
            {results.failureProbability.toUpperCase()}
          </div>
        </div>
      </div>

      {/* 3D Model Visualization */}
      <div className="model-container">
        <div className="model-header">
          <h4>Zone Model Visualization</h4>
          {isSimulating && (
            <div className="simulation-status">
              <Activity size={16} className="pulse" />
              Processing simulation...
            </div>
          )}
        </div>
        
        <div className="model-viewport">
          {/* 3D Model Placeholder */}
          <div className={`zone-model ${hasSimulated ? 'simulated' : 'initial'}`}>
            {/* Rock Face Representation */}
            <div className="rock-face-3d">
              <div className="face-geometry">
                {/* Benches */}
                <div className="bench-level bench-1"></div>
                <div className="bench-level bench-2"></div>
                <div className="bench-level bench-3"></div>
                
                {/* Stress visualization overlay */}
                {hasSimulated && results.stabilityIndex < 40 && (
                  <div className="stress-overlay">
                    <div className="stress-zone high-stress"></div>
                    <div className="stress-zone medium-stress"></div>
                    <div className="stress-zone low-stress"></div>
                  </div>
                )}
                
                {/* Mitigation overlays */}
                {parameters.rockBolts && (
                  <div className="mitigation-overlay rock-bolts">
                    <div className="bolt bolt-1"></div>
                    <div className="bolt bolt-2"></div>
                    <div className="bolt bolt-3"></div>
                    <div className="bolt bolt-4"></div>
                  </div>
                )}
                
                {parameters.dewatering && (
                  <div className="mitigation-overlay dewatering">
                    <div className="drain-point point-1"></div>
                    <div className="drain-point point-2"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Model Status Text */}
            <div className="model-status">
              {!hasSimulated ? (
                <p>Current state visualization. Run simulation to see projected changes.</p>
              ) : (
                <p>
                  {results.stabilityIndex < 40 
                    ? "Red heatmap overlay indicates high-stress areas after simulation."
                    : "Simulation shows improved stability with applied mitigations."
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Summary */}
      {hasSimulated && (
        <div className="simulation-summary">
          <h5>Simulation Results Summary</h5>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Environmental Impact:</span>
              <span className="summary-value">
                {parameters.rainfall > 50 || parameters.seismic > 2 ? 'High' : 'Low'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Mitigations Applied:</span>
              <span className="summary-value">
                {(parameters.rockBolts ? 1 : 0) + (parameters.dewatering ? 1 : 0)} of 2
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Stability Change:</span>
              <span className={`summary-value ${results.stabilityIndex >= initialStability ? 'positive' : 'negative'}`}>
                {results.stabilityIndex >= initialStability ? '+' : ''}{results.stabilityIndex - initialStability}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationOutput;
