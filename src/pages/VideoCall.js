import React, { useState } from 'react';
import Button from '../components/Common/Button';

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Video Call</h1>
        <p>Connect with patients through secure video calls</p>
      </div>

      {!isCallActive ? (
        <div className="call-setup">
          <div className="setup-card">
            <h2>Start Video Call</h2>
            <p>Choose a patient to start a video consultation</p>
            
            <div className="patient-selection">
              <h3>Select Patient</h3>
              <div className="patient-list">
                <div className="patient-item">
                  <div className="patient-info">
                    <h4>John Smith</h4>
                    <p>Scheduled: 10:00 AM</p>
                  </div>
                  <Button variant="primary" onClick={handleStartCall}>
                    Start Call
                  </Button>
                </div>
                
                <div className="patient-item">
                  <div className="patient-info">
                    <h4>Sarah Johnson</h4>
                    <p>Scheduled: 11:30 AM</p>
                  </div>
                  <Button variant="outline" disabled>
                    Not Ready
                  </Button>
                </div>
                
                <div className="patient-item">
                  <div className="patient-info">
                    <h4>Mike Davis</h4>
                    <p>Scheduled: 2:00 PM</p>
                  </div>
                  <Button variant="outline" disabled>
                    Waiting
                  </Button>
                </div>
              </div>
            </div>

            <div className="call-settings">
              <h3>Call Settings</h3>
              <div className="settings-options">
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  Enable camera
                </label>
                <label className="setting-item">
                  <input type="checkbox" defaultChecked />
                  Enable microphone
                </label>
                <label className="setting-item">
                  <input type="checkbox" />
                  Record session
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-call-interface">
          <div className="call-header">
            <h2>Video Call with John Smith</h2>
            <div className="call-timer">15:32</div>
          </div>

          <div className="video-container">
            <div className="remote-video">
              <div className="video-placeholder">
                <div className="avatar">JS</div>
                <p>John Smith</p>
                {isVideoOff && <p className="video-status">Camera Off</p>}
              </div>
            </div>

            <div className="local-video">
              <div className="video-placeholder small">
                <div className="avatar small">DR</div>
                <p>You</p>
                {isVideoOff && <p className="video-status">Camera Off</p>}
              </div>
            </div>
          </div>

          <div className="call-controls">
            <Button 
              variant={isMuted ? "danger" : "outline"}
              onClick={toggleMute}
              className="control-btn"
            >
              {isMuted ? "🔇" : "🎤"}
            </Button>

            <Button 
              variant={isVideoOff ? "danger" : "outline"}
              onClick={toggleVideo}
              className="control-btn"
            >
              {isVideoOff ? "📷" : "📹"}
            </Button>

            <Button 
              variant="outline"
              className="control-btn"
            >
              💬
            </Button>

            <Button 
              variant="outline"
              className="control-btn"
            >
              📱
            </Button>

            <Button 
              variant="danger"
              onClick={handleEndCall}
              className="control-btn end-call"
            >
              📞 End Call
            </Button>
          </div>

          <div className="call-notes">
            <h3>Call Notes</h3>
            <textarea 
              placeholder="Add notes during the call..."
              className="notes-input"
              rows="4"
            />
            <Button variant="outline" size="small">
              Save Notes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;