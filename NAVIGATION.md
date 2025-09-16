# GeoPredictive AI - Navigation Guide

## 🎯 Application Overview
A comprehensive mining safety dashboard with multiple views for monitoring, investigation, simulation, and field operations.

---

## 🗺️ Navigation Flow Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GEOLOCATION AI                                │
│                    Mission Control Dashboard                         │
│                         (Main Entry Point)                           │
└─────────────────────┬───────────────────────────────────────────────┘
                      │
              ┌───────▼───────┐
              │ Zone Selection │
              │ (Click Zones)  │
              └───────┬───────┘
                      │
          ┌───────────▼───────────┐
          │    Zone Investigator   │
          │  (Detailed Analysis)   │
          └───────┬───────────────┘
                  │               │
        ┌─────────▼─────────┐     │
        │ Scenario Simulator │     │
        │  (What-if Analysis)│     │
        └─────────┬─────────┘     │
                  │               │
                  └───────────────┼─────► Back to Dashboard
                                  │
                        ┌─────────▼─────────┐
                        │ Mobile Work Order │
                        │  (Field Operations)│
                        └───────────────────┘
```

---

## 📱 Component Navigation Details

### 1. **Mission Control Dashboard** (`MissionControlDashboard.tsx`)
**Entry Point** - Main monitoring interface

#### Available Actions:
- **View Real-time Data**: Monitor KPIs, pillars status, alerts
- **Navigate to Zones**: Click on any zone marker in Digital Twin

#### Navigation Options:
```
Dashboard → Zone Investigation
```

**Zone Markers Available:**
- **Zone 1**: Haul Road Sector 7 (Safe - 25% risk)
- **Zone 2**: North Face - Bench B2 (Safe - 35% risk) 
- **Zone 3**: South Wall - Bench C4 (Warning - 65% risk)

---

### 2. **Zone Investigator** (`ZoneInvestigator.tsx`)
**Deep-dive analysis** for specific mining zones

#### Available Actions:
- **Analyze Visual Evidence**: View rock face images and timeline
- **Review Data Charts**: Risk factors, sensor data, trends
- **Access Action Plans**: AI recommendations and emergency protocols
- **Run Simulations**: Launch scenario modeling

#### Navigation Options:
```
Zone Investigator → Back to Dashboard
Zone Investigator → Scenario Simulator
Zone Investigator → Mobile Work Order (future)
```

#### How to Access:
1. From **Dashboard**: Click any zone marker in Digital Twin
2. **Back Navigation**: "Back to Dashboard" button in header

---

### 3. **Scenario Simulator** (`ScenarioSimulator.tsx`)
**What-if analysis** and risk modeling tool

#### Available Actions:
- **Set Environmental Parameters**: Rainfall, seismic activity
- **Configure Mitigations**: Rock bolts, dewatering systems
- **Run Simulations**: Execute predictive models
- **View Results**: Updated stability metrics and 3D visualization

#### Navigation Options:
```
Scenario Simulator → Back to Zone Investigator
```

#### How to Access:
1. From **Zone Investigator**: Click "Run Simulation" button in Action Plan
2. **Back Navigation**: "Back to Investigator" button in header

---

### 4. **Mobile Work Order** (`MobileWorkOrder.tsx`)
**Field operations** interface for tablets/mobile devices

#### Available Actions:
- **Review Work Instructions**: Priority info, location details
- **View Work Zone Map**: Satellite view with GPS location
- **Activate AR Overlay**: Launch augmented reality view
- **Capture Field Data**: Photos, notes, observations
- **Complete Work**: Mark tasks as finished
- **Request Assistance**: Alert supervisors for help

#### Navigation Options:
```
Mobile Work Order → [Standalone Interface]
```

#### How to Access:
- **Standalone mobile app** for field workers
- Accessed via QR codes or direct mobile links
- Future integration with other components planned

---

## 🔄 Complete Navigation Flows

### **Primary User Journey - Zone Investigation**
```
1. Dashboard (Monitor Overview)
   ↓ [Click Zone Marker]
2. Zone Investigator (Analyze Details)  
   ↓ [Click "Run Simulation"]
3. Scenario Simulator (Model What-if)
   ↓ [Click "Back to Investigator"]
4. Zone Investigator (Review Results)
   ↓ [Click "Back to Dashboard"]
5. Dashboard (Continue Monitoring)
```

### **Secondary Journey - Quick Dashboard Review**
```
1. Dashboard (Check All Systems)
   ↓ [Monitor KPIs & Alerts]
