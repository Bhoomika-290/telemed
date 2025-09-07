import React, { useState } from 'react';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    type: 'video',
    reason: ''
  });

  const appointments = [
    { id: 1, patient: 'John Smith', date: '2024-12-20', time: '10:00 AM', type: 'Video Call', status: 'Confirmed' },
    { id: 2, patient: 'Sarah Johnson', date: '2024-12-20', time: '11:30 AM', type: 'Chat', status: 'Pending' },
    { id: 3, patient: 'Mike Davis', date: '2024-12-21', time: '2:00 PM', type: 'Video Call', status: 'Confirmed' },
    { id: 4, patient: 'Emily Brown', date: '2024-12-21', time: '3:30 PM', type: 'Phone Call', status: 'Cancelled' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New appointment:', formData);
    setShowForm(false);
    setFormData({
      patientName: '',
      date: '',
      time: '',
      type: 'video',
      reason: ''
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Appointments</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Schedule New'}
        </Button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>Schedule New Appointment</h2>
          <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <Input
                label="Patient Name"
                name="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleInputChange}
                required
                className="half-width"
              />
              
              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="half-width"
              />
            </div>

            <div className="form-row">
              <Input
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="half-width"
              />
              
              <div className="input-group half-width">
                <label className="input-label">Appointment Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="video">Video Call</option>
                  <option value="chat">Chat</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Reason for Visit</label>
              <textarea
                name="reason"
                placeholder="Describe the reason for this appointment"
                value={formData.reason}
                onChange={handleInputChange}
                className="input-field textarea"
                rows="3"
              />
            </div>

            <Button type="submit" variant="primary">
              Schedule Appointment
            </Button>
          </form>
        </div>
      )}

      <div className="appointments-section">
        <h2>All Appointments</h2>
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="card-header">
                <h3>{appointment.patient}</h3>
                <div className={`status-badge status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </div>
              </div>
              <div className="card-content">
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Type:</strong> {appointment.type}</p>
              </div>
              <div className="card-actions">
                <Button variant="outline" size="small">Edit</Button>
                <Button variant="primary" size="small">
                  {appointment.type === 'Video Call' ? 'Join Call' : 'Start Chat'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;