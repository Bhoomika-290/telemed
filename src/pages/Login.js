import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login data:', formData);
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>TeleMed+</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          <Button type="submit" variant="primary" className="auth-button">
            Sign In
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? 
            <Link to="/register" className="auth-link"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;