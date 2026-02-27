import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DataAnalysis: React.FC = () => {
  // Risk contribution data for donut chart
  const riskData = [
    { name: 'Pore Pressure', value: 70, fill: '#FFA500' },
    { name: 'Recent Rainfall', value: 20, fill: '#0088FE' },
    { name: 'Micro-seismic Activity', value: 10, fill: '#FFBB28' }
  ];

  // Pore pressure data for last 48 hours
  const porePressureData = [
    { time: '0h', value: 380 },
    { time: '4h', value: 385 },
    { time: '8h', value: 390 },
    { time: '12h', value: 395 },
    { time: '16h', value: 400 },
    { time: '20h', value: 405 },
    { time: '24h', value: 410 },
    { time: '28h', value: 415 },
    { time: '32h', value: 420 },
    { time: '36h', value: 430 },
    { time: '40h', value: 440 },
    { time: '44h', value: 445 },
    { time: '48h', value: 450 }
  ];

  // Displacement data for last 48 hours
  const displacementData = [
    { time: '0h', value: 1.2 },
    { time: '4h', value: 1.2 },
    { time: '8h', value: 1.3 },
    { time: '12h', value: 1.3 },
    { time: '16h', value: 1.3 },
    { time: '20h', value: 1.4 },
    { time: '24h', value: 1.4 },
    { time: '28h', value: 1.4 },
    { time: '32h', value: 1.5 },
    { time: '36h', value: 1.5 },
    { time: '40h', value: 1.6 },
    { time: '44h', value: 1.7 },
    { time: '48h', value: 1.8 }
  ];

  const customTooltip = (props: { active?: boolean; payload?: Array<{ value: number }>; label?: string; unit?: string }) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="chart-tooltip">
          <p>{`${props.label}: ${props.payload[0].value}${props.unit || ''}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="data-analysis">
      <div className="card-header">
        <h3>Data Analysis</h3>
      </div>
      
      <div className="analysis-content">
        {/* Risk Contribution Chart */}
        <div className="chart-container risk-chart">
          <h4>Primary Risk Factors</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="risk-legend">
            {riskData.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span className="legend-label">{item.name}</span>
                <span className="legend-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pore Pressure Chart */}
        <div className="chart-container pressure-chart">
          <h4>Pore Pressure (kPa) - Last 48 Hrs</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={porePressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="time" 
                  stroke="#ccc"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 600]}
                  stroke="#ccc"
                  fontSize={12}
                />
                <Tooltip content={(props) => customTooltip({...props, unit: ' kPa'})} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FFA500" 
                  strokeWidth={2}
                  dot={{ fill: '#FFA500', r: 3 }}
                  activeDot={{ r: 5, fill: '#FFA500' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-summary">
            <span className="current-value">Current: 450 kPa</span>
            <span className="trend trending-up">↗ Rising</span>
          </div>
        </div>
        
        {/* Displacement Chart */}
        <div className="chart-container displacement-chart">
          <h4>Displacement (mm) - Last 48 Hrs</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={displacementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="time" 
                  stroke="#ccc"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 5]}
                  stroke="#ccc"
                  fontSize={12}
                />
                <Tooltip content={(props) => customTooltip({...props, unit: ' mm'})} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00FFFF" 
                  strokeWidth={2}
                  dot={{ fill: '#00FFFF', r: 3 }}
                  activeDot={{ r: 5, fill: '#00FFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-summary">
            <span className="current-value">Current: 1.8 mm</span>
            <span className="trend trending-up">↗ Recent uptick</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
