import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
  const [sessionId, setSessionId] = useState('');
  const [sdkId, setSdkId] = useState('');
  const [currentMethod, setCurrentMethod] = useState('age-estimation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get session data from localStorage
    const storedSessionId = localStorage.getItem('sessionId');
    const storedSdkId = localStorage.getItem('sdkId');
    
    if (!storedSessionId || !storedSdkId) {
      setError('No verification session found. Please start from the beginning.');
      setLoading(false);
      return;
    }
    
    setSessionId(storedSessionId);
    setSdkId(storedSdkId);
    setLoading(false);
  }, []);

  const getVerificationUrl = (method) => {
    const baseUrl = 'https://age.yoti.com';
    const urls = {
      'age-estimation': `${baseUrl}/age-estimation?sessionId=${sessionId}&sdkId=${sdkId}`,
      'doc-scan': `${baseUrl}/doc-scan?sessionId=${sessionId}&sdkId=${sdkId}`,
      'digital-id': `${baseUrl}/yoti?sessionId=${sessionId}&sdkId=${sdkId}`
    };
    return urls[method];
  };

  const handleMethodChange = (method) => {
    setCurrentMethod(method);
  };

  const handleVerificationError = () => {
    setError('Verification failed. Please try a different method.');
  };

  if (loading) {
    return (
      <div className="gaming-container">
        <div className="gaming-card">
          <div className="verification-container">
            <div className="loading"></div>
            <p className="verification-message">Loading verification...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gaming-container">
        <div className="gaming-card">
          <div className="verification-container">
            <div className="error-message">
              {error}
            </div>
            <button 
              className="gaming-button"
              onClick={() => navigate('/')}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gaming-container">
      <div className="gaming-card fade-in">
        <h1 className="gaming-title">Age Verification</h1>
        <p className="gaming-subtitle">
          Please complete age verification to join GamingYoti
        </p>
        
        <div className="verification-container">
          <div className="verification-message">
            Verifying your age...
          </div>
          
          {/* Method selection buttons */}
          <div className="method-buttons">
            <button
              className={`method-button ${currentMethod === 'age-estimation' ? 'active' : ''}`}
              onClick={() => handleMethodChange('age-estimation')}
            >
              Age Estimation
            </button>
            <button
              className={`method-button ${currentMethod === 'doc-scan' ? 'active' : ''}`}
              onClick={() => handleMethodChange('doc-scan')}
            >
              ID Verification
            </button>
            <button
              className={`method-button ${currentMethod === 'digital-id' ? 'active' : ''}`}
              onClick={() => handleMethodChange('digital-id')}
            >
              Digital ID
            </button>
          </div>
          
          {/* Yoti verification iframe */}
          <iframe
            src={getVerificationUrl(currentMethod)}
            className="verification-iframe"
            title="Yoti Age Verification"
            onLoad={() => {
              console.log('Verification iframe loaded');
            }}
            onError={() => {
              console.error('Verification iframe error');
              handleVerificationError();
            }}
          />
          
          <div style={{ marginTop: '20px', color: '#6c757d', fontSize: '14px' }}>
            <p>Your verification is secure and encrypted</p>
            <p>If one method fails, try another method above</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
