import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="modern-footer">
        {/* Wave Animation */}
        <div className="footer-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        <div className="footer-container">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <h2>🇮🇳 Citizen Loop</h2>
              <p className="footer-tagline">Your Voice, Our Commitment</p>
            </div>
            <p className="footer-description">
              Empowering citizens to report civic issues and track their resolution. 
              Making India better, one complaint at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/complaint-form">📝 File Complaint</Link></li>
              <li><Link to="/check-complaint-status">🔍 Track Status</Link></li>
              <li><Link to="/history">📋 Your Complaints</Link></li>
              <li><Link to="/about">ℹ️ About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          {/* <div className="footer-section">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link to="/departments/police">🚨 Public Safety</Link></li>
              <li><Link to="/departments/municipal">🏛️ Municipal Services</Link></li>
              <li><Link to="/departments/health">🏥 Health Services</Link></li>
              <li><Link to="/departments/cybercrime">💻 Cyber Crime</Link></li>
            </ul>
          </div> */}

          {/* Contact & Social */}
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <div className="contact-info">
              <a href="mailto:synqdoc@gmail.com" className="contact-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                </svg>
                synqdoc@gmail.com
              </a>

              <a href="https://goo.gl/maps/cutm" target="_blank" rel="noopener noreferrer" className="contact-item">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                CUTM, Paralakhemundi, Odisha
              </a>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.70,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="footer-section footer-map-section">
            <h3>Our Location</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8!2d84.1!3d18.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ4JzAwLjAiTiA4NMKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CUTM Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Citizen Loop. All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/policy-Citizen Loop">Privacy Policy</Link>
              {/* <span>•</span>
              <Link to="/terms">Terms of Service</Link> */}
              <span>•</span>
              <Link to="/help-Citizen Loop">Help Center</Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button 
          className="scroll-top-btn" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
          </svg>
        </button>
      </footer>

      <style>{`
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%);
          color: white;
          margin-top: 4rem;
          overflow: hidden;
        }

        .footer-wave {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .footer-wave svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 60px;
          fill: #f8fafc;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
          gap: 3rem;
        }

        .footer-section h2 {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-tagline {
          font-size: 0.95rem;
          opacity: 0.9;
          font-style: italic;
          margin: 0 0 1rem 0;
        }

        .footer-description {
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .footer-stats {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-item strong {
          font-size: 1.75rem;
          color: #fbbf24;
        }

        .stat-item span {
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .footer-section h3 {
          font-size: 1.25rem;
          margin: 0 0 1.25rem 0;
          color: #fbbf24;
          font-weight: 700;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links a:hover {
          color: #fbbf24;
          transform: translateX(5px);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #fbbf24;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .contact-item:hover {
          background: rgba(251, 191, 36, 0.15);
          color: #fde68a;
          transform: translateX(5px);
        }

        .contact-item svg {
          flex-shrink: 0;
        }

        .map-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(251, 191, 36, 0.3);
          transition: all 0.3s ease;
        }

        .map-container:hover {
          box-shadow: 0 8px 30px rgba(251, 191, 36, 0.4);
          border-color: rgba(251, 191, 36, 0.5);
          transform: translateY(-3px);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          transform: translateY(-5px) rotate(5deg);
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.4);
        }

        .social-icon svg {
          transition: transform 0.3s ease;
        }

        .social-icon:hover svg {
          transform: scale(1.1);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 2rem;
          margin-top: 2rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .footer-bottom-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-bottom-content p {
          margin: 0;
          opacity: 0.8;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #fbbf24;
        }

        .footer-bottom-links span {
          opacity: 0.5;
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);
          transition: all 0.3s ease;
          z-index: 999;
        }

        .scroll-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(251, 191, 36, 0.6);
        }

        .scroll-top-btn svg {
          fill: #1e293b;
        }

        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .modern-footer {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .footer-section h2 {
            font-size: 1.5rem;
          }

          .social-icon {
            width: 40px;
            height: 40px;
          }

          .footer-bottom-links {
            flex-direction: column;
            gap: 0.5rem;
          }

          .footer-bottom-links span {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
