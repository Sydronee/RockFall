import React from 'react';
import { AlertTriangle, CheckCircle, Users, Play } from 'lucide-react';

interface ActionPlanProps {
  aiConfidence?: number;
  riskLevel?: number;
  onSimulateScenario?: () => void;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ aiConfidence = 89, riskLevel = 65, onSimulateScenario }) => {

  const handleAcknowledgeAlert = () => {
    // In real app, would send acknowledgement to backend
  };

  const handleDispatchTeam = () => {
    // In real app, would dispatch field team
  };

  const handleRunSimulation = () => {
    if (onSimulateScenario) {
      onSimulateScenario();
    }
  };

  return (
    <div className="action-plan">
      <div className="card-header">
        <h3>Prescriptive Mitigation Advisor</h3>
      </div>
      
      <div className="action-content">
        {/* Action Recommended Card */}
        <div className="action-recommended-card">
          <div className="action-header">
            <AlertTriangle size={24} className="warning-icon" />
            <h4>ACTION RECOMMENDED</h4>
          </div>
          
          <div className="action-description">
            <p>
              Perform controlled scaling on the upper face to remove loose debris. 
              Install 3 additional extensometers for enhanced monitoring in this zone.
            </p>
          </div>
          
          <div className="action-details">
            <div className="detail-item">
              <span className="detail-label">Priority:</span>
              <span className="detail-value priority-high">High</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Estimated Duration:</span>
              <span className="detail-value">2-3 hours</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Required Personnel:</span>
              <span className="detail-value">3 specialists</span>
            </div>
          </div>
        </div>
        
        {/* AI Confidence Score */}
        <div className="ai-confidence">
          <div className="confidence-header">
            <span className="confidence-label">AI Confidence:</span>
            <span className="confidence-score">{aiConfidence}%</span>
          </div>
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ width: `${aiConfidence}%` }}
            ></div>
          </div>
          <div className="confidence-description">
            Based on historical patterns and current sensor data
          </div>
        </div>
        
        {/* Additional Recommendations */}
        <div className="additional-recommendations">
          <h5>Additional Recommendations</h5>
          <div className="recommendation-list">
            <div className="recommendation-item">
              <CheckCircle size={16} className="rec-icon" />
              <span>Increase monitoring frequency to every 2 hours</span>
            </div>
            <div className="recommendation-item">
              <CheckCircle size={16} className="rec-icon" />
              <span>Deploy temporary exclusion zone (15m radius)</span>
            </div>
            <div className="recommendation-item">
              <CheckCircle size={16} className="rec-icon" />
              <span>Schedule follow-up drone scan in 24 hours</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={handleAcknowledgeAlert}
          >
            <CheckCircle size={18} />
            Acknowledge Alert
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={handleDispatchTeam}
          >
            <Users size={18} />
            Dispatch Field Team
          </button>
          
          <button 
            className="btn btn-tertiary"
            onClick={handleRunSimulation}
          >
            <Play size={18} />
            Run Simulation
          </button>
        </div>
        
        {/* Emergency Contact */}
        <div className="emergency-contact">
          <div className="emergency-header">
            <AlertTriangle size={16} />
            <span>Emergency Protocol{riskLevel >= 80 ? ' — ACTIVE' : ''}</span>
          </div>
          <div className="contact-info">
            <p>If risk escalates to 80%+, immediately contact:</p>
            <p><strong>Site Manager:</strong> +1-555-0123</p>
            <p><strong>Emergency Response:</strong> +1-555-0911</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
