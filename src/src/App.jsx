import React, { useState } from 'react';
import './App.css';
import skullLogo from '../../images/skull2.png';

function App() {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunAES = async () => {
    if (!inputText || !key) {
      setOutput('Please enter both text and encryption key.');
      return;
    }

    setLoading(true);
    setOutput('Running Python backend...');
    
    try {
      const result = await window.aesAPI.runAES(mode, inputText, key);
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.data);
      }
    } catch (e) {
      setOutput(`An unexpected error occurred: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output && !output.includes('Error:') && !output.includes('Please')) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setKey('');
    setOutput('');
  };

  const handleSwap = () => {
    if (output && !output.includes('Error:') && !output.includes('Please')) {
      setInputText(output);
      setOutput('');
      setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    }
  };

  return (
    <div className="app">
      <div className="content">
        <div className="header">
          <img src={skullLogo} alt="Skull Logo" className="lock-icon" />
          <h1>AES-256 Cipher</h1>
          <p className="subtitle">Secure Encryption with Python Backend</p>
        </div>
        
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'encrypt' ? 'active' : ''}`}
            onClick={() => setMode('encrypt')}
          >
            <span className="icon">🔐</span>
            Encrypt
          </button>
          <button 
            className={`mode-btn ${mode === 'decrypt' ? 'active' : ''}`}
            onClick={() => setMode('decrypt')}
          >
            <span className="icon">🔓</span>
            Decrypt
          </button>
        </div>

        <div className="input-section">
          <label className="input-label">
            {mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}
          </label>
          <textarea
            className="text-input"
            placeholder={mode === 'encrypt' ? "Enter your secret text here..." : "Paste encrypted text here..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="6"
          />
        </div>
        
        <div className="input-section">
          <label className="input-label">Encryption Key</label>
          <div className="password-input-wrapper">
            <input
              type={showKey ? "text" : "password"}
              className="password-input"
              placeholder="Enter a strong password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleRunAES()}
            />
            <button 
              className="toggle-visibility"
              onClick={() => setShowKey(!showKey)}
              type="button"
            >
              {showKey ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="primary-btn" 
            onClick={handleRunAES} 
            disabled={loading || !inputText || !key}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <span className="icon">{mode === 'encrypt' ? '🔐' : '🔓'}</span>
                {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
              </>
            )}
          </button>
          <button className="secondary-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        {output && (
          <div className={`output-box ${output.includes('Error:') ? 'error' : 'success'}`}>
            <div className="output-header">
              <h3>Result</h3>
              <div className="output-actions">
                {!output.includes('Error:') && !output.includes('Please') && (
                  <>
                    <button 
                      className="icon-btn" 
                      onClick={handleSwap}
                      title="Use result as input"
                    >
                      ↩️
                    </button>
                    <button 
                      className="icon-btn" 
                      onClick={handleCopy}
                      title="Copy"
                    >
                      {copied ? '✅' : '📋'}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="output-content">
              {output}
            </div>
          </div>
        )}

        <div className="info-section">
          <p className="info-text">
            <strong>💡 Tip:</strong> Use a strong password with at least 12 characters. 
            Save the encrypted text and key securely to decrypt later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;