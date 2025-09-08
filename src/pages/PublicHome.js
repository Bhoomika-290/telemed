import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Video, 
  MessageCircle, 
  Calendar, 
  Shield, 
  Clock,
  Users,
  Star,
  ArrowRight,
  Phone,
  Heart,
  Award
} from 'lucide-react';
import Button from '../components/Common/Button';

const PublicHome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: 'Video Consultations',
      description: 'Connect with healthcare professionals through secure HD video calls from anywhere.'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'Chat directly with your doctors and get quick answers to your health questions.'
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book appointments 24/7 with our intuitive scheduling system.'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Your health data is protected with enterprise-grade security and encryption.'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access healthcare when you need it, with round-the-clock availability.'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with board-certified physicians across various specializations.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Patients Served' },
    { number: '200+', label: 'Healthcare Providers' },
    { number: '98%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Available Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'TeleMed+ made it so easy to consult with my doctor during the pandemic. The video quality was excellent and the platform is very user-friendly.',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'As a healthcare provider, I appreciate how TeleMed+ streamlines patient consultations while maintaining the highest security standards.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Working Mother',
      content: 'Being able to schedule appointments around my work schedule and have consultations from home has been a game-changer for my family.',
      rating: 5
    }
  ];

  return (
    <div className="public-home">
      {/* Header */}
      <header className="public-header">
        <div className="header-content">
          <div className="logo modern">
            <div className="logo-icon">
              <Stethoscope size={32} />
            </div>
            <h2>TeleMed+</h2>
          </div>
          
          <div className="header-actions">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="login-btn"
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Healthcare at Your Fingertips</h1>
            <p className="hero-subtitle">
              Experience the future of healthcare with TeleMed+. Connect with qualified 
              doctors through secure video calls, chat consultations, and comprehensive 
              medical care from the comfort of your home.
            </p>
            
            <div className="hero-actions">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => navigate('/register')}
                className="cta-button"
              >
                Start Your Journey
                <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => navigate('/login')}
              >
                <Phone size={18} />
                Book Consultation
              </Button>
            </div>

            <div className="trust-indicators">
              <div className="trust-item">
                <Shield size={16} />
                <span>HIPAA Compliant</span>
              </div>
              <div className="trust-item">
                <Award size={16} />
                <span>Board-Certified Doctors</span>
              </div>
              <div className="trust-item">
                <Heart size={16} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="doctor-avatar">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <h3>Dr. Sarah Williams</h3>
                  <p>General Practitioner</p>
                </div>
                <div className="online-status">
                  <div className="status-dot"></div>
                  <span>Available</span>
                </div>
              </div>
              <div className="card-body">
                <p>Ready for your consultation</p>
                <div className="consultation-info">
                  <div className="info-item">
                    <Video size={16} />
                    <span>Video Call</span>
                  </div>
                  <div className="info-item">
                    <Clock size={16} />
                    <span>30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose TeleMed+?</h2>
            <p>Comprehensive healthcare solutions designed for the modern world</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started with healthcare in just three simple steps</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create Your Account</h3>
              <p>Sign up in minutes with your basic information and medical details</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Choose Your Doctor</h3>
              <p>Browse our network of qualified physicians and select the right specialist</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Start Your Consultation</h3>
              <p>Connect via video call, chat, or phone for your personalized healthcare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Real stories from real people who trust TeleMed+ with their healthcare</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar-placeholder">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Better Healthcare?</h2>
            <p>Join thousands of patients who have already transformed their healthcare experience with TeleMed+</p>
            
            <div className="cta-actions">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => navigate('/register')}
              >
                Get Started Today
                <ArrowRight size={20} />
              </Button>
              <p className="cta-note">Free account • No credit card required • Start in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="public-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo modern">
                <div className="logo-icon">
                  <Stethoscope size={24} />
                </div>
                <h3>TeleMed+</h3>
              </div>
              <p>Transforming healthcare through technology, making quality medical care accessible to everyone, everywhere.</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Platform</h4>
                <ul>
                  <li><button onClick={() => navigate('/register')}>For Patients</button></li>
                  <li><button onClick={() => navigate('/register')}>For Doctors</button></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                </ul>
              </div>
              
              <div className="link-group">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                </ul>
              </div>
              
              <div className="link-group">
                <h4>Get Started</h4>
                <ul>
                  <li><button onClick={() => navigate('/login')}>Sign In</button></li>
                  <li><button onClick={() => navigate('/register')}>Create Account</button></li>
                  <li><a href="#demo">Schedule Demo</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 TeleMed+. All rights reserved.</p>
            <p>HIPAA Compliant • SOC 2 Certified • FDA Compliant</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;