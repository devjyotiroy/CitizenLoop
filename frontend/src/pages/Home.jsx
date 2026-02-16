import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://i.pinimg.com/1200x/66/b8/19/66b819295dc4e525688927ca8b1f37c7.jpg",
    "https://i.pinimg.com/1200x/ad/56/48/ad56489a88f439f7573fecad15ef176b.jpg",
    "https://i.pinimg.com/736x/3c/e1/b7/3ce1b7cace420085e99829032d7393e5.jpg",
    "https://i.pinimg.com/736x/16/4b/9e/164b9e8e0d2a149ec33e0551f65b703d.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  
  const features = [
    { icon: "🔒", title: "Secure & Anonymous", desc: "Your identity is protected" },
    { icon: "⚡", title: "Quick Response", desc: "24-48 hours guaranteed" },
    { icon: "📊", title: "Track Progress", desc: "Real-time status updates" },
    { icon: "✅", title: "High Success Rate", desc: "95% resolution rate" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(37, 99, 235, 0.85)), url(${images[currentIndex]})` }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🇮🇳</span>
              <span>Public Grievance Redressal System</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">Citizen Loop</span>
              <span className="title-sub">Your Voice, Our Commitment</span>
            </h1>
            <p className="hero-description">
              Empowering citizens to report civic issues and track their resolution. 
              Join thousands of citizens making their community better, one complaint at a time.
            </p>
            <div className="hero-buttons">
              <Link to="/complaint-form" className="btn-primary">
                <span>File Complaint</span>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </Link>
              <Link to="/check-complaint-status" className="btn-secondary">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
                </svg>
                <span>Track Status</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Impact Analytics */}
      <section className="sdg-section">
        <div className="container">
          <div className="section-header">
            <h2>SDG Impact Analytics</h2>
            <p>Our contribution to Sustainable Development Goals through citizen grievance resolution</p>
          </div>
          <div className="sdg-grid">
            {/* SDG 11 - Sustainable Cities */}
            <div className="sdg-card">
              <div className="sdg-header">
                <div className="sdg-icon" style={{ background: '#fd9d24' }}>🏙️</div>
                <div>
                  <h3>SDG 11</h3>
                  <p className="sdg-title">Sustainable Cities</p>
                </div>
              </div>
              <div className="sdg-chart">
                <svg viewBox="0 0 200 120" className="chart-svg">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#fd9d24', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#fd9d24', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M 10 100 L 30 85 L 50 75 L 70 65 L 90 55 L 110 50 L 130 45 L 150 35 L 170 30 L 190 25" 
                    stroke="#fd9d24" strokeWidth="3" fill="none" />
                  <path d="M 10 100 L 30 85 L 50 75 L 70 65 L 90 55 L 110 50 L 130 45 L 150 35 L 170 30 L 190 25 L 190 100 Z" 
                    fill="url(#grad1)" />
                  {[30, 50, 70, 90, 110, 130, 150, 170, 190].map((x, i) => (
                    <circle key={i} cx={x} cy={[85, 75, 65, 55, 50, 45, 35, 30, 25][i]} r="4" fill="#fd9d24" />
                  ))}
                </svg>
                <div className="sdg-stats">
                  <div className="stat-item">
                    <span className="stat-value">2,847</span>
                    <span className="stat-label">Complaints Resolved</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">89%</span>
                    <span className="stat-label">Impact Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SDG 16 - Peace & Justice */}
            <div className="sdg-card">
              <div className="sdg-header">
                <div className="sdg-icon" style={{ background: '#00689d' }}>⚖️</div>
                <div>
                  <h3>SDG 16</h3>
                  <p className="sdg-title">Peace & Justice</p>
                </div>
              </div>
              <div className="sdg-chart">
                <svg viewBox="0 0 200 120" className="chart-svg">
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#00689d', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#00689d', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
                    <rect key={i} x={x} y={100 - [45, 55, 50, 65, 60, 70, 75, 72, 80][i]} 
                      width="12" height={[45, 55, 50, 65, 60, 70, 75, 72, 80][i]} 
                      fill="url(#grad2)" rx="2" />
                  ))}
                </svg>
                <div className="sdg-stats">
                  <div className="stat-item">
                    <span className="stat-value">1,523</span>
                    <span className="stat-label">Justice Cases</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">94%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SDG 3 - Good Health */}
            <div className="sdg-card">
              <div className="sdg-header">
                <div className="sdg-icon" style={{ background: '#4c9f38' }}>🏥</div>
                <div>
                  <h3>SDG 3</h3>
                  <p className="sdg-title">Good Health</p>
                </div>
              </div>
              <div className="sdg-chart">
                <svg viewBox="0 0 200 120" className="chart-svg">
                  <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#4c9f38', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#4c9f38', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle cx="100" cy="60" r="45" fill="none" stroke="url(#grad3)" strokeWidth="12" 
                    strokeDasharray="220" strokeDashoffset="35" transform="rotate(-90 100 60)" />
                  <text x="100" y="60" textAnchor="middle" dy="8" fontSize="28" fontWeight="bold" fill="#4c9f38">82%</text>
                </svg>
                <div className="sdg-stats">
                  <div className="stat-item">
                    <span className="stat-value">956</span>
                    <span className="stat-label">Health Issues</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">82%</span>
                    <span className="stat-label">Resolved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SDG 9 - Innovation */}
            <div className="sdg-card">
              <div className="sdg-header">
                <div className="sdg-icon" style={{ background: '#fd6925' }}>💡</div>
                <div>
                  <h3>SDG 9</h3>
                  <p className="sdg-title">Innovation & Infrastructure</p>
                </div>
              </div>
              <div className="sdg-chart">
                <svg viewBox="0 0 200 120" className="chart-svg">
                  <defs>
                    <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#fd6925', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#fd6925', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  <path d="M 10 100 Q 50 20, 100 60 T 190 30" 
                    stroke="#fd6925" strokeWidth="3" fill="none" />
                  <path d="M 10 100 Q 50 20, 100 60 T 190 30 L 190 100 Z" 
                    fill="url(#grad4)" />
                  {[10, 50, 100, 150, 190].map((x, i) => (
                    <circle key={i} cx={x} cy={[100, 40, 60, 45, 30][i]} r="5" fill="#fd6925" />
                  ))}
                </svg>
                <div className="sdg-stats">
                  <div className="stat-item">
                    <span className="stat-value">1,234</span>
                    <span className="stat-label">Tech Solutions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">91%</span>
                    <span className="stat-label">Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>How Citizen Loop Works</h2>
            <p>Simple, transparent, and effective grievance resolution</p>
          </div>
          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Submit Complaint</h3>
                <p>Fill the form with details and attach evidence if available</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Verification</h3>
                <p>Our team verifies and forwards to concerned department</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Action Taken</h3>
                <p>Department reviews and takes necessary action</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Resolution</h3>
                <p>Issue resolved and status updated in your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="future-section">
        <div className="container">
          <div className="section-header">
            <h2>🚀 Future of Citizen Loop</h2>
            <p>Transforming India's grievance redressal with cutting-edge technology</p>
          </div>
          
          <div className="future-grid">
            {/* AI-Powered Analysis */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon ai-icon">🤖</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>AI-Powered Analysis</h3>
              <p>Advanced machine learning algorithms will automatically categorize, prioritize, and route complaints to the right departments instantly.</p>
              <div className="future-stats">
                <span className="stat-badge">99% Accuracy</span>
                <span className="stat-badge">Instant Processing</span>
              </div>
            </div>

            {/* Image Recognition */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon image-icon">📸</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>Smart Image Recognition</h3>
              <p>Upload photos and our AI will automatically detect issues like potholes, garbage dumps, broken infrastructure, and generate detailed reports.</p>
              <div className="future-stats">
                <span className="stat-badge">Auto-Detection</span>
                <span className="stat-badge">Real-time Analysis</span>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon graph-icon">📊</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>Predictive Analytics</h3>
              <p>Data-driven insights will predict potential civic issues before they occur, enabling proactive governance and preventive measures.</p>
              <div className="future-stats">
                <span className="stat-badge">Prevent Issues</span>
                <span className="stat-badge">Smart Forecasting</span>
              </div>
            </div>

            {/* Blockchain Transparency */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon blockchain-icon">🔗</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>Blockchain Transparency</h3>
              <p>Every complaint action will be recorded on blockchain, ensuring complete transparency, accountability, and tamper-proof records.</p>
              <div className="future-stats">
                <span className="stat-badge">100% Transparent</span>
                <span className="stat-badge">Immutable Records</span>
              </div>
            </div>

            {/* Voice Complaints */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon voice-icon">🎤</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>Voice-Based Complaints</h3>
              <p>File complaints using voice commands in multiple Indian languages. AI will transcribe, translate, and process your complaint automatically.</p>
              <div className="future-stats">
                <span className="stat-badge">22+ Languages</span>
                <span className="stat-badge">Voice-to-Text</span>
              </div>
            </div>

            {/* Mobile App */}
            <div className="future-card">
              <div className="future-icon-wrapper">
                <div className="future-icon mobile-icon">📱</div>
                <div className="pulse-ring"></div>
              </div>
              <h3>Mobile App Integration</h3>
              <p>Dedicated iOS and Android apps with offline mode, push notifications, GPS-based complaint filing, and instant photo uploads.</p>
              <div className="future-stats">
                <span className="stat-badge">Offline Mode</span>
                <span className="stat-badge">GPS Enabled</span>
              </div>
            </div>
          </div>

          {/* Impact Projection */}
          <div className="impact-projection">
            <h3>📈 Projected Impact by 2030</h3>
            <div className="projection-grid">
              <div className="projection-item">
                <div className="projection-number">10M+</div>
                <div className="projection-label">Active Users</div>
              </div>
              <div className="projection-item">
                <div className="projection-number">50M+</div>
                <div className="projection-label">Complaints Resolved</div>
              </div>
              <div className="projection-item">
                <div className="projection-number">500+</div>
                <div className="projection-label">Cities Covered</div>
              </div>
              <div className="projection-item">
                <div className="projection-number">98%</div>
                <div className="projection-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make Your Voice Heard?</h2>
            <p>Join thousands of citizens working towards a better community</p>
            <Link to="/file-complaint" className="cta-button">
              File Your Complaint Now
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <div className="warning-banner">
        <div className="container">
          <div className="warning-content">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
            </svg>
            <p>
              <strong>Important:</strong> Submit only genuine complaints. Fake or abusive complaints will be rejected. 
              Do not share passwords or bank details. Misuse may lead to legal action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
