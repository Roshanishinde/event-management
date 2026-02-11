import React from 'react';
import '../styles/dashboard.css';

const Sidebar = ({ activeView, setActiveView, onLogout }) => {
  const menuItems = [
  
    
    { id: 'my-registration', label: 'My Registration', icon: '📝' },
    { id: 'notification', label: 'Notification', icon: '🔔' },
    { id: 'profile', label: 'Profile', icon: '👤' },
   
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>College Events</h2>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id} className="sidebar-item">
            <div 
              className={`sidebar-link ${activeView === item.id ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </div>
          </li>
        ))}
        
        <li className="sidebar-item" style={{ marginTop: 'auto' }}>
          <div className="sidebar-link" onClick={onLogout}>
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;