import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const redirectToYoti = (sessionId, sdkId) => {
    console.log('Redirecting to Yoti age estimation...');
    // Store session info for polling later
    localStorage.setItem('yotiSessionId', sessionId);
    localStorage.setItem('yotiSdkId', sdkId);
    
    // Redirect to Yoti age estimation - Yoti will redirect back to /result automatically
    window.location.href = `https://age.yoti.com/age-estimation?sessionId=${sessionId}&sdkId=${sdkId}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call backend API to create session
      const response = await axios.post('http://localhost:8080/api/yoti/create-session', formData);
      
      // Store session data in localStorage
      localStorage.setItem('sessionId', response.data.sessionId);
      localStorage.setItem('sdkId', response.data.sdkId);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Redirect to Yoti immediately
      redirectToYoti(response.data.sessionId, response.data.sdkId);
    } catch (err) {
      console.error('Error creating session:', err);
      setError(err.response?.data?.error || 'Failed to create verification session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gaming-container">
      <div className="gaming-card fade-in">
        <h1 className="gaming-title">GamingYoti</h1>
        <p className="gaming-subtitle">
          Join the gaming community with secure age verification
        </p>
        
        <form onSubmit={handleSubmit} className="gaming-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your gaming username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Create a secure password"
              required
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="gaming-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Preparing Verification...
              </>
            ) : (
              'Verify Age to Sign Up'
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '30px', textAlign: 'center', color: '#6c757d', fontSize: '14px' }}>
          <p>You will be redirected to Yoti's secure age verification</p>
          <p>Must be 18+ to join GamingYoti</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
