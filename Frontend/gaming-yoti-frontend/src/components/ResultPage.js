import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pollForResults = async () => {
      try {
        // Get sessionId from URL parameters (when redirected from Yoti) or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const sessionIdFromUrl = urlParams.get('sessionId');
        const sessionId = sessionIdFromUrl || localStorage.getItem('yotiSessionId');
        const storedUserData = localStorage.getItem('userData');
        
        if (!sessionId) {
          setError('No verification session found. Please start from the beginning.');
          setLoading(false);
          return;
        }
        
        console.log('Using session ID:', sessionId);

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }

        // Poll for results every 3 seconds using the new result API
        const pollInterval = setInterval(async () => {
          try {
            console.log('Polling for verification results...');
            const response = await axios.get(`http://localhost:8080/api/yoti/session-result?sessionId=${sessionId}`);
            
            console.log('Polling result:', response.data);
            
            // Check if verification is complete
            if (response.data.status === 'COMPLETE' || response.data.status === 'FAIL' || response.data.status === 'ERROR') {
              console.log('Verification completed with status:', response.data.status);
              setVerificationResult(response.data);
              setLoading(false);
              clearInterval(pollInterval);
            } else if (response.data.status === 'PENDING' || response.data.status === 'IN_PROGRESS') {
              console.log('Verification still in progress, status:', response.data.status);
            }
            
          } catch (err) {
            console.error('Error polling for results:', err);
            // Continue polling on error
          }
        }, 3000);

        // Stop polling after 5 minutes (300 seconds)
        setTimeout(() => {
          clearInterval(pollInterval);
          if (loading) {
            setError('Verification timed out. Please try again.');
            setLoading(false);
          }
        }, 300000);

        // Initial fetch using result API
        try {
          const response = await axios.get(`http://localhost:8080/api/yoti/session-result?sessionId=${sessionId}`);
          if (response.data.status === 'COMPLETE' || response.data.status === 'FAIL' || response.data.status === 'ERROR') {
            setVerificationResult(response.data);
            setLoading(false);
            clearInterval(pollInterval);
          }
        } catch (err) {
          console.error('Error in initial fetch:', err);
        }
        
      } catch (err) {
        console.error('Error setting up polling:', err);
        setError('Failed to retrieve verification result. Please try again.');
        setLoading(false);
      }
    };

    pollForResults();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETE':
      case 'SUCCESS':
        return '✅';
      case 'FAIL':
      case 'FAILED':
        return '❌';
      case 'PENDING':
        return '⏳';
      default:
        return '❓';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETE':
      case 'SUCCESS':
        return 'status-success';
      case 'FAIL':
      case 'FAILED':
        return 'status-error';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  };

  const getMethodDisplayName = (method) => {
    switch (method) {
      case 'AGE_ESTIMATION':
        return 'Age Estimation';
      case 'DOC_SCAN':
        return 'ID Verification';
      case 'DIGITAL_ID':
        return 'Digital ID';
      default:
        return method || 'Unknown';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  const handleStartOver = () => {
    // Clear localStorage
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sdkId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    
    // Navigate to landing page
    navigate('/');
  };

  const handleRetry = () => {
    navigate('/verify');
  };

  if (loading) {
    return (
      <div className="gaming-container">
        <div className="gaming-card">
          <div className="result-container">
            <div className="loading"></div>
            <p className="verification-message">Waiting for age verification to complete...</p>
            <p style={{ fontSize: '14px', color: '#6c757d', marginTop: '10px' }}>
              Please complete the verification on Yoti's page, then return here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gaming-container">
        <div className="gaming-card">
          <div className="result-container">
            <div className="error-message">
              {error}
            </div>
            <button 
              className="gaming-button"
              onClick={handleStartOver}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = verificationResult?.status === 'COMPLETE' || verificationResult?.status === 'SUCCESS' || verificationResult?.verification_successful === true;
  const isFailed = verificationResult?.status === 'FAIL' || verificationResult?.status === 'FAILED' || verificationResult?.status === 'ERROR' || verificationResult?.status === 'CANCELLED' || verificationResult?.status === 'EXPIRED';
  const isPending = verificationResult?.status === 'PENDING' || verificationResult?.status === 'IN_PROGRESS';

  return (
    <div className="gaming-container">
      <div className="gaming-card fade-in">
        <div className="result-container">
          <div className="result-card">
            <div className="result-icon">
              {getStatusIcon(verificationResult?.status)}
            </div>
            
            <h1 className={`result-title ${getStatusColor(verificationResult?.status)}`}>
              {isSuccess ? 'Welcome to GamingYoti!' : 
               isFailed ? 'Verification Failed' : 
               isPending ? 'Verification Pending' : 
               'Verification Status'}
            </h1>
            
            {userData && (
              <p style={{ marginBottom: '30px', color: '#6c757d' }}>
                Welcome, <strong style={{ color: '#007bff' }}>{userData.username}</strong>!
              </p>
            )}
            
            {/* Enhanced Status Message */}
            <div className="result-message" style={{ 
              marginBottom: '20px', 
              padding: '20px', 
              backgroundColor: isSuccess ? '#d4edda' : isFailed ? '#f8d7da' : '#fff3cd',
              border: `1px solid ${isSuccess ? '#c3e6cb' : isFailed ? '#f5c6cb' : '#ffeaa7'}`,
              borderRadius: '8px',
              color: isSuccess ? '#155724' : isFailed ? '#721c24' : '#856404',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              {isSuccess ? (
                <div>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
                  <div>User is old enough to login</div>
                </div>
              ) : isFailed ? (
                <div>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>❌</div>
                  <div>Sorry, you do not meet the requirement.</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                  <div>{verificationResult?.message || 'Verification in progress...'}</div>
                </div>
              )}
            </div>

            <div className="result-details">
              <div className="result-detail">
                <span className="result-detail-label">Method:</span>
                <span className="result-detail-value">
                  {getMethodDisplayName(verificationResult?.method || verificationResult?.verification_method_used)}
                </span>
              </div>
              
              <div className="result-detail">
                <span className="result-detail-label">Verification Timestamp:</span>
                <span className="result-detail-value">
                  {verificationResult?.updated_at ? 
                    new Date(verificationResult.updated_at).toLocaleString() : 
                    new Date().toLocaleString()
                  }
                </span>
              </div>
              
              <div className="result-detail">
                <span className="result-detail-label">Session Status:</span>
                <span className={`result-detail-value ${getStatusColor(verificationResult?.status)}`}>
                  {verificationResult?.status || 'Unknown'}
                </span>
              </div>
            </div>
            
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {isSuccess ? (
                <div className="success-message">
                  Your age has been successfully verified! You can now access all GamingYoti features.
                </div>
              ) : isFailed ? (
                <>
                  <button 
                    className="gaming-button"
                    onClick={handleRetry}
                    style={{ background: '#dc3545' }}
                  >
                    Try Again
                  </button>
                  <button 
                    className="gaming-button"
                    onClick={handleStartOver}
                  >
                    Start Over
                  </button>
                </>
              ) : isPending ? (
                <div className="status-pending">
                  Your verification is still being processed. Please wait a moment and refresh the page.
                </div>
              ) : (
                <button 
                  className="gaming-button"
                  onClick={handleStartOver}
                >
                  Start Over
                </button>
              )}
            </div>
            
            {verificationResult?.simulated && (
              <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                background: '#fff3cd', 
                border: '1px solid #ffeaa7', 
                borderRadius: '4px',
                color: '#856404',
                fontSize: '14px'
              }}>
                This is a simulated result for testing purposes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