2. Dashboard (Stay on Main View)
```

### **Mobile Field Journey**
```
1. Mobile Work Order (Receive Assignment)
   ↓ [Review Instructions]
2. Mobile Work Order (Navigate to Location)
   ↓ [Use AR Overlay]
3. Mobile Work Order (Complete Work)
   ↓ [Document & Report]
4. Mobile Work Order (Mark Complete)
```

---

## 🎮 Navigation Controls

### **Button Types & Functions**

#### **Zone Selection**
- **Location**: Digital Twin component (center panel)
- **Trigger**: Click on colored zone markers
- **Visual Feedback**: Glowing dots with hover effects
- **Action**: Navigate to Zone Investigator

#### **Back Navigation**
- **Style**: `< Back to [Previous View]` buttons
- **Location**: Top-left of each component header
- **Keyboard**: ESC key support (future enhancement)

#### **Action Buttons**
- **Run Simulation**: Orange button in Zone Investigator Action Plan
- **Activate AR**: Large cyan button in Mobile Work Order
- **Mark Complete**: Green button for work completion

---

## 📊 Data Flow Between Views

### **Shared Zone Data**
```typescript
interface ZoneData {
  id: string;           // zone1, zone2, zone3
  name: string;         // "South Wall - Bench C4"
  riskLevel: number;    // 0-100 percentage
  status: string;       // 'safe' | 'warning' | 'critical'
}
```

### **Navigation State Management**
```typescript
interface CurrentView {
  type: 'dashboard' | 'zone' | 'simulator' | 'mobile';
  zoneId?: string;      // Passed between views
}
```

---

## 🚀 Quick Start Navigation

### **For Operators (Desktop/Laptop)**
1. **Start**: Open dashboard at `http://localhost:5173`
2. **Monitor**: Review overall mine status
3. **Investigate**: Click any zone marker for details
4. **Simulate**: Use "Run Simulation" for what-if analysis
5. **Return**: Use back buttons to navigate up hierarchy

### **For Field Workers (Mobile/Tablet)**
1. **Access**: Open Mobile Work Order directly
2. **Review**: Check priority information and location
3. **Navigate**: Use map and GPS for location finding
4. **Execute**: Follow planner instructions with AR assistance
5. **Complete**: Document work and mark as finished

---

## 🔧 Technical Navigation Implementation

### **Route Structure**
```
/ (root) → MissionControlDashboard
├── /zone/:zoneId → ZoneInvestigator  
├── /simulator/:zoneId → ScenarioSimulator
└── /mobile/workorder/:id → MobileWorkOrder
```

### **State Management**
- **App.tsx**: Central navigation state
- **Props passing**: Zone IDs and callback functions
- **Local storage**: Persistent navigation state (future)

### **Navigation Events**
```typescript
// Navigation callbacks
onZoneClick: (zoneId: string) => void
onBack: () => void  
onSimulateScenario: (zoneId: string) => void
```

---

## 📱 Responsive Navigation

### **Desktop (1200px+)**
- Full dashboard with all panels visible
- Multi-column layouts in Zone Investigator
- Two-panel Scenario Simulator

### **Tablet (768px - 1200px)**
- Stacked panels in Zone Investigator
- Single-column Scenario Simulator
- Touch-optimized Mobile Work Order

### **Mobile (< 768px)**
- Simplified dashboard layout
- Single-column all views
- Full-screen Mobile Work Order optimized

---

## 🎯 Navigation Best Practices

### **User Experience**
- **Clear hierarchy**: Dashboard → Zone → Simulator flow
- **Consistent back buttons**: Always top-left position
- **Visual feedback**: Button states and loading indicators
- **Touch-friendly**: 44px minimum touch targets on mobile

### **Performance**
- **Lazy loading**: Components load on demand
- **State preservation**: Navigation maintains component state
- **Smooth transitions**: CSS transitions for view changes

---

## 🔮 Future Navigation Enhancements

### **Planned Features**
- **Breadcrumb navigation**: Full path visibility
- **Deep linking**: Direct URLs for each view/zone
- **Keyboard shortcuts**: Power user navigation
- **Offline navigation**: PWA support for field use
- **Multi-tab support**: Work with multiple zones simultaneously

### **Integration Points**
- **QR codes**: Quick mobile work order access
- **Push notifications**: Navigate to urgent alerts
- **Voice commands**: Hands-free navigation for field workers
- **AR waypoints**: Navigation guidance in AR overlay

---

*Last Updated: September 16, 2025*  
*GeoPredictive AI Mining Safety Platform*
