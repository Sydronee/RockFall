# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# 🚨 GeoPredictive AI - Mining Safety Dashboard

## Overview
A comprehensive, fully responsive mining safety platform built with React, TypeScript, and Vite. Features real-time monitoring, AI-powered risk assessment, critical alert systems, and mobile field operations interfaces.

## ✨ Key Features

### 🎯 **Mission Control Dashboard**
- Real-time mine site monitoring
- AI-powered risk assessment with confidence scoring
- Interactive 3D digital twin visualization
- Live alert ticker with critical notifications
- KPI monitoring and pillar status tracking

### 🔍 **Zone Investigator**
- Deep-dive analysis of specific mine zones
- Visual evidence correlation and data analysis
- Action plan generation and scenario simulation
- **Critical Alert System**: Audio-visual warnings for AI confidence > 92.5%

### 🎮 **Scenario Simulator**
- What-if analysis with parameter adjustment
- Real-time stress modeling and mitigation planning
- Interactive controls for risk scenario testing
- Predictive outcome visualization

### 📱 **Mobile Work Order System**
- Field-optimized tablet/mobile interface
- AR-enhanced mine inspection workflows
- Photo documentation and digital signatures
- Offline-capable field operations

## 🏗️ **Technology Stack**

### Frontend Framework
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool with HMR

### UI & Visualization
- **Recharts** - Advanced data visualization
- **Lucide React** - Consistent iconography
- **CSS Grid/Flexbox** - Responsive layout system
- **CSS Custom Properties** - Dynamic theming

### Audio & Interactions
- **Web Audio API** - Critical alert sound system
- **Touch-optimized** - Mobile-first interactions
- **Accessibility** - WCAG 2.1 AA compliant

## 📱 **Mobile Responsiveness**

### Comprehensive Breakpoint System
```
Large Desktop:    1400px+
Desktop:          1200px - 1400px  
Small Desktop:    900px - 1200px
Tablet:           768px - 900px
Large Mobile:     480px - 768px
Standard Mobile:  360px - 480px
Small Mobile:     < 360px
```

### Mobile-First Features
- ✅ **Fluid Typography** - Scales from 16px to 13px base
- ✅ **Touch Targets** - Minimum 44px (mobile: 48px)
- ✅ **Adaptive Layouts** - 3-column → stacked layouts
- ✅ **Progressive Enhancement** - Content priority on mobile
- ✅ **Safe Area Support** - Notch and gesture area handling

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development
```bash
# Clone the repository
git clone <repository-url>
cd RockFall

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
http://localhost:5173/
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 **Testing Critical Features**

### Critical Alert System
1. Navigate to the dashboard
2. Click "⚠️ Access Sector 7G - Overhang" in the left sidebar
3. Experience immediate audio-visual alert (AI confidence: 97.8%)
4. Click "Acknowledge & Silence Alarm" to dismiss

### Mobile Responsiveness
1. Open Chrome DevTools (F12)
2. Enable Device Toolbar (Ctrl+Shift+M)
3. Test different device sizes and orientations
4. Verify touch-friendly interactions

### Navigation Flows
- **Dashboard** → Zone selection → **Zone Investigator**
- **Zone Investigator** → "Simulate Scenario" → **Scenario Simulator**
- **Dashboard** → Mobile button → **Mobile Work Order**
- All views have back navigation to dashboard

## 📁 **Project Structure**

```
src/
├── components/           # React components
│   ├── MissionControlDashboard.tsx   # Main dashboard
│   ├── ZoneInvestigator.tsx          # Zone analysis
│   ├── ScenarioSimulator.tsx         # What-if modeling
│   ├── MobileWorkOrder.tsx           # Field operations
│   ├── AlertTicker.tsx               # Live alert feed
│   ├── DigitalTwin.tsx               # 3D visualization
│   ├── MainKPI.tsx                   # KPI monitoring
│   └── PillarStatus.tsx              # Infrastructure status
├── App.tsx              # Main application
├── App.css              # Comprehensive styling
└── main.tsx             # Application entry point

public/
├── sounds/              # Audio assets for alerts
└── vite.svg            # Application icon
```

## 🎨 **Design System**

### Color Palette
- **Primary Cyan**: `#00FFFF` - System highlights
- **Warning Orange**: `#FFA500` - Caution indicators  
- **Critical Red**: `#FF4136` - Danger alerts
- **Safe Green**: `#00FF88` - Normal operations
- **Dark Theme**: Multiple shades of gray/black

### Typography
- **Font Family**: 'Inter' with system fallbacks
- **Responsive Scaling**: 16px → 13px across breakpoints
- **Weight Range**: 300-700 for hierarchy

## 🔧 **Configuration Files**

### Vite Configuration (`vite.config.ts`)
- React plugin with fast refresh
- TypeScript support
- Development server configuration

### TypeScript Configuration
- `tsconfig.json` - Main TypeScript config
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js tooling settings

### ESLint Configuration (`eslint.config.js`)
- React and TypeScript rules
- Import/export validation
- Code quality enforcement

## 🌐 **Browser Support**

### Desktop Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Mobile Browsers  
- iOS Safari 12+
- Android Chrome 70+
- Samsung Internet 10+
- Firefox Mobile 68+

## 📖 **Documentation**

- **[Navigation Guide](NAVIGATION.md)** - Complete navigation flows
- **[Critical Alert Testing](CRITICAL_ALERT_TESTING.md)** - Alert system guide
- **[Mobile Responsive Guide](MOBILE_RESPONSIVE_GUIDE.md)** - Mobile implementation

## 🚀 **Deployment**

### Production Checklist
- [ ] Run `npm run build` for optimized bundle
- [ ] Test on real mobile devices
- [ ] Verify critical alert audio functionality
- [ ] Check responsive design across breakpoints
- [ ] Validate accessibility compliance

### Performance Targets
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s  
- Cumulative Layout Shift < 0.1
- Mobile performance score > 90

## 🤝 **Contributing**

1. Follow TypeScript strict mode requirements
2. Maintain mobile-first responsive design principles
3. Test critical alert functionality after changes
4. Ensure accessibility standards compliance
5. Document any new features or components

## 📄 **License**

MIT License - See LICENSE file for details

---

**GeoPredictive AI** - Protecting miners through intelligent monitoring and responsive design. 🛡️⛏️

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
