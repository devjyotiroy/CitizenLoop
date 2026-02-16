import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

const PoliceComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login first to view your complaints");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/complaints/my-complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          // Sort by newest first
          const sorted = res.data.complaints.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setComplaints(sorted);
          setFilteredComplaints(sorted);
        } else {
          setError("Failed to fetch complaints");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Error loading complaints. Please try again later.");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    let filtered = complaints;

    // Filter by status
    if (activeFilter !== "All") {
      filtered = filtered.filter(c => c.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredComplaints(filtered);
  }, [activeFilter, searchQuery, complaints]);

  const filters = [
    { label: "All", count: complaints.length },
    { label: "Resolved", count: complaints.filter(c => c.status === "Resolved").length },
    { label: "Under Processing", count: complaints.filter(c => c.status === "Under Processing").length },
    { label: "Received at department", count: complaints.filter(c => c.status === "Received at department").length },
    { label: "Rejected", count: complaints.filter(c => c.status === "Rejected").length },
  ];

  const getStatusBadgeClass = (status) => {
    const classes = {
      "Resolved": "status-badge status-resolved",
      "Rejected": "status-badge status-rejected",
      "Under Processing": "status-badge status-processing",
      "Received at department": "status-badge status-received",
      "Unsolved": "status-badge status-unsolved"
    };
    return classes[status] || "status-badge status-requested";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "Resolved": "✓",
      "Rejected": "✕",
      "Under Processing": "⏳",
      "Received at department": "📥",
      "Unsolved": "⚠️"
    };
    return icons[status] || "📋";
  };

  if (loading) return (
    <div className="complaints-loading">
      <div className="loading-spinner"></div>
      <span className="loading-text">Loading your complaints...</span>
    </div>
  );

  if (error) return (
    <div className="complaints-container">
      <div className="error-container">
        <div className="error-icon">🚨</div>
        <div className="error-content">
          <h3>Access Denied</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="complaints-container">
      {/* Header */}
      <div className="complaints-header">
        <div className="header-content">
          <h1 className="complaints-title">
            <span className="title-icon">📋</span>
            Complaint History
          </h1>
          {/* <p className="complaints-subtitle">Track and manage all your submitted complaints</p> */}
        </div>
        {/* <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{complaints.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-success">
            <span className="stat-number">{complaints.filter(c => c.status === "Resolved").length}</span>
            <span className="stat-label">Resolved</span>
          </div>
          <div className="stat-card stat-warning">
            <span className="stat-number">{complaints.filter(c => c.status === "Under Processing").length}</span>
            <span className="stat-label">Processing</span>
          </div>
        </div> */}
      </div>

      {complaints.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Complaints Found</h3>
          <p>You haven't submitted any complaints yet.</p>
          <button className="primary-btn" onClick={() => window.location.href = '/complaint-form'}>
            Submit Your First Complaint
          </button>
        </div>
      ) : (
        <>
          {/* Search and Filter Bar */}
          <div className="filter-section">
            <div className="search-box">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by ID, description, or location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>
              )}
            </div>
            <div className="filter-buttons">
              {filters.map(filter => (
                <button
                  key={filter.label}
                  className={`filter-btn ${activeFilter === filter.label ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.label)}
                >
                  {filter.label}
                  <span className="filter-count">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info">
            <p>Showing <strong>{filteredComplaints.length}</strong> complaint{filteredComplaints.length !== 1 ? 's' : ''}</p>
            {(activeFilter !== "All" || searchQuery) && (
              <button className="clear-filters" onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}>
                Clear Filters
              </button>
            )}
          </div>

          {/* Complaints Grid */}
          {filteredComplaints.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No Results Found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="complaints-grid">
              {filteredComplaints.map((complaint) => (
                <div key={complaint._id} className="complaint-card">
                  <div className="card-header">
                    <div className="complaint-meta">
                      <div className="complaint-id-badge">{complaint.complaintId}</div>
                      <div className="complaint-date">
                        {new Date(complaint.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </div>
                    <span className={getStatusBadgeClass(complaint.status)}>
                      <span className="status-icon">{getStatusIcon(complaint.status)}</span>
                      {complaint.status}
                    </span>
                  </div>

                  <div className="card-body">
                    <p className="complaint-summary">{complaint.complaint.substring(0, 120)}...</p>
                    <div className="complaint-details">
                      <div className="detail-row">
                        <span className="detail-label">📍 Location:</span>
                        <span className="detail-value">{complaint.district}, {complaint.location}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">📱 Mobile:</span>
                        <span className="detail-value">{complaint.mobile}</span>
                      </div>
                      {complaint.assignedOfficer && (
                        <div className="detail-row">
                          <span className="detail-label">👮 Assigned Officer:</span>
                          <span className="detail-value">{complaint.assignedOfficer}</span>
                        </div>
                      )}
                      {complaint.assignedOfficerPhone && (
                        <div className="detail-row">
                          <span className="detail-label">📞 Officer Phone:</span>
                          <span className="detail-value">{complaint.assignedOfficerPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-footer">
                    <button className="action-btn view-btn" onClick={() => setSelectedComplaint(complaint)}>
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                      </svg>
                      View Details
                    </button>
                    <div className="last-updated">
                      Updated: {new Date(complaint.updatedAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selectedComplaint && (
        <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complaint Details</h2>
              <button className="close-btn" onClick={() => setSelectedComplaint(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <div className="modal-id-status">
                  <h3>#{selectedComplaint.complaintId}</h3>
                  <span className={getStatusBadgeClass(selectedComplaint.status)}>
                    {getStatusIcon(selectedComplaint.status)} {selectedComplaint.status}
                  </span>
                </div>
                <p className="modal-date">Submitted on {new Date(selectedComplaint.createdAt).toLocaleString('en-IN')}</p>
              </div>

              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div className="detail-group">
                    <label>Full Name</label>
                    <p>{selectedComplaint.name}</p>
                  </div>
                  <div className="detail-group">
                    <label>Email</label>
                    <p>{selectedComplaint.email}</p>
                  </div>
                  <div className="detail-group">
                    <label>Mobile</label>
                    <p>{selectedComplaint.mobile}</p>
                  </div>
                  <div className="detail-group">
                    <label>Location</label>
                    <p>{selectedComplaint.district}, {selectedComplaint.location}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Complaint Description</h3>
                <p className="complaint-fulltext">{selectedComplaint.complaint}</p>
              </div>

              {(selectedComplaint.assignedOfficer || selectedComplaint.assignedOfficerPhone) && (
                <div className="detail-section" style={{background: '#dcfce7', padding: '15px', borderRadius: '8px', border: '1px solid #86efac'}}>
                  <h3 style={{color: '#166534'}}>👮 Assigned Officer Details</h3>
                  <div className="detail-grid">
                    {selectedComplaint.assignedOfficer && (
                      <div className="detail-group">
                        <label>Officer Name</label>
                        <p style={{fontWeight: '600', color: '#166534'}}>{selectedComplaint.assignedOfficer}</p>
                      </div>
                    )}
                    {selectedComplaint.assignedOfficerPhone && (
                      <div className="detail-group">
                        <label>Officer Phone</label>
                        <p style={{fontWeight: '600', color: '#166534'}}>{selectedComplaint.assignedOfficerPhone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedComplaint.reason && (
                <div className="detail-section">
                  <h3>Department Response</h3>
                  <p className="response-fulltext">{selectedComplaint.reason}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="primary-btn" onClick={() => setSelectedComplaint(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliceComplaintHistory;
