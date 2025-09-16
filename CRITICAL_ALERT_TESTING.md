# Critical Alert System - Testing Guide

## 🚨 GeoPredictive AI Critical Alert Implementation

### Overview
The ZoneInvestigator component now includes a comprehensive critical alert system that triggers when AI confidence levels exceed 92.5%. This system provides immediate audio-visual warnings for imminent rockfall detection scenarios.

---

## 🎯 How to Test the Critical Alert

### Step 1: Access the Dashboard
1. Open your browser and navigate to `http://localhost:5173/`
2. You'll see the main GeoPredictive AI dashboard

### Step 2: Trigger the Critical Alert
1. In the **left sidebar**, look for the "🚨 Critical Alert Test" section
2. Click the **"⚠️ Access Sector 7G - Overhang"** button
3. This will navigate to the critical zone with AI confidence of 97.8%

### Step 3: Experience the Alert
**IMMEDIATELY upon loading the Zone Investigator:**
- ⚡ **Audio Alert**: Synthesized alarm sound (800Hz square wave, repeating every second)
- 🔴 **Visual Alert**: Full-screen red overlay with pulsating modal
- 📢 **Critical Message**: "IMMEDIATE EVACUATION REQUIRED. ESTABLISH 200m EXCLUSION ZONE"

---

## 🔧 Technical Implementation Details

### Critical Alert Trigger Conditions
```typescript
// Alert triggers when AI confidence > 92.5%
if (zoneData.aiConfidence > 92.5) {
  setIsCriticalAlert(true);
  // Audio and visual alerts activate
}
```

### Test Scenario Data
```typescript
"sector7g": {
  name: "Sector 7G - Overhang",
  riskLevel: 98,
  aiConfidence: 97.8,
  minesite: "Ironstone Ridge Quarry",
  lastUpdate: "2025-09-16 14:35:00"
}
```

### Audio System
- **Technology**: Web Audio API with synthesized tones
- **Frequency**: 800Hz square wave
- **Pattern**: 0.2-second bursts every 1 second
- **Loop**: Continuous until acknowledged
- **Fallback**: Console warnings if audio unavailable

### Visual Alert Components
- **Overlay**: Full-screen red transparency (rgba(255, 0, 0, 0.5))
- **Modal**: Dark gradient background with pulsating red border
- **Animation**: Pulsing border, scaling icon, fade-in effects
- **Z-Index**: 9999 (highest priority)

---

## 🎨 Visual Features

### Alert Modal Contents
1. **Warning Icon**: Large pulsating AlertTriangle (64px)
2. **Title**: "CRITICAL ALERT: IMMINENT ROCKFALL DETECTED"
3. **Location Details**: Sector 7G - Overhang
4. **AI Confidence**: 97.8%
5. **Minesite**: Ironstone Ridge Quarry
6. **Action Required**: "IMMEDIATE EVACUATION REQUIRED. ESTABLISH 200m EXCLUSION ZONE"

### Animation Effects
- **Border Pulse**: Red border alternates between #ff0000 and #ff4444
- **Icon Pulse**: Warning icon scales from 1.0x to 1.1x
- **Modal Entrance**: Scale animation from 0.8x to 1.0x
- **Backdrop Blur**: Progressive blur effect on background

---

## 🔇 Silencing the Alert

### How to Acknowledge
1. Click the **"Acknowledge & Silence Alarm"** button in the modal
2. **Audio stops immediately**
3. **Modal disappears**
4. **Normal Zone Investigator view resumes**

### Technical Cleanup
```typescript
const handleAcknowledgeAlert = () => {
  setIsCriticalAlert(false);
  clearInterval(alarmInterval);     // Stop audio loop
  audioContext.close();             // Clean up audio resources
};
```

---

## 🧪 Testing Different Scenarios

### Normal Zones (No Alert)
- `zone1`: Haul Road Sector 7 (AI: 78.5%)
- `zone2`: North Face - Bench B2 (AI: 82.1%)
- `zone3`: South Wall - Bench C4 (AI: 89.3%)

### Critical Zone (Alert Triggered)
- `sector7g`: Sector 7G - Overhang (AI: 97.8%) ⚠️

---

## 🛠️ Browser Compatibility

### Audio Support
- **Chrome/Edge**: Full Web Audio API support
- **Firefox**: Full Web Audio API support
- **Safari**: Full Web Audio API support
- **Mobile**: May require user interaction first

### Visual Effects
- **All Modern Browsers**: Full CSS animation support
- **Backdrop Filter**: Supported in all modern browsers
- **Responsive**: Works on desktop, tablet, and mobile

---

## 🚀 Development Server

```bash
# Start the development server
npm run dev

# Access the application
http://localhost:5174/

# Test the critical alert
Click "⚠️ Access Sector 7G - Overhang" in the dashboard
```

---

## 🎵 Audio Technical Details

### Synthesized Alarm Sound
```typescript
// 800Hz square wave alarm
oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
oscillator.type = 'square';
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

// 0.2-second duration, repeating every 1 second
oscillator.start(audioContext.currentTime);
oscillator.stop(audioContext.currentTime + 0.2);
```

### Audio Cleanup
- Proper interval clearing
- Audio context closure
- Memory leak prevention

---

## ✅ Success Indicators

When the system is working correctly:
1. ✅ **Audio Alert** plays immediately on zone load
2. ✅ **Red overlay** covers the entire screen
3. ✅ **Modal appears** with critical information
4. ✅ **Pulsing animations** are visible
5. ✅ **Acknowledge button** stops the alert
6. ✅ **Normal view** resumes after acknowledgment

---

## 🎯 Next Steps for Production

1. **Real Audio Files**: Replace synthesized audio with professional alarm sounds
2. **Backend Integration**: Connect to real AI confidence scoring system
3. **Notification System**: Add email/SMS alerts for critical events
4. **Logging**: Implement alert acknowledgment logging
5. **Mobile Push**: Add push notifications for mobile devices
6. **Escalation**: Add supervisor escalation for unacknowledged alerts

---

**The critical alert system is now fully functional and ready for testing!** 🚨
