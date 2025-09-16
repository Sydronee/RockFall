import { useState } from 'react';
import MissionControlDashboard from './components/MissionControlDashboard';
import ZoneInvestigator from './components/ZoneInvestigator';
import ScenarioSimulator from './components/ScenarioSimulator';
import MobileWorkOrder from './components/MobileWorkOrder';
import './App.css'

interface CurrentView {
  type: 'dashboard' | 'zone' | 'simulator' | 'mobile';
  zoneId?: string;
  workOrderId?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>({ type: 'dashboard' });

  const navigateToZone = (zoneId: string) => {
    setCurrentView({ type: 'zone', zoneId });
  };

  const navigateToSimulator = (zoneId: string) => {
    setCurrentView({ type: 'simulator', zoneId });
  };

  const navigateToMobile = (workOrderId?: string) => {
    setCurrentView({ type: 'mobile', workOrderId });
  };

  const navigateToDashboard = () => {
    setCurrentView({ type: 'dashboard' });
  };

  const navigateBackToZone = (zoneId: string) => {
    setCurrentView({ type: 'zone', zoneId });
  };

  return (
    <div className="App">
      {currentView.type === 'dashboard' ? (
        <MissionControlDashboard 
          onZoneClick={navigateToZone}
          onMobileAccess={navigateToMobile}
        />
      ) : currentView.type === 'zone' ? (
        <ZoneInvestigator 
          zoneId={currentView.zoneId!} 
          onBack={navigateToDashboard}
          onSimulateScenario={navigateToSimulator}
        />
      ) : currentView.type === 'simulator' ? (
        <ScenarioSimulator 
          zoneId={currentView.zoneId!} 
          onBack={() => navigateBackToZone(currentView.zoneId!)} 
        />
      ) : (
        <MobileWorkOrder 
          workOrderId={currentView.workOrderId}
          onBack={navigateToDashboard}
        />
      )}
    </div>
  );
}

export default App;
