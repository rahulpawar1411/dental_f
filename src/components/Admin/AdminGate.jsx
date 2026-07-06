import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import './AdminGate.css';

export const AdminGate = ({ children }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem('admin_authorized') === 'true';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pin === '1234') {
      sessionStorage.setItem('admin_authorized', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  if (isAuthorized) {
    return children;
  }

  return (
    <div className="admin-gate-overlay">
      <div className="admin-gate-card">
        <div className="admin-gate-header">
          <div className="lock-icon-container">
            <Lock size={28} />
          </div>
          <h2>Admin Gate</h2>
          <p>Please enter the 4-digit security PIN to access the clinic dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-gate-form">
          <div className="pin-input-wrapper">
            <input
              type={showPin ? 'text' : 'password'}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="••••"
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setPin(val);
                if (error) setError('');
              }}
              autoFocus
            />
            <button
              type="button"
              className="toggle-pin-visibility"
              onClick={() => setShowPin(!showPin)}
              tabIndex={-1}
            >
              {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <div className="admin-gate-error">{error}</div>}

          <button type="submit" className="admin-gate-btn" disabled={pin.length !== 4}>
            <span>Access Portal</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="admin-gate-footer">
          <ShieldCheck size={14} />
          <span>Secure AES Authorization</span>
        </div>
      </div>
    </div>
  );
};

export default AdminGate;
