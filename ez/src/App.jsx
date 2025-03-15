import React, { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import presentation from './assets/presentation.png';
import audiovidep from './assets/audio-video.png';
import translation from './assets/translation.png';
import graphic from './assets/graphic.png';
import research from './assets/research.png';
import data from './assets/data.png';

const App = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('https://test.ezworks.ai/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          setError(data.message || 'Email domain not allowed');
        } else {
          setError(data.message || 'An error occurred. Please try again.');
        }
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: presentation,
      title: "Presentation Design",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    },
    {
      icon: audiovidep,
      title: "Audio - Visual Production",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    },
    {
      icon: translation,
      title: "Translation Services",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    },
    {
      icon: graphic,
      title: "Graphic Design",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    },
    {
      icon: research,
      title: "Research & Analytics",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    },
    {
      icon: data,
      title: "Data Processing",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet"
    }
  ];

  return (
    <div className="app-container">
      <div className="container">
        <div className="flex-layout">
          <div className="left-column">
            <header className="site-header">
              <div className="logo-container">
                <img src={logo} alt="EZ Works Logo" />
              </div>
            </header>
            
            <h2 className="main-title">
              Suite Of Business Support Services
            </h2>
            
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit, sed
            </p>
            
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={error ? 'form-input error' : 'form-input'}
                    placeholder="Email Address"
                    value={success ? "Form Submitted" : email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={success}
                  />
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? 'Submitting...' : 'Contact Me'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="right-column">
            <div className="services-grid">
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-header">
                    <span className="service-icon">
                      <img src={service.icon} alt={service.title + " icon"} />
                    </span>
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                  <p className="service-description">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="form-container-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={error ? 'form-input error' : 'form-input'}
                    placeholder="Email Address"
                    value={success ? "Form Submitted" : email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={success}
                  />
                  {error && <p className="error-message">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? 'Submitting...' : 'Contact Me'}
                </button>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;