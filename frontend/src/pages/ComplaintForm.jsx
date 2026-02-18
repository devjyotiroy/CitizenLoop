import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComplaintForm.css";

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    complaintType: "",
    location: "",
    complaint: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [locationName, setLocationName] = useState("");

  // Complaint types for the dropdown
  const complaintTypes = [
    "Cleanliness & Waste",
    "Water Related",
    "Road & Infrastructure",
    "Drainage & Flood",
    "Environment & Safety",
    "Public Safety / Civic Hazards"
  ];

  // Auto Location Detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            let city = data.address.city || data.address.town || data.address.village || "Unknown Location";
            let state = data.address.state || "";
            
            const locationString = `${city}${state ? `, ${state}` : ''}`;
            setLocationName(locationString);
            
            setFormData((prev) => ({
              ...prev,
              location: `${locationString} (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`,
            }));
          } catch (error) {
            console.warn("Could not fetch location name");
            setFormData((prev) => ({
              ...prev,
              location: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            }));
          }
        },
        (error) => {
          console.warn("Location access denied");
          setFormData((prev) => ({ ...prev, location: "" }));
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      alert("You must login first!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const sendData = new FormData();

      Object.keys(formData).forEach((key) => sendData.append(key, formData[key]));
      files.forEach((file) => sendData.append("proofFiles", file));

      const res = await axios.post(
        "https://citizenloop.onrender.com/api/complaints/create",
        sendData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaintId(res.data.complaint.complaintId);
      setShowSuccessDialog(true);
      
      setFormData({
        name: "",
        email: "",
        mobile: "",
        complaintType: "",
        location: "",
        complaint: "",
      });
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <div className="complaint-portal-container">
      {showSuccessDialog && (
        <div className="success-dialog-overlay">
          <div className="success-dialog">
            <div className="dialog-header">
              <i className="fas fa-check-circle"></i>
              <h3>Complaint Registered Successfully!</h3>
            </div>
            <div className="dialog-body">
              <p className="complaint-id">Complaint ID: <span>{complaintId}</span></p>
              <p className="confirmation-message">
                Complaint details have been sent to your registered email ID.
              </p>
            </div>
            <div className="dialog-footer">
              <button onClick={closeDialog} className="dialog-btn">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="titles" style={{ textAlign: "center", marginTop: "80px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "700", margin: "0" }}>Citizen Loop</h1>
        <h2 style={{ fontSize: "20px", fontWeight: "400", color: "#555", marginTop: "10px" }}>
          Public Grievance Redressal System
        </h2>
      </div>

      <div className="main-content-wrapper">
        <div className="container main-content">
          <div className="content-grid">
            {/* LEFT SIDE - FORM */}
            <div className="form-content">
              <div className="complaint-form-card">
                <div className="form-header">
                  <h2 className="form-title">
                    <i className="fas fa-edit"></i> Register Your Complaint
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Mobile Number *</label>
                        <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required placeholder="Enter mobile number" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Complaint Type *</label>
                        <select name="complaintType" className="form-select" value={formData.complaintType} onChange={handleChange} required>
                          <option value="">Select Complaint Type</option>
                          {complaintTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <input type="text" name="location" className="form-control" placeholder="Your location (auto-detected)" value={formData.location} onChange={handleChange} required />
                    <small className="location-help">
                      <i className="fas fa-info-circle"></i> 
                      {locationName ? ` Detected location: ${locationName}` : " Location will be automatically detected."}
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Complaint Details *</label>
                    <textarea name="complaint" className="form-control" rows="6" placeholder="Please describe your complaint in detail..." value={formData.complaint} onChange={handleChange} required></textarea>
                    <small className="text-help">Be specific and include all relevant details.</small>
                  </div>

                  <div className="form-group">
                    <label>Attach Supporting Documents (Optional)</label>
                    <div className="file-upload-wrapper">
                      <input type="file" multiple onChange={handleFileChange} className="form-control" id="fileUpload" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                      <label htmlFor="fileUpload" className="file-upload-label">
                        <i className="fas fa-cloud-upload-alt"></i> Choose Files
                      </label>
                      {files.length > 0 && (
                        <div className="selected-files">
                          {files.map((file, index) => (
                            <div key={index} className="file-item">
                              <i className="fas fa-paperclip"></i> {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <small className="file-help">Supported formats: JPG, PNG, PDF, DOC (Max 10MB each)</small>
                  </div>

                  <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Submit Complaint
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT SIDE - INSTRUCTIONS */}
            <div className="left-content">
              <div className="info-card">
                <h2>How to Register a Complaint</h2>
                <ol>
                  <li>Fill in your personal details</li>
                  <li>Select complaint type from dropdown</li>
                  <li>Verify your location (automatically detected)</li>
                  <li>Describe your complaint in detail</li>
                  <li>Attach any supporting documents</li>
                  <li>Submit the form</li>
                </ol>
              </div>

              <div className="info-card">
                <h2>Why Citizen Loop?</h2>
                <ul>
                  <li>Direct communication with authorities</li>
                  <li>Transparent tracking system</li>
                  <li>Quick response guaranteed</li>
                  <li>Secure and confidential</li>
                </ul>
              </div>

              <div className="emergency-contact">
                <h3>Important Contacts</h3>
                <div className="contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <p>Municipal Helpline: <strong>1911</strong></p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-fire-extinguisher"></i>
                  <p>Fire Department: <strong>101</strong></p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-ambulance"></i>
                  <p>Ambulance: <strong>108</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Complaint Types Information */}
          <div className="complaint-types-info">
            <h2 className="section-title">Types of Complaints We Handle</h2>
            <div className="types-grid">
              {complaintTypes.map((type, index) => (
                <div key={index} className="type-card">
                  <div className="type-icon">{getIconForType(type)}</div>
                  <h4>{type}</h4>
                  <p>{getDescriptionForType(type)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getIconForType(type) {
  switch(type) {
    case "Cleanliness & Waste": return <i className="fas fa-trash-alt"></i>;
    case "Water Related": return <i className="fas fa-tint"></i>;
    case "Road & Infrastructure": return <i className="fas fa-road"></i>;
    case "Drainage & Flood": return <i className="fas fa-water"></i>;
    case "Environment & Safety": return <i className="fas fa-tree"></i>;
    case "Public Safety / Civic Hazards": return <i className="fas fa-exclamation-triangle"></i>;
    default: return <i className="fas fa-comment-alt"></i>;
  }
}

function getDescriptionForType(type) {
  switch(type) {
    case "Cleanliness & Waste": return "Garbage collection issues, waste management problems";
    case "Water Related": return "Water supply problems, water quality issues, leakages";
    case "Road & Infrastructure": return "Potholes, road repairs, street lights, traffic signals";
    case "Drainage & Flood": return "Blocked drains, water logging, flood issues";
    case "Environment & Safety": return "Pollution, illegal construction, environmental hazards";
    case "Public Safety / Civic Hazards": return "Broken footpaths, dangerous structures";
    default: return "Report your civic issues";
  }
}
