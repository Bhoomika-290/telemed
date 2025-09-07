import React, { useState } from 'react';
import Button from '../components/Common/Button';

const Consult = () => {
  const [selectedConsult, setSelectedConsult] = useState(null);

  const consultations = [
    {
      id: 1,
      patient: 'John Smith',
      date: '2024-12-19',
      time: '10:00 AM',
      status: 'Completed',
      diagnosis: 'Common Cold',
      symptoms: 'Cough, runny nose, mild fever',
      prescription: 'Rest, fluids, acetaminophen as needed',
      notes: 'Patient reported symptoms for 3 days. Advised to return if symptoms worsen.'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      date: '2024-12-19',
      time: '11:30 AM',
      status: 'In Progress',
      diagnosis: 'Hypertension Follow-up',
      symptoms: 'Blood pressure monitoring',
      prescription: 'Continue current medication',
      notes: 'Blood pressure stable. Next check-up in 3 months.'
    },
    {
      id: 3,
      patient: 'Mike Davis',
      date: '2024-12-20',
      time: '2:00 PM',
      status: 'Scheduled',
      diagnosis: '',
      symptoms: 'Headaches, fatigue',
      prescription: '',
      notes: ''
    }
  ];

  const handleViewDetails = (consultation) => {
    setSelectedConsult(consultation);
  };

  const handleCloseDetails = () => {
    setSelectedConsult(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Consultations</h1>
        <p>Manage patient consultations and medical records</p>
      </div>

      {selectedConsult ? (
        <div className="consultation-details">
          <div className="details-header">
            <h2>Consultation Details</h2>
            <Button variant="outline" onClick={handleCloseDetails}>
              Back to List
            </Button>
          </div>

          <div className="patient-info">
            <h3>Patient Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Patient Name:</label>
                <span>{selectedConsult.patient}</span>
              </div>
              <div className="info-item">
                <label>Date:</label>
                <span>{selectedConsult.date}</span>
              </div>
              <div className="info-item">
                <label>Time:</label>
                <span>{selectedConsult.time}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-badge status-${selectedConsult.status.toLowerCase().replace(' ', '-')}`}>
                  {selectedConsult.status}
                </span>
              </div>
            </div>
          </div>

          <div className="medical-details">
            <div className="detail-section">
              <h4>Symptoms</h4>
              <p>{selectedConsult.symptoms || 'No symptoms recorded'}</p>
            </div>

            <div className="detail-section">
              <h4>Diagnosis</h4>
              <p>{selectedConsult.diagnosis || 'Pending diagnosis'}</p>
            </div>

            <div className="detail-section">
              <h4>Prescription</h4>
              <p>{selectedConsult.prescription || 'No prescription given'}</p>
            </div>

            <div className="detail-section">
              <h4>Notes</h4>
              <p>{selectedConsult.notes || 'No additional notes'}</p>
            </div>
          </div>

          {selectedConsult.status !== 'Completed' && (
            <div className="consultation-actions">
              <Button variant="primary">Update Consultation</Button>
              <Button variant="outline">Add Prescription</Button>
              <Button variant="outline">Schedule Follow-up</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="consultations-list">
          <div className="filter-section">
            <select className="filter-select">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className="consultations-grid">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="consultation-card">
                <div className="card-header">
                  <h3>{consultation.patient}</h3>
                  <div className={`status-badge status-${consultation.status.toLowerCase().replace(' ', '-')}`}>
                    {consultation.status}
                  </div>
                </div>
                
                <div className="card-content">
                  <p><strong>Date:</strong> {consultation.date}</p>
                  <p><strong>Time:</strong> {consultation.time}</p>
                  <p><strong>Symptoms:</strong> {consultation.symptoms}</p>
                  {consultation.diagnosis && (
                    <p><strong>Diagnosis:</strong> {consultation.diagnosis}</p>
                  )}
                </div>
                
                <div className="card-actions">
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => handleViewDetails(consultation)}
                  >
                    View Details
                  </Button>
                  {consultation.status === 'Scheduled' && (
                    <Button variant="primary" size="small">
                      Start Consultation
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Consult;