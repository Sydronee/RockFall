import React, { useState } from 'react';

interface TimelinePoint {
  date: string;
  active: boolean;
}

const VisualEvidence: React.FC = () => {
  const [timelineData] = useState<TimelinePoint[]>([
    { date: '1 Sep', active: false },
    { date: '8 Sep', active: false },
    { date: '16 Sep', active: true }
  ]);

  const [selectedDate, setSelectedDate] = useState('16 Sep');

  return (
    <div className="visual-evidence">
      <div className="card-header">
        <h3>Visual Analysis</h3>
      </div>
      
      <div className="evidence-content">
        {/* High-resolution rock face image */}
        <div className="rock-face-container">
          <div className="rock-face-image">
            {/* Placeholder for actual rock face image */}
            <div className="rock-face-placeholder">
              <div className="rock-texture">
                <div className="crack-indicator">
                  <div className="crack-line"></div>
                  <div className="crack-label">1.5cm fracture</div>
                </div>
                <div className="measurement-points">
                  <div className="point point-1"></div>
                  <div className="point point-2"></div>
                  <div className="point point-3"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="image-metadata">
            <span>Resolution: 4K | Captured: 16 Sep 2025, 14:00 UTC</span>
          </div>
        </div>
        
        {/* Timeline component */}
        <div className="timeline-container">
          <h4>Scan Timeline</h4>
          <div className="timeline">
            {timelineData.map((point, index) => (
              <div 
                key={point.date}
                className={`timeline-point ${point.active ? 'active' : ''} ${selectedDate === point.date ? 'selected' : ''}`}
                onClick={() => setSelectedDate(point.date)}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-date">{point.date}</div>
                {index < timelineData.length - 1 && (
                  <div className="timeline-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Analysis text box */}
        <div className="analysis-box">
          <div className="analysis-header">
            <h4>Analysis Notes</h4>
            <span className="analysis-date">Updated: {selectedDate}</span>
          </div>
          <div className="analysis-content">
            <p>
              <strong>Analysis:</strong> 1.5cm fracture growth detected between Sep 8 and Sep 16 scans. 
              The crack propagation shows a concerning acceleration pattern, with 60% of the growth 
              occurring in the last 3 days.
            </p>
            <div className="analysis-metrics">
              <div className="metric">
                <span className="metric-label">Fracture Length:</span>
                <span className="metric-value">2.8m</span>
              </div>
              <div className="metric">
                <span className="metric-label">Growth Rate:</span>
                <span className="metric-value">0.19 cm/day</span>
              </div>
              <div className="metric">
                <span className="metric-label">Depth Estimate:</span>
                <span className="metric-value">15-20cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEvidence;
