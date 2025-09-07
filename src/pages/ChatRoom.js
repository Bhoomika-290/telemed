import React, { useState } from 'react';
import Button from '../components/Common/Button';

const ChatRoom = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const chatList = [
    {
      id: 1,
      patient: 'John Smith',
      lastMessage: 'Thank you doctor, I feel much better now.',
      timestamp: '2 min ago',
      unread: 0,
      status: 'online'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      lastMessage: 'When should I take the medication?',
      timestamp: '15 min ago',
      unread: 2,
      status: 'offline'
    },
    {
      id: 3,
      patient: 'Mike Davis',
      lastMessage: 'I have some questions about the prescription.',
      timestamp: '1 hour ago',
      unread: 1,
      status: 'online'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'patient',
      content: 'Hello Doctor, I have some concerns about my symptoms.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'doctor',
      content: 'Hello John, I understand your concerns. Can you describe your symptoms in detail?',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      sender: 'patient',
      content: 'I have been experiencing headaches and fatigue for the past few days.',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      sender: 'doctor',
      content: 'I see. How would you rate the pain on a scale of 1-10? And have you been getting enough sleep?',
      timestamp: '10:37 AM'
    },
    {
      id: 5,
      sender: 'patient',
      content: 'The pain is about 6-7. My sleep has been disturbed lately.',
      timestamp: '10:40 AM'
    }
  ];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Chat Room</h1>
        <p>Communicate with patients through secure messaging</p>
      </div>

      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Conversations</h3>
            <Button variant="outline" size="small">
              New Chat
            </Button>
          </div>

          <div className="chat-list">
            {chatList.map((chat) => (
              <div 
                key={chat.id} 
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="chat-avatar">
                  <div className="avatar-circle">
                    {chat.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`status-indicator ${chat.status}`}></div>
                </div>
                
                <div className="chat-info">
                  <div className="chat-header">
                    <h4>{chat.patient}</h4>
                    <span className="timestamp">{chat.timestamp}</span>
                  </div>
                  <p className="last-message">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="unread-badge">{chat.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="patient-info">
                  <div className="avatar-circle">
                    {selectedChat.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3>{selectedChat.patient}</h3>
                    <p className={`status ${selectedChat.status}`}>
                      {selectedChat.status === 'online' ? 'Online' : 'Last seen 1 hour ago'}
                    </p>
                  </div>
                </div>
                
                <div className="chat-actions">
                  <Button variant="outline" size="small">
                    📞 Call
                  </Button>
                  <Button variant="outline" size="small">
                    📹 Video
                  </Button>
                </div>
              </div>

              <div className="messages-container">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'doctor' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="message-input-form" onSubmit={handleSendMessage}>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                  />
                  <Button type="submit" variant="primary" className="send-button">
                    Send
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <h3>No conversation selected</h3>
                <p>Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;