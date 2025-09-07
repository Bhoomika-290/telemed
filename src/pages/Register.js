import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration data:', formData);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>TeleMed+</h1>
          <h2>Create Account</h2>
          <p>Join our telemedicine platform</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="half-width"
            />
            
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="half-width"
            />
          </div>
          
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <div className="input-group">
            <label className="input-label">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          
          <Button type="submit" variant="primary" className="auth-button">
            Create Account
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? 
            <Link to="/login" className="auth-link"> Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;