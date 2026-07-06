import React, { useState, useEffect } from 'react';
import { 
  Search, Trash2, Archive, RotateCcw, CheckCircle, Clock, 
  Check, LogOut, Calendar, User, Mail, Phone, MessageSquare, 
  AlertCircle, ShieldAlert, X
} from 'lucide-react';
import { AdminGate } from '../../components/Admin/AdminGate';
import './AdminDashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AdminDashboardContent = () => {
  const [appointments, setAppointments] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'queries' | 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Successful' | 'Completed'
  const [dateFilter, setDateFilter] = useState(''); // Date filter (YYYY-MM-DD)

  // Modal State for viewing single client/patient file
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedType, setSelectedType] = useState('appointment'); // 'appointment' | 'query'

  // Fetch admin dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin`);
      if (!response.ok) {
        throw new Error('Failed to fetch admin dashboard data.');
      }
      const data = await response.json();
      setAppointments(data.appointments || []);
      setQueries(data.queries || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server. Please make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update appointment status (Pending, Successful, Completed)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      
      // Update state locally
      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Toggle archive appointment
  const handleToggleArchiveAppointment = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/archive`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error('Failed to toggle archive');
      const resData = await response.json();

      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, archived: resData.appointment.archived } : apt
      ));
    } catch (err) {
      alert('Error archiving appointment: ' + err.message);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete appointment');
      
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    } catch (err) {
      alert('Error deleting appointment: ' + err.message);
    }
  };

  // Toggle archive query
  const handleToggleArchiveQuery = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/queries/${id}/archive`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error('Failed to toggle query archive');
      const resData = await response.json();

      setQueries(prev => prev.map(q => 
        q.id === id ? { ...q, archived: resData.query.archived } : q
      ));
    } catch (err) {
      alert('Error archiving query: ' + err.message);
    }
  };

  // Delete query
  const handleDeleteQuery = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this query?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/queries/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete query');
      
      setQueries(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      alert('Error deleting query: ' + err.message);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authorized');
    window.location.reload();
  };

  // Calculate statistics
  const activeAppointments = appointments.filter(apt => !apt.archived);
  const totalQueries = queries.filter(q => !q.archived);
  
  const stats = {
    totalAppointments: activeAppointments.length,
    pending: activeAppointments.filter(apt => apt.status === 'Pending').length,
    successful: activeAppointments.filter(apt => apt.status === 'Successful').length,
    completed: activeAppointments.filter(apt => apt.status === 'Completed').length,
    queries: totalQueries.length
  };

  // Filters & Search
  const filteredAppointments = appointments.filter(apt => {
    // Only active ones for the main appointments tab
    if (activeTab === 'appointments' && apt.archived) return false;
    // Only archived or completed ones for the history tab
    if (activeTab === 'history' && !apt.archived && apt.status !== 'Completed') return false;

    const matchesSearch = 
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.treatment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.preferredDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const filteredQueries = queries.filter(q => {
    if (activeTab === 'queries' && q.archived) return false;
    if (activeTab === 'history' && !q.archived) return false;

    const matchesSearch = 
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-logo">
          <div className="admin-logo-badge">A</div>
          <div>
            <h1>The Golden Tooth</h1>
            <span>Clinic Admin Dashboard</span>
          </div>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        {error && (
          <div className="admin-alert admin-alert-error">
            <AlertCircle size={20} />
            <p>{error}</p>
            <button className="admin-alert-retry" onClick={fetchData}>Retry Connection</button>
          </div>
        )}

        {/* Stats Grid */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <h3>Active Bookings</h3>
            <span className="stat-value">{stats.totalAppointments}</span>
            <span className="stat-desc">Active scheduled appointments</span>
          </div>
          <div className="admin-stat-card warning">
            <h3>Pending</h3>
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-desc">Waiting for confirmation</span>
          </div>
          <div className="admin-stat-card success">
            <h3>Confirmed</h3>
            <span className="stat-value">{stats.successful}</span>
            <span className="stat-desc">Approved time slots</span>
          </div>
          <div className="admin-stat-card info">
            <h3>Completed</h3>
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-desc">Successfully treated</span>
          </div>
          <div className="admin-stat-card inquiries">
            <h3>Inquiries</h3>
            <span className="stat-value">{stats.queries}</span>
            <span className="stat-desc">Active messages received</span>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="admin-controls">
          <div className="admin-tabs">
            <button 
              className={`admin-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => { setActiveTab('appointments'); setStatusFilter('All'); setDateFilter(''); }}
            >
              <span>Appointments</span>
              <span className="tab-badge">{stats.totalAppointments}</span>
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'queries' ? 'active' : ''}`}
              onClick={() => { setActiveTab('queries'); setStatusFilter('All'); setDateFilter(''); }}
            >
              <span>Queries</span>
              <span className="tab-badge">{stats.queries}</span>
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => { setActiveTab('history'); setStatusFilter('All'); setDateFilter(''); }}
            >
              <span>History & Archive</span>
            </button>
          </div>

          <div className="admin-filters">
            <div className="admin-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {(activeTab === 'appointments' || activeTab === 'history') && (
              <>
                <div className="admin-date-wrapper">
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="admin-date-input"
                    title="Filter by appointment date"
                  />
                  {dateFilter && (
                    <button 
                      onClick={() => setDateFilter('')} 
                      className="admin-clear-date-btn"
                      title="Clear date filter"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="admin-select-wrapper">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending (paddign)</option>
                    <option value="Successful">Successful</option>
                    <option value="Completed">Completed (compliteted)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Data Panels */}
        {loading ? (
          <div className="admin-loading-spinner">
            <div className="spinner"></div>
            <p>Loading clinic records...</p>
          </div>
        ) : (
          <section className="admin-data-panel">
            
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="table-responsive">
                {filteredAppointments.length === 0 ? (
                  <div className="admin-empty-state">
                    <Calendar size={48} />
                    <p>No active appointments found.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Patient Details</th>
                        <th>Preferred Date & Time</th>
                        <th>Treatment</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map(apt => (
                        <tr key={apt.id}>
                          <td 
                            onClick={() => { setSelectedClient(apt); setSelectedType('appointment'); }} 
                            className="clickable-cell"
                            title="Click to view details"
                            data-label="Patient"
                          >
                            <div className="patient-name-container">
                              <span className="patient-name">{apt.name}</span>
                              <span className="patient-id">{apt.id}</span>
                            </div>
                            <div className="patient-contact">
                              <span><Phone size={12} /> {apt.phone}</span>
                              <span><Mail size={12} /> {apt.email}</span>
                            </div>
                          </td>
                          <td data-label="Date & Time">
                            <div className="date-time-cell">
                              <span className="cell-date">{apt.preferredDate}</span>
                              <span className="cell-time"><Clock size={12} /> {apt.preferredTime}</span>
                            </div>
                          </td>
                          <td data-label="Treatment">
                            <span className="treatment-badge">{apt.treatment}</span>
                          </td>
                          <td data-label="Status">
                            <div className="status-dropdown-container" onClick={(e) => e.stopPropagation()}>
                              <span className={`status-pill ${apt.status.toLowerCase()}`}>
                                {apt.status === 'Pending' ? 'paddign' : apt.status === 'Successful' ? 'Successful' : 'compliteted'}
                              </span>
                              <select 
                                value={apt.status} 
                                onChange={(e) => handleUpdateStatus(apt.id, e.target.value)}
                                className="status-inline-select"
                              >
                                <option value="Pending">Pending (paddign)</option>
                                <option value="Successful">Successful</option>
                                <option value="Completed">Completed (compliteted)</option>
                              </select>
                            </div>
                          </td>
                          <td data-label="Actions">
                            <div className="action-buttons-cell" onClick={(e) => e.stopPropagation()}>
                              <button 
                                className="action-btn archive-btn" 
                                onClick={() => handleToggleArchiveAppointment(apt.id)}
                                title="Move to Archive"
                              >
                                <Archive size={16} />
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                onClick={() => handleDeleteAppointment(apt.id)}
                                title="Delete Permanently"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Queries Tab */}
            {activeTab === 'queries' && (
              <div className="queries-list-container">
                {filteredQueries.length === 0 ? (
                  <div className="admin-empty-state">
                    <MessageSquare size={48} />
                    <p>No active contact queries found.</p>
                  </div>
                ) : (
                  <div className="queries-grid">
                    {filteredQueries.map(q => (
                      <div key={q.id} className="query-card">
                        <div 
                          className="query-card-header clickable-header"
                          onClick={() => { setSelectedClient(q); setSelectedType('query'); }}
                          title="Click to view details"
                        >
                          <div>
                            <h4>{q.name}</h4>
                            <span className="query-email">{q.email}</span>
                          </div>
                          <span className="query-date">{new Date(q.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="query-subject">
                          <strong>Subject:</strong> {q.subject}
                        </div>
                        <p className="query-message text-truncate">"{q.message}"</p>
                        <div className="query-card-actions">
                          <button 
                            className="btn-outline-action archive"
                            onClick={() => handleToggleArchiveQuery(q.id)}
                          >
                            <Archive size={14} />
                            <span>Archive Query</span>
                          </button>
                          <button 
                            className="btn-outline-action delete"
                            onClick={() => handleDeleteQuery(q.id)}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History / Archive Tab */}
            {activeTab === 'history' && (
              <div className="history-tab-container">
                <div className="history-sub-header">
                  <h2>History & Archives</h2>
                  <p>Below are all the completed and archived records.</p>
                </div>

                {/* History Appointments */}
                <div className="history-section-block">
                  <h3>Archived & Completed Appointments</h3>
                  <div className="table-responsive">
                    {filteredAppointments.length === 0 ? (
                      <p className="no-history-text">No archived or completed appointments found.</p>
                    ) : (
                      <table className="admin-table archived-table">
                        <thead>
                          <tr>
                            <th>Patient</th>
                            <th>Date / Time</th>
                            <th>Treatment</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAppointments.map(apt => (
                            <tr key={apt.id} className={apt.archived ? 'row-archived' : ''}>
                              <td 
                                onClick={() => { setSelectedClient(apt); setSelectedType('appointment'); }} 
                                className="clickable-cell"
                                data-label="Patient"
                              >
                                <div className="patient-name-container">
                                  <span className="patient-name">{apt.name}</span>
                                  <span className="patient-id">{apt.id} {apt.archived && <span className="archived-tag">Archived</span>}</span>
                                </div>
                                <div className="patient-contact">
                                  <span>{apt.phone}</span>
                                </div>
                              </td>
                              <td data-label="Date / Time">{apt.preferredDate} | {apt.preferredTime}</td>
                              <td data-label="Treatment">{apt.treatment}</td>
                              <td data-label="Status">
                                <span className={`status-pill ${apt.status.toLowerCase()}`}>
                                  {apt.status === 'Pending' ? 'paddign' : apt.status === 'Successful' ? 'Successful' : 'compliteted'}
                                </span>
                              </td>
                              <td data-label="Actions">
                                <div className="action-buttons-cell" onClick={(e) => e.stopPropagation()}>
                                  <button 
                                    className="action-btn restore-btn" 
                                    onClick={() => handleToggleArchiveAppointment(apt.id)}
                                    title="Restore to Active List"
                                  >
                                    <RotateCcw size={16} />
                                  </button>
                                  <button 
                                    className="action-btn delete-btn" 
                                    onClick={() => handleDeleteAppointment(apt.id)}
                                    title="Delete Permanently"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>

                {/* History Queries */}
                <div className="history-section-block" style={{ marginTop: '3rem' }}>
                  <h3>Archived Queries</h3>
                  <div className="queries-list-container">
                    {filteredQueries.length === 0 ? (
                      <p className="no-history-text">No archived contact queries found.</p>
                    ) : (
                      <div className="queries-grid">
                        {filteredQueries.map(q => (
                          <div key={q.id} className="query-card query-card-archived">
                            <div 
                              className="query-card-header clickable-header"
                              onClick={() => { setSelectedClient(q); setSelectedType('query'); }}
                            >
                              <div>
                                <h4>{q.name} <span className="archived-tag">Archived</span></h4>
                                <span className="query-email">{q.email}</span>
                              </div>
                              <span className="query-date">{new Date(q.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="query-message text-truncate">"{q.message}"</p>
                            <div className="query-card-actions">
                              <button 
                                className="btn-outline-action restore"
                                onClick={() => handleToggleArchiveQuery(q.id)}
                              >
                                <RotateCcw size={14} />
                                <span>Restore to Active</span>
                              </button>
                              <button 
                                className="btn-outline-action delete"
                                onClick={() => handleDeleteQuery(q.id)}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </section>
        )}
      </main>

      {/* Selected Client Modal */}
      {selectedClient && (
        <div className="client-modal-overlay" onClick={() => setSelectedClient(null)}>
          <div className="client-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="client-modal-header">
              <div>
                <h2>{selectedType === 'appointment' ? 'Patient Profile' : 'Inquiry File'}</h2>
                <span className="client-modal-id">Database ID: {selectedClient.id}</span>
              </div>
              <button className="client-modal-close" onClick={() => setSelectedClient(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="client-modal-body">
              {selectedType === 'appointment' ? (
                <>
                  <div className="modal-section">
                    <h3>Personal Information</h3>
                    <div className="modal-info-grid">
                      <div className="info-item">
                        <User size={16} />
                        <div>
                          <label>Full Name</label>
                          <p>{selectedClient.name}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <Mail size={16} />
                        <div>
                          <label>Email Address</label>
                          <p><a href={`mailto:${selectedClient.email}`} className="modal-link">{selectedClient.email}</a></p>
                        </div>
                      </div>
                      <div className="info-item">
                        <Phone size={16} />
                        <div>
                          <label>Contact Number</label>
                          <p><a href={`tel:${selectedClient.phone}`} className="modal-link">{selectedClient.phone}</a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Appointment Details</h3>
                    <div className="modal-info-grid">
                      <div className="info-item">
                        <Calendar size={16} />
                        <div>
                          <label>Scheduled Date</label>
                          <p>{selectedClient.preferredDate}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <Clock size={16} />
                        <div>
                          <label>Preferred Time Slot</label>
                          <p>{selectedClient.preferredTime}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <CheckCircle size={16} />
                        <div>
                          <label>Requested Service</label>
                          <p className="modal-treatment-text">{selectedClient.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section full-width">
                    <h3>Patient Notes</h3>
                    <div className="modal-message-box">
                      {selectedClient.message ? `"${selectedClient.message}"` : 'No custom notes provided.'}
                    </div>
                  </div>

                  <div className="modal-section full-width">
                    <h3>Manage Booking Status</h3>
                    <div className="modal-status-control">
                      <span className={`status-pill ${selectedClient.status.toLowerCase()}`}>
                        {selectedClient.status === 'Pending' ? 'paddign' : selectedClient.status === 'Successful' ? 'Successful' : 'compliteted'}
                      </span>
                      <div className="status-select-btn-group">
                        <button 
                          className={`status-select-btn pending ${selectedClient.status === 'Pending' ? 'active' : ''}`}
                          onClick={() => {
                            handleUpdateStatus(selectedClient.id, 'Pending');
                            setSelectedClient(prev => ({ ...prev, status: 'Pending' }));
                          }}
                        >
                          paddign
                        </button>
                        <button 
                          className={`status-select-btn successful ${selectedClient.status === 'Successful' ? 'active' : ''}`}
                          onClick={() => {
                            handleUpdateStatus(selectedClient.id, 'Successful');
                            setSelectedClient(prev => ({ ...prev, status: 'Successful' }));
                          }}
                        >
                          Successful
                        </button>
                        <button 
                          className={`status-select-btn completed ${selectedClient.status === 'Completed' ? 'active' : ''}`}
                          onClick={() => {
                            handleUpdateStatus(selectedClient.id, 'Completed');
                            setSelectedClient(prev => ({ ...prev, status: 'Completed' }));
                          }}
                        >
                          compliteted
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-section">
                    <h3>Inquirer Details</h3>
                    <div className="modal-info-grid">
                      <div className="info-item">
                        <User size={16} />
                        <div>
                          <label>Sender Name</label>
                          <p>{selectedClient.name}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <Mail size={16} />
                        <div>
                          <label>Email Address</label>
                          <p><a href={`mailto:${selectedClient.email}`} className="modal-link">{selectedClient.email}</a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Metadata</h3>
                    <div className="modal-info-grid">
                      <div className="info-item">
                        <AlertCircle size={16} />
                        <div>
                          <label>Subject</label>
                          <p>{selectedClient.subject}</p>
                        </div>
                      </div>
                      <div className="info-item">
                        <Calendar size={16} />
                        <div>
                          <label>Inquiry Created On</label>
                          <p>{new Date(selectedClient.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section full-width">
                    <h3>Message Body</h3>
                    <div className="modal-message-box">
                      "{selectedClient.message}"
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="client-modal-footer">
              <button 
                className="modal-btn-archive"
                onClick={() => {
                  if (selectedType === 'appointment') {
                    handleToggleArchiveAppointment(selectedClient.id);
                  } else {
                    handleToggleArchiveQuery(selectedClient.id);
                  }
                  setSelectedClient(null);
                }}
              >
                <Archive size={16} />
                <span>{selectedClient.archived ? 'Restore to Active' : 'Archive Record'}</span>
              </button>

              <button 
                className="modal-btn-delete"
                onClick={() => {
                  if (selectedType === 'appointment') {
                    handleDeleteAppointment(selectedClient.id);
                  } else {
                    handleDeleteQuery(selectedClient.id);
                  }
                  setSelectedClient(null);
                }}
              >
                <Trash2 size={16} />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <AdminGate>
      <AdminDashboardContent />
    </AdminGate>
  );
};

export default AdminDashboard;
