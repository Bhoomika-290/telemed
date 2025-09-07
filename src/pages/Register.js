import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, Phone, MapPin, Calendar, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Common/Button';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Register = () => {
  const { signup } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    // Doctor specific fields
    specialization: '',
    license: '',
    experience: '',
    consultationFee: '',
    // Patient specific fields
    bloodType: '',
    height: '',
    weight: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, password, confirmPassword, userType } = formData;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { phone, dateOfBirth } = formData;
    
    if (!phone || !dateOfBirth) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData);
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email address already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = error.message || 'An error occurred during registration.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <LoadingSpinner size="large" message="Creating your account..." />
      </div>
    );
  }

  const renderStep1 = () => (
    <>
      <div className="form-row">
        <div className="input-group modern half-width">
          <div className="input-icon">
            <User size={20} />
          </div>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="input-field modern"
            required
          />
        </div>
        
        <div className="input-group modern half-width">
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="input-field modern"
            required
          />
        </div>
      </div>
      
      <div className="input-group modern">
        <div className="input-icon">
          <Mail size={20} />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          className="input-field modern"
          required
        />
      </div>
      
      <div className="input-group modern">
        <label className="input-label modern">I am a:</label>
        <div className="user-type-selector">
          <label className={`user-type-option ${formData.userType === 'patient' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="userType"
              value="patient"
              checked={formData.userType === 'patient'}
              onChange={handleInputChange}
            />
            <div className="option-content">
              <div className="option-icon">👤</div>
              <span>Patient</span>
            </div>
          </label>
          <label className={`user-type-option ${formData.userType === 'doctor' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="userType"
              value="doctor"
              checked={formData.userType === 'doctor'}
              onChange={handleInputChange}
            />
            <div className="option-content">
              <div className="option-icon">👨‍⚕️</div>
              <span>Doctor</span>
            </div>
          </label>
        </div>
      </div>
      
      <div className="input-group modern">
        <div className="input-icon">
          <Lock size={20} />
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleInputChange}
          className="input-field modern"
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <div className="input-group modern">
        <div className="input-icon">
          <Lock size={20} />
        </div>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="input-field modern"
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="input-group modern">
        <div className="input-icon">
          <Phone size={20} />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleInputChange}
          className="input-field modern"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="input-group modern half-width">
          <div className="input-icon">
            <Calendar size={20} />
          </div>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="input-field modern"
            required
          />
        </div>
        
        <div className="input-group modern half-width">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="input-field modern"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
      
      <div className="input-group modern">
        <div className="input-icon">
          <MapPin size={20} />
        </div>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="input-field modern"
          rows="3"
        />
      </div>
    </>
  );

  const renderStep3 = () => {
    if (formData.userType === 'doctor') {
      return (
        <>
          <div className="input-group modern">
            <input
              type="text"
              name="specialization"
              placeholder="Medical specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="input-field modern"
            />
          </div>
          
          <div className="form-row">
            <div className="input-group modern half-width">
              <input
                type="text"
                name="license"
                placeholder="Medical license number"
                value={formData.license}
                onChange={handleInputChange}
                className="input-field modern"
              />
            </div>
            
            <div className="input-group modern half-width">
              <input
                type="number"
                name="experience"
                placeholder="Years of experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="input-field modern"
                min="0"
              />
            </div>
          </div>
          
          <div className="input-group modern">
            <input
              type="number"
              name="consultationFee"
              placeholder="Consultation fee (USD)"
              value={formData.consultationFee}
              onChange={handleInputChange}
              className="input-field modern"
              min="0"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="form-row">
            <div className="input-group modern third-width">
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="input-field modern"
              >
                <option value="">Blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div className="input-group modern third-width">
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleInputChange}
                className="input-field modern"
                min="0"
              />
            </div>
            
            <div className="input-group modern third-width">
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleInputChange}
                className="input-field modern"
                min="0"
              />
            </div>
          </div>
          
          <div className="section-title">Emergency Contact</div>
          
          <div className="input-group modern">
            <input
              type="text"
              name="emergencyContact.name"
              placeholder="Emergency contact name"
              value={formData.emergencyContact.name}
              onChange={handleInputChange}
              className="input-field modern"
            />
          </div>
          
          <div className="form-row">
            <div className="input-group modern half-width">
              <input
                type="tel"
                name="emergencyContact.phone"
                placeholder="Emergency contact phone"
                value={formData.emergencyContact.phone}
                onChange={handleInputChange}
                className="input-field modern"
              />
            </div>
            
            <div className="input-group modern half-width">
              <input
                type="text"
                name="emergencyContact.relationship"
                placeholder="Relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleInputChange}
                className="input-field modern"
              />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glass-card register">
        <div className="auth-header">
          <div className="logo-container">
            <div className="logo-icon">
              <Stethoscope size={32} />
            </div>
            <h1>TeleMed+</h1>
          </div>
          <h2>Create Account</h2>
          <p>Join our healthcare community</p>
        </div>
        
        {/* Progress Indicator */}
        <div className="progress-indicator">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 ? 'Account' : step === 2 ? 'Personal' : 'Additional'}
              </div>
            </div>
          ))}
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevStep}
                className="nav-button"
              >
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button 
                type="button" 
                variant="primary" 
                onClick={handleNextStep}
                className="nav-button"
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit" 
                variant="primary" 
                className="auth-button modern"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            )}
          </div>
        </form>
        
        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>
        
        <div className="auth-footer">
          <Link to="/login" className="auth-link modern">
            Sign in instead
          </Link>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="auth-bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
};

export default Register;