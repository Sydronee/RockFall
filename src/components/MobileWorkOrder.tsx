import React, { useState } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Eye, 
  Plus, 
  Check, 
  AlertCircle,
  Navigation,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface MobileWorkOrderProps {
  workOrderId?: string;
  onBack?: () => void;
}

const MobileWorkOrder: React.FC<MobileWorkOrderProps> = ({ 
  workOrderId = "WO-C4-0916",
  onBack 
}) => {
  const [photoCount, setPhotoCount] = useState(0);
  const [notes, setNotes] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddPhoto = () => {
    setPhotoCount(prev => prev + 1);
    // In real app, would trigger camera/file picker
    console.log('Camera activated for field photo');
  };

  const handleAddNote = () => {
    const note = prompt('Add field note:');
    if (note) {
      setNotes(prev => [...prev, note]);
    }
  };

  const handleMarkComplete = () => {
    setIsCompleted(true);
    console.log('Work order marked as complete');
    // In real app, would sync to backend
  };

  const handleRequestAssistance = () => {
    console.log('Assistance requested');
    // In real app, would send alert to supervisor
  };

  const handleActivateAR = () => {
    console.log('AR overlay activated');
    // In real app, would launch AR camera view
  };

  return (
    <div className="mobile-work-order">
      {/* Header */}
      <header className="mobile-header">
        <div className="header-top">
          <button 
            className="back-button"
            onClick={onBack}
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="header-main">
          <h1>Work Order: {workOrderId}</h1>
          {isCompleted && (
            <div className="completion-badge">
              <Check size={20} />
              <span>COMPLETED</span>
            </div>
          )}
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="mobile-content">
        {/* Priority Info Card */}
        <div className="mobile-card priority-card">
          <div className="card-header">
            <AlertTriangle size={24} className="priority-icon" />
            <h2>Priority Information</h2>
          </div>
          <div className="priority-details">
            <div className="detail-row">
              <span className="detail-label">Location:</span>
              <span className="detail-value">South Wall - Bench C4</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Hazard:</span>
              <span className="detail-value hazard-high">High Risk - Unstable Rock Debris</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Required Action:</span>
              <span className="detail-value action-required">Controlled Scaling</span>
            </div>
          </div>
        </div>

        {/* Map Card */}
        <div className="mobile-card map-card">
          <div className="card-header">
            <MapPin size={24} />
            <h2>Work Zone Location</h2>
          </div>
          <div className="map-container">
            {/* Static Map Placeholder */}
            <div className="static-map">
              <div className="satellite-view">
                {/* Mine terrain background */}
                <div className="terrain-base"></div>
                
                {/* Work zone polygon overlay */}
                <div className="work-zone-overlay">
                  <div className="zone-polygon"></div>
                  <div className="zone-label">Work Zone</div>
                </div>
                
                {/* GPS location indicator */}
                <div className="gps-indicator">
                  <Navigation size={16} />
                  <span>Your Location</span>
                </div>
                
                {/* Map elements */}
                <div className="map-elements">
                  <div className="bench-line bench-1"></div>
                  <div className="bench-line bench-2"></div>
                  <div className="bench-line bench-3"></div>
                  <div className="haul-road"></div>
                </div>
              </div>
            </div>
            <div className="map-info">
              <span>Tap to view full map</span>
            </div>
          </div>
        </div>

        {/* AR Overlay Button */}
        <div className="mobile-card ar-card">
          <button 
            className="ar-button"
            onClick={handleActivateAR}
          >
            <Eye size={28} />
            <span>ACTIVATE AR OVERLAY</span>
            <Camera size={24} />
          </button>
        </div>

        {/* Briefing Card */}
        <div className="mobile-card briefing-card">
          <div className="card-header">
            <Layers size={24} />
            <h2>Planner's Instructions</h2>
          </div>
          <div className="briefing-content">
            <div className="briefing-image">
              <div className="rock-face-preview">
                <div className="crack-indicator">
                  <div className="crack-line"></div>
                  <div className="crack-annotation">New Fracture</div>
                </div>
                <div className="image-overlay">
                  <span>Rock Face Analysis</span>
                </div>
              </div>
            </div>
            <div className="briefing-text">
              <p>
                <strong>Team, focus on the upper section where the new fracture was spotted.</strong> 
                See attached image. Proceed with caution and maintain safe distance.
              </p>
              <div className="safety-reminder">
                <AlertTriangle size={16} />
                <span>Maintain 15m minimum safety perimeter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action & Reporting Card */}
        <div className="mobile-card action-card">
          <div className="card-header">
            <Check size={24} />
            <h2>Complete Work</h2>
          </div>
          <div className="action-content">
            {/* Add Photo/Note Section */}
            <div className="media-section">
              <button 
                className="add-media-button"
                onClick={handleAddPhoto}
              >
                <Plus size={20} />
                <Camera size={20} />
                <span>Add Field Photo</span>
              </button>
              <button 
                className="add-media-button"
                onClick={handleAddNote}
              >
                <Plus size={20} />
                <span>Add Note</span>
              </button>
            </div>

            {/* Media Counter */}
            {(photoCount > 0 || notes.length > 0) && (
              <div className="media-summary">
                <span>{photoCount} photos, {notes.length} notes added</span>
              </div>
            )}

            {/* Primary Actions */}
            <div className="primary-actions">
              <button 
                className={`complete-button ${isCompleted ? 'completed' : ''}`}
                onClick={handleMarkComplete}
                disabled={isCompleted}
              >
                <Check size={24} />
                <span>{isCompleted ? 'WORK COMPLETED' : 'MARK AS COMPLETE'}</span>
              </button>
              
              <button 
                className="assistance-button"
                onClick={handleRequestAssistance}
              >
                <AlertCircle size={24} />
                <span>REPORT ISSUE / REQUEST ASSISTANCE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Spacing for scroll */}
        <div className="bottom-spacer"></div>
      </div>
    </div>
  );
};

export default MobileWorkOrder;
