import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Appointments', value: '24', icon: '📅' },
    { title: 'Completed Consultations', value: '18', icon: '✅' },
    { title: 'Pending Reviews', value: '3', icon: '⏳' },
    { title: 'Active Patients', value: '156', icon: '👥' }
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Smith', time: '10:00 AM', type: 'Video Call', status: 'Upcoming' },
    { id: 2, patient: 'Sarah Johnson', time: '11:30 AM', type: 'Chat', status: 'Completed' },
    { id: 3, patient: 'Mike Davis', time: '2:00 PM', type: 'Video Call', status: 'Upcoming' }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Appointments</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate('/appointment')}
          >
            View All
          </Button>
        </div>
        
        <div className="appointments-list">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-item">
              <div className="appointment-info">
                <h4>{appointment.patient}</h4>
                <p>{appointment.time} • {appointment.type}</p>
              </div>
              <div className={`appointment-status status-${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Button 
            variant="primary" 
            onClick={() => navigate('/appointment')}
            className="action-btn"
          >
            📅 Schedule Appointment
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/video-call')}
            className="action-btn"
          >
            📹 Start Video Call
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/chatroom')}
            className="action-btn"
          >
            💬 Open Chat
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/consult')}
            className="action-btn"
          >
            👨‍⚕️ View Consultations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;