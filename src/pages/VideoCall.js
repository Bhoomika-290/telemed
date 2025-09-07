import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageCircle, 
  Users, 
  Settings,
  Monitor,
  Camera,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { appointmentService, consultationService } from '../utils/firestoreUtils';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const VideoCall = () => {
  const { userData, currentUser } = useAuth();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callSettings, setCallSettings] = useState({
    isMuted: false,
    isVideoOff: false,
    isSpeakerOff: false,
    isRecording: false,
    screenSharing: false
  });
  const [callDuration, setCallDuration] = useState(0);
  const [callNotes, setCallNotes] = useState('');
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [callStartTime, setCallStartTime] = useState(null);

  useEffect(() => {
    fetchAvailableAppointments();
  }, [currentUser, userData]);

  useEffect(() => {
    let interval;
    if (isCallActive && callStartTime) {
      interval = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive, callStartTime]);

  const fetchAvailableAppointments = async () => {
    if (!currentUser || !userData) return;

    try {
      setLoading(true);
      const appointments = await appointmentService.getByUser(
        currentUser.uid,
        userData.userType
      );
      
      // Filter for confirmed video call appointments
      const videoAppointments = appointments.filter(
        appointment => 
          appointment.type === 'video' && 
          appointment.status === 'confirmed'
      );
      
      setAvailableAppointments(videoAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCall = async (appointment) => {
    try {
      setSelectedAppointment(appointment);
      setIsCallActive(true);
      setCallStartTime(Date.now());
      
      // Update appointment status to 'in-progress'
      await appointmentService.update(appointment.id, { 
        status: 'in-progress',
        callStartTime: new Date().toISOString()
      });
      
      toast.success('Call started successfully');
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error('Failed to start call');
    }
  };

  const handleEndCall = async () => {
    try {
      if (selectedAppointment) {
        // Create consultation record
        const consultationData = {
          appointmentId: selectedAppointment.id,
          patientId: selectedAppointment.patientId,
          patientName: selectedAppointment.patientName,
          doctorId: selectedAppointment.doctorId,
          doctorName: selectedAppointment.doctorName,
          type: 'video_call',
          duration: callDuration,
          notes: callNotes,
          status: 'completed',
          callEndTime: new Date().toISOString()
        };

        await consultationService.create(consultationData);
        
        // Update appointment status
        await appointmentService.update(selectedAppointment.id, { 
          status: 'completed',
          callEndTime: new Date().toISOString(),
          duration: callDuration
        });
      }

      // Reset call state
      setIsCallActive(false);
      setCallSettings({
        isMuted: false,
        isVideoOff: false,
        isSpeakerOff: false,
        isRecording: false,
        screenSharing: false
      });
      setCallDuration(0);
      setCallNotes('');
      setSelectedAppointment(null);
      setCallStartTime(null);
      
      toast.success('Call ended successfully');
      
      // Refresh appointments
      await fetchAvailableAppointments();
      
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Failed to end call properly');
    }
  };

  const toggleSetting = (setting) => {
    setCallSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    // Show appropriate feedback
    const messages = {
      isMuted: prev => prev ? 'Microphone unmuted' : 'Microphone muted',
      isVideoOff: prev => prev ? 'Camera turned on' : 'Camera turned off',
      isSpeakerOff: prev => prev ? 'Speaker turned on' : 'Speaker muted',
      screenSharing: prev => prev ? 'Screen sharing stopped' : 'Screen sharing started',
      isRecording: prev => prev ? 'Recording stopped' : 'Recording started'
    };

    if (messages[setting]) {
      toast.success(messages[setting](callSettings[setting]));
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="page">
        <LoadingSpinner size="large" message="Loading video call interface..." />
      </div>
    );
  }

  if (!isCallActive) {
    return (
      <div className="page fade-in">
        <div className="page-header">
          <div>
            <h1>Video Call</h1>
            <p>Connect with {userData?.userType === 'doctor' ? 'patients' : 'doctors'} through secure video calls</p>
          </div>
        </div>

        <div className="call-setup">
          <div className="setup-card">
            <div className="setup-header">
              <Video size={48} />
              <h2>Start Video Call</h2>
              <p>Choose an appointment to start a video consultation</p>
            </div>
            
            {availableAppointments.length > 0 ? (
              <div className="patient-selection">
                <h3>Available Video Appointments</h3>
                <div className="patient-list">
                  {availableAppointments.map((appointment) => (
                    <div key={appointment.id} className="patient-item">
                      <div className="patient-avatar">
                        <div className="avatar-circle">
                          {getInitials(
                            userData?.userType === 'doctor' 
                              ? appointment.patientName 
                              : appointment.doctorName
                          )}
                        </div>
                        <div className="status-indicator online"></div>
                      </div>
                      
                      <div className="patient-info">
                        <h4>
                          {userData?.userType === 'doctor' 
                            ? appointment.patientName 
                            : appointment.doctorName}
                        </h4>
                        <p>Scheduled: {formatDateTime(appointment.appointmentDate)}</p>
                        <span className="appointment-type">{appointment.type} • {appointment.reason}</span>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        onClick={() => handleStartCall(appointment)}
                        className="start-call-btn"
                      >
                        <Video size={18} />
                        Start Call
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <Users size={48} />
                <h3>No video appointments available</h3>
                <p>
                  {userData?.userType === 'doctor' 
                    ? "You don't have any confirmed video appointments at the moment."
                    : "You don't have any confirmed video appointments scheduled."}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/appointment'}
                  style={{ marginTop: '1rem' }}
                >
                  {userData?.userType === 'doctor' ? 'Manage Schedule' : 'Book Appointment'}
                </Button>
              </div>
            )}

            <div className="call-settings">
              <h3>Call Preferences</h3>
              <div className="settings-grid">
                <label className="setting-item">
                  <input 
                    type="checkbox" 
                    checked={!callSettings.isVideoOff}
                    onChange={() => toggleSetting('isVideoOff')}
                  />
                  <Camera size={18} />
                  <span>Enable camera</span>
                </label>
                
                <label className="setting-item">
                  <input 
                    type="checkbox" 
                    checked={!callSettings.isMuted}
                    onChange={() => toggleSetting('isMuted')}
                  />
                  <Mic size={18} />
                  <span>Enable microphone</span>
                </label>
                
                <label className="setting-item">
                  <input 
                    type="checkbox" 
                    checked={callSettings.isRecording}
                    onChange={() => toggleSetting('isRecording')}
                  />
                  <Video size={18} />
                  <span>Record session</span>
                </label>
                
                <label className="setting-item">
                  <input 
                    type="checkbox" 
                    checked={!callSettings.isSpeakerOff}
                    onChange={() => toggleSetting('isSpeakerOff')}
                  />
                  <Volume2 size={18} />
                  <span>Enable speaker</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="video-call-interface">
        <div className="call-header">
          <div className="call-info">
            <h2>
              Video Call with {
                userData?.userType === 'doctor' 
                  ? selectedAppointment?.patientName 
                  : selectedAppointment?.doctorName
              }
            </h2>
            <div className="call-status">
              <div className="status-indicator online"></div>
              <span>Connected</span>
            </div>
          </div>
          
          <div className="call-timer">
            {formatDuration(callDuration)}
          </div>
        </div>

        <div className="video-container">
          <div className="remote-video">
            <div className="video-placeholder">
              <div className="avatar">
                {getInitials(
                  userData?.userType === 'doctor' 
                    ? selectedAppointment?.patientName 
                    : selectedAppointment?.doctorName
                )}
              </div>
              <p>
                {userData?.userType === 'doctor' 
                  ? selectedAppointment?.patientName 
                  : selectedAppointment?.doctorName}
              </p>
              {callSettings.isVideoOff && <p className="video-status">Camera Off</p>}
            </div>
          </div>

          <div className="local-video">
            <div className="video-placeholder small">
              <div className="avatar small">
                {getInitials(userData?.displayName || 'You')}
              </div>
              <p>You</p>
              {callSettings.isVideoOff && <p className="video-status">Camera Off</p>}
            </div>
          </div>

          {callSettings.screenSharing && (
            <div className="screen-share-indicator">
              <Monitor size={20} />
              <span>Screen Sharing</span>
            </div>
          )}
        </div>

        <div className="call-controls">
          <Button 
            variant={callSettings.isMuted ? "danger" : "outline"}
            onClick={() => toggleSetting('isMuted')}
            className="control-btn"
            title={callSettings.isMuted ? "Unmute" : "Mute"}
          >
            {callSettings.isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>

          <Button 
            variant={callSettings.isVideoOff ? "danger" : "outline"}
            onClick={() => toggleSetting('isVideoOff')}
            className="control-btn"
            title={callSettings.isVideoOff ? "Turn on camera" : "Turn off camera"}
          >
            {callSettings.isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </Button>

          <Button 
            variant={callSettings.isSpeakerOff ? "danger" : "outline"}
            onClick={() => toggleSetting('isSpeakerOff')}
            className="control-btn"
            title={callSettings.isSpeakerOff ? "Unmute speaker" : "Mute speaker"}
          >
            {callSettings.isSpeakerOff ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </Button>

          <Button 
            variant="outline"
            onClick={() => toggleSetting('screenSharing')}
            className="control-btn"
            title="Share screen"
          >
            <Monitor size={24} />
          </Button>

          <Button 
            variant="outline"
            className="control-btn"
            title="Open chat"
          >
            <MessageCircle size={24} />
          </Button>

          <Button 
            variant={callSettings.isRecording ? "danger" : "outline"}
            onClick={() => toggleSetting('isRecording')}
            className="control-btn"
            title={callSettings.isRecording ? "Stop recording" : "Start recording"}
          >
            <Video size={24} />
          </Button>

          <Button 
            variant="danger"
            onClick={handleEndCall}
            className="control-btn end-call"
          >
            <PhoneOff size={24} />
            End Call
          </Button>
        </div>

        <div className="call-notes">
          <h3>Call Notes</h3>
          <textarea 
            placeholder="Add notes during the call..."
            className="notes-input"
            rows="4"
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
          />
          <div className="notes-actions">
            <Button variant="outline" size="small">
              Save Notes
            </Button>
            <small style={{ color: 'var(--text-muted)' }}>
              Notes will be automatically saved when the call ends
            </small>
          </div>
        </div>

        {/* Call Quality Indicator */}
        <div className="call-quality">
          <div className="quality-indicator good">
            <div className="signal-bars">
              <div className="bar active"></div>
              <div className="bar active"></div>
              <div className="bar active"></div>
              <div className="bar active"></div>
            </div>
            <span>Excellent connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;