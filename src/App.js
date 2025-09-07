import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Consult from './pages/Consult';
import VideoCall from './pages/VideoCall';
import ChatRoom from './pages/ChatRoom';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/home" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/appointment" element={
            <Layout>
              <Appointment />
            </Layout>
          } />
          <Route path="/consult" element={
            <Layout>
              <Consult />
            </Layout>
          } />
          <Route path="/video-call" element={
            <Layout>
              <VideoCall />
            </Layout>
          } />
          <Route path="/chatroom" element={
            <Layout>
              <ChatRoom />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;