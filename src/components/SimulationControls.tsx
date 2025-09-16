import React from 'react';
import { Play, RotateCcw, Cloud, Zap } from 'lucide-react';

interface SimulationParameters {
  rainfall: number;
  seismic: number;
  rockBolts: boolean;
  dewatering: boolean;
}

interface SimulationControlsProps {
  parameters: SimulationParameters;
  isSimulating: boolean;
  onUpdateParameter: (key: keyof SimulationParameters, value: number | boolean) => void;
  onRunSimulation: () => void;
  onReset: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  parameters,
  isSimulating,
  onUpdateParameter,
  onRunSimulation,
  onReset
}) => {
  return (
    <div className="simulation-controls">
      <div className="controls-card">
        <div className="card-header">
          <h3>Simulation Parameters</h3>
        </div>
        
        <div className="controls-content">
          {/* Environmental Triggers Section */}
          <div className="control-section">
            <h4>Environmental Triggers</h4>
            
            {/* Rainfall Slider */}
            <div className="control-group">
              <div className="control-label">
                <Cloud size={16} />
                <span>Simulate Heavy Rainfall (mm/hr)</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={parameters.rainfall}
                  onChange={(e) => onUpdateParameter('rainfall', Number(e.target.value))}
                  className="slider rainfall-slider"
                  disabled={isSimulating}
                />
                <div className="slider-value">
                  <span>{parameters.rainfall} mm/hr</span>
                </div>
              </div>
            </div>

            {/* Seismic Slider */}
            <div className="control-group">
              <div className="control-label">
                <Zap size={16} />
                <span>Simulate Seismic Event (Richter)</span>
              </div>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={parameters.seismic}
                  onChange={(e) => onUpdateParameter('seismic', Number(e.target.value))}
                  className="slider seismic-slider"
                  disabled={isSimulating}
                />
                <div className="slider-value">
                  <span>{parameters.seismic.toFixed(1)} Richter</span>
                </div>
              </div>
            </div>
          </div>

          {/* Proposed Mitigations Section */}
          <div className="control-section">
            <h4>Proposed Mitigations</h4>
            
            {/* Rock Bolts Toggle */}
            <div className="control-group">
              <div className="toggle-container">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={parameters.rockBolts}
                    onChange={(e) => onUpdateParameter('rockBolts', e.target.checked)}
                    className="toggle-input"
                    disabled={isSimulating}
                  />
                  <div className="toggle-switch">
                    <div className="toggle-slider"></div>
                  </div>
                  <span className="toggle-text">Apply virtual rock bolts</span>
                </label>
              </div>
            </div>

            {/* Dewatering Toggle */}
            <div className="control-group">
              <div className="toggle-container">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={parameters.dewatering}
                    onChange={(e) => onUpdateParameter('dewatering', e.target.checked)}
                    className="toggle-input"
                    disabled={isSimulating}
                  />
                  <div className="toggle-switch">
                    <div className="toggle-slider"></div>
                  </div>
                  <span className="toggle-text">Simulate dewatering of slope</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className={`btn btn-primary run-simulation-btn ${isSimulating ? 'running' : ''}`}
              onClick={onRunSimulation}
              disabled={isSimulating}
            >
              <Play size={18} />
              {isSimulating ? 'Running Simulation...' : 'Run Simulation'}
            </button>
            
            <button
              className="btn btn-secondary reset-btn"
              onClick={onReset}
              disabled={isSimulating}
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
