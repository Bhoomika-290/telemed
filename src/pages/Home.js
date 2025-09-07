import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle, Clock, Plus, Video, MessageCircle, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentService, analyticsService } from '../utils/firestoreUtils';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Home = () => {
  const navigate = useNavigate();
  const { userData, currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedConsultations: 0,
    pendingAppointments: 0,
    activePatients: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser || !userData) return;

      try {
        setLoading(true);
        
        // Fetch dashboard stats
        const dashboardStats = await analyticsService.getDashboardStats(
          currentUser.uid, 
          userData.userType
        );
        setStats(dashboardStats);

        // Fetch recent appointments
        const appointments = await appointmentService.getByUser(
          currentUser.uid, 
          userData.userType
        );
        setRecentAppointments(appointments.slice(0, 3)); // Get latest 3 appointments

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser, userData]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = userData?.firstName || 'User';
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatsConfig = () => {
    if (userData?.userType === 'doctor') {
      return [
        { 
          title: 'Total Appointments', 
          value: stats.totalAppointments || 0, 
          icon: Calendar,
          color: 'primary'
        },
        { 
          title: 'Completed Consultations', 
          value: stats.completedConsultations || 0, 
          icon: CheckCircle,
          color: 'success'
        },
        { 
          title: 'Pending Appointments', 
          value: stats.pendingAppointments || 0, 
          icon: Clock,
          color: 'warning'
        },
        { 
          title: 'Active Patients', 
          value: stats.activePatients || 0, 
          icon: Users,
          color: 'info'
        }
      ];
    } else {
      return [
        { 
          title: 'My Appointments', 
          value: stats.totalAppointments || 0, 
          icon: Calendar,
          color: 'primary'
        },
        { 
          title: 'Total Consultations', 
          value: stats.totalConsultations || 0, 
          icon: CheckCircle,
          color: 'success'
        },
        { 
          title: 'Upcoming', 
          value: stats.pendingAppointments || 0, 
          icon: Clock,
          color: 'warning'
        },
        { 
          title: 'Health Records', 
          value: stats.healthRecords || 0, 
          icon: FileText,
          color: 'info'
        }
      ];
    }
  };

  const getQuickActions = () => {
    if (userData?.userType === 'doctor') {
      return [
        {
          title: 'View Appointments',
          icon: Calendar,
          action: () => navigate('/appointment'),
          color: 'primary'
        },
        {
          title: 'Start Video Call',
          icon: Video,
          action: () => navigate('/video-call'),
          color: 'success'
        },
        {
          title: 'Patient Messages',
          icon: MessageCircle,
          action: () => navigate('/chatroom'),
          color: 'info'
        },
        {
          title: 'Consultations',
          icon: FileText,
          action: () => navigate('/consult'),
          color: 'warning'
        }
      ];
    } else {
      return [
        {
          title: 'Book Appointment',
          icon: Plus,
          action: () => navigate('/appointment'),
          color: 'primary'
        },
        {
          title: 'Join Video Call',
          icon: Video,
          action: () => navigate('/video-call'),
          color: 'success'
        },
        {
          title: 'Message Doctor',
          icon: MessageCircle,
          action: () => navigate('/chatroom'),
          color: 'info'
        },
        {
          title: 'My Records',
          icon: FileText,
          action: () => navigate('/consult'),
          color: 'warning'
        }
      ];
    }
  };

  if (loading) {
    return (
      <div className="page">
        <LoadingSpinner size="large" message="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h1>{getGreeting()}</h1>
          <p>
            {userData?.userType === 'doctor' 
              ? "Here's your practice overview for today." 
              : "Welcome to your health dashboard."}
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/appointment')}
          className="scale-in"
        >
          <Plus size={20} />
          {userData?.userType === 'doctor' ? 'New Appointment' : 'Book Appointment'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {getStatsConfig().map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`stat-icon ${stat.color}`}>
                <IconComponent size={32} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <div className="dashboard-section slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="section-header">
          <h2>Recent Appointments</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate('/appointment')}
          >
            View All
          </Button>
        </div>
        
        {recentAppointments.length > 0 ? (
          <div className="appointments-list">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-info">
                  <h4>
                    {userData?.userType === 'doctor' 
                      ? appointment.patientName 
                      : appointment.doctorName}
                  </h4>
                  <p>
                    {formatDate(appointment.appointmentDate)} • {appointment.type}
                  </p>
                </div>
                <div className={`appointment-status status-${appointment.status?.toLowerCase()}`}>
                  {appointment.status || 'Scheduled'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Calendar size={48} />
            <h3>No appointments yet</h3>
            <p>
              {userData?.userType === 'doctor' 
                ? "You don't have any appointments scheduled." 
                : "You haven't booked any appointments yet."}
            </p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/appointment')}
              style={{ marginTop: '1rem' }}
            >
              {userData?.userType === 'doctor' ? 'Manage Schedule' : 'Book First Appointment'}
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions slide-up" style={{ animationDelay: '0.6s' }}>
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {getQuickActions().map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button 
                key={index}
                variant="outline" 
                onClick={action.action}
                className="action-btn"
              >
                <IconComponent size={24} />
                {action.title}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Welcome Message for New Users */}
      {stats.totalAppointments === 0 && (
        <div className="dashboard-section slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="welcome-message">
            <h2>Welcome to TeleMed+! 🎉</h2>
            <p>
              {userData?.userType === 'doctor' 
                ? "Start by setting up your availability and managing your patient appointments."
                : "Begin your healthcare journey by booking your first appointment with our qualified doctors."}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button 
                variant="primary" 
                onClick={() => navigate('/appointment')}
              >
                {userData?.userType === 'doctor' ? 'Manage Schedule' : 'Book Appointment'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/chatroom')}
              >
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;