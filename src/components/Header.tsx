import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <h1>GeoPredictive AI</h1>
        </div>
      </div>
      
      <div className="header-center">
        <h2>Site Overview: Blackwater Canyon Mine</h2>
      </div>
      
      <div className="header-right">
        <div className="datetime-display">
          <span className="date-time">{formatDateTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
