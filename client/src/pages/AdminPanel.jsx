import React, { useMemo, useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    // Validate password is not empty
    if (!loginPassword || loginPassword.trim() === '') {
      setLoginError('Password is required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: loginPassword })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
        setLoginPassword('');
        setLoginError('');
      } else {
        setLoginError(data.error || 'Invalid password. Please try again.');
        setLoginPassword('');
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginError('');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-container">
          <div className="admin-login-card">
            <h1 className="admin-login-title">Admin Access</h1>
            <p className="admin-login-subtitle">Ayodhya Estates Dashboard</p>
            
            <form onSubmit={handleAdminLogin} className="admin-login-form">
              <div className="admin-login-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="admin-login-input"
                  disabled={isLoading}
                  required
                />
              </div>

              {loginError && (
                <div className="admin-login-error">
                  <i className="fas fa-exclamation-circle"></i> {loginError}
                </div>
              )}

              <button
                type="submit"
                className="admin-login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="admin-login-footer">
              <p>Enter the admin password to continue</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen (only shown after authentication)
  return <AdminDashboard onLogout={handleAdminLogout} />;
};

// Main Admin Dashboard Component
const AdminDashboard = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Panchi Vihar',
      location: 'Ayodhya',
      status: 'Ongoing',
      inquiries: 42
    },
    {
      id: 2,
      name: 'Saryu Greens',
      location: 'Faizabad Road',
      status: 'Upcoming',
      inquiries: 18
    },
    {
      id: 3,
      name: 'Ram Lotus Enclave',
      location: 'Ram Path',
      status: 'Completed',
      inquiries: 57
    }
  ]);
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      date: '2026-02-18',
      name: 'Amit Sharma',
      phone: '9876543210',
      project: 'Panchi Vihar',
      status: 'New'
    },
    {
      id: 2,
      date: '2026-02-17',
      name: 'Riya Verma',
      phone: '9123456789',
      project: 'Saryu Greens',
      status: 'Contacted'
    },
    {
      id: 3,
      date: '2026-02-15',
      name: 'Karan Singh',
      phone: '9988776655',
      project: 'Panchi Vihar',
      status: 'New'
    }
  ]);
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    status: 'Upcoming',
    inquiries: 0
  });

  const totalInquiries = inquiries.length;
  const ongoingProjects = projects.filter((p) => p.status === 'Ongoing').length;
  const upcomingProjects = projects.filter((p) => p.status === 'Upcoming').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;

  const filteredInquiries = useMemo(() => {
    if (projectFilter === 'All') {
      return inquiries;
    }
    return inquiries.filter((lead) => lead.project === projectFilter);
  }, [inquiries, projectFilter]);

  const handleProjectStatusChange = (id, status) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    );
  };

  const handleInquiryStatusChange = (id, status) => {
    setInquiries((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    );
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.location) {
      return;
    }
    setProjects((prev) => [
      {
        id: Date.now(),
        ...newProject,
        inquiries: Number(newProject.inquiries) || 0
      },
      ...prev
    ]);
    setNewProject({ name: '', location: '', status: 'Upcoming', inquiries: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-title">Ayodhya Estates</div>
          <div className="admin-brand-subtitle">Admin Dashboard</div>
        </div>
        <nav className="admin-nav">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`admin-nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
          >
            <i className="fas fa-chart-pie"></i>
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`admin-nav-link ${activeView === 'projects' ? 'active' : ''}`}
          >
            <i className="fas fa-city"></i>
            Manage Projects
          </button>
          <button
            onClick={() => setActiveView('inquiries')}
            className={`admin-nav-link ${activeView === 'inquiries' ? 'active' : ''}`}
          >
            <i className="fas fa-inbox"></i>
            Inquiries
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`admin-nav-link ${activeView === 'settings' ? 'active' : ''}`}
          >
            <i className="fas fa-cog"></i>
            Settings
          </button>
          <button
            onClick={() => setActiveView('logout')}
            className={`admin-nav-link ${activeView === 'logout' ? 'active' : ''}`}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'projects' && 'Manage Projects'}
              {activeView === 'inquiries' && 'Inquiries'}
              {activeView === 'settings' && 'Settings'}
              {activeView === 'logout' && 'Logout'}
            </h1>
            <p className="admin-subtitle">Ayodhya Estates Admin Center</p>
          </div>
          {activeView === 'projects' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="admin-primary-btn"
            >
              + Add New Project
            </button>
          )}
        </div>

        {activeView === 'dashboard' && (
          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-label">Total Inquiries</div>
              <div className="admin-stat-value">{totalInquiries}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Ongoing Projects</div>
              <div className="admin-stat-value">{ongoingProjects}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Upcoming Projects</div>
              <div className="admin-stat-value">{upcomingProjects}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-label">Completed Projects</div>
              <div className="admin-stat-value">{completedProjects}</div>
            </div>
          </div>
        )}

        {activeView === 'projects' && (
          <div className="admin-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Total Inquiries</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.location}</td>
                      <td>
                        <select
                          value={project.status}
                          onChange={(e) =>
                            handleProjectStatusChange(project.id, e.target.value)
                          }
                          className="admin-select"
                        >
                          <option>Upcoming</option>
                          <option>Ongoing</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td>{project.inquiries}</td>
                      <td>
                        <div className="admin-actions">
                          <button className="admin-link-btn">Edit</button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="admin-link-btn danger"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'inquiries' && (
          <div className="admin-section">
            <div className="admin-filter">
              <label htmlFor="projectFilter">Filter by Project</label>
              <select
                id="projectFilter"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="admin-select"
              >
                <option>All</option>
                {projects.map((project) => (
                  <option key={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-card">
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Project of Interest</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((lead) => (
                      <tr key={lead.id}>
                        <td>{lead.date}</td>
                        <td>{lead.name}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.project}</td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleInquiryStatusChange(lead.id, e.target.value)
                            }
                            className="admin-select"
                          >
                            <option>New</option>
                            <option>Contacted</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="admin-card admin-empty">
            <div className="admin-empty-title">Settings</div>
            <div className="admin-empty-text">
              Configure roles, notification preferences, and admin access.
            </div>
          </div>
        )}

        {activeView === 'logout' && (
          <div className="admin-card admin-empty">
            <div className="admin-empty-title">Logout</div>
            <div className="admin-empty-text">
              You will be logged out of the admin panel.
            </div>
            <button 
              onClick={onLogout}
              className="admin-primary-btn"
              style={{ marginTop: '2rem' }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout Now
            </button>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2>Add New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="admin-modal-close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddProject} className="admin-modal-form">
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Project Name"
                className="admin-input"
              />
              <input
                type="text"
                value={newProject.location}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="Location"
                className="admin-input"
              />
              <div className="admin-modal-grid">
                <select
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="admin-select"
                >
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
                <input
                  type="number"
                  value={newProject.inquiries}
                  onChange={(e) =>
                    setNewProject((prev) => ({ ...prev, inquiries: e.target.value }))
                  }
                  placeholder="Total Inquiries"
                  className="admin-input"
                />
              </div>
              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-secondary-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
