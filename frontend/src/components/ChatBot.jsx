import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m Citizen Loop Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useGemini, setUseGemini] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Smart responses based on keywords
    const responses = {
      'track': 'To track your complaint:\n\n1. Go to "Track Status" page\n2. Enter your Complaint ID\n3. View real-time status updates\n\nYou can also check your complaint history in the "Your Complaints" section.',
      'file': 'To file a complaint:\n\n1. Click on "File Complaint" button\n2. Fill in your details (name, email, mobile)\n3. Select complaint category\n4. Describe your issue in detail\n5. Upload supporting documents (optional)\n6. Submit and get your Complaint ID',
      'document': 'Required documents:\n\n• Valid ID proof (Aadhaar/PAN)\n• Address proof\n• Photos/videos of the issue (if applicable)\n• Any supporting evidence\n\nNote: All documents are optional but help in faster resolution.',
      'contact': 'Contact Information:\n\n📧 Email: synqdoc@gmail.com\n📞 Toll-Free: 1800-123-4567\n📍 Location: CUTM, Paralakhemundi, Odisha\n\nYou can also use our social media channels for quick support.',
      'status': 'Complaint Status Types:\n\n✅ Resolved - Issue fixed\n⏳ Under Processing - Being worked on\n📥 Received at department - Forwarded to concerned dept\n❌ Rejected - Invalid complaint\n⚠️ Unsolved - Needs more information',
      'citizen loop': 'Citizen Loop is a Public Grievance Redressal System that empowers citizens to report civic issues and track their resolution. We help make India better, one complaint at a time!',
      'how': 'Citizen Loop works in 4 simple steps:\n\n1. Submit your complaint with details\n2. We verify and forward to concerned department\n3. Department takes action\n4. You get updates and resolution\n\nTrack everything in real-time!',
      'category': 'We handle complaints in these categories:\n\n🚨 Public Safety (Police, Fire, Emergency)\n🏛️ Municipal Services (Roads, Water, Sanitation)\n🏥 Health Services (Hospitals, Clinics)\n💻 Cyber Crime (Online Fraud, Hacking)',
      'time': 'Response Time:\n\n• Acknowledgment: Immediate\n• Department Review: 24-48 hours\n• Resolution: 7-15 days (varies by issue)\n\nYou can track progress anytime!',
      'help': 'I can help you with:\n\n• Filing new complaints\n• Tracking complaint status\n• Understanding the process\n• Required documents\n• Contact information\n• Complaint categories\n\nWhat would you like to know?'
    };

    // If Gemini mode is enabled, try API first
    if (useGemini) {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
        
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
          throw new Error('API key not configured');
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful assistant for Citizen Loop - a public grievance redressal system in India. Provide concise, helpful answers in 2-3 sentences. Question: ${userMessage}`
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (botReply) {
            setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
            setIsTyping(false);
            return;
          }
        }
      } catch (error) {
        console.log('Gemini API unavailable, using fallback');
      }
    }

    // Fallback mode or if Gemini fails
    const lowerMessage = userMessage.toLowerCase();
    let botReply = null;

    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        botReply = response;
        break;
      }
    }

    if (!botReply) {
      botReply = responses.help;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  const quickQuestions = [
    'How to file a complaint?',
    'Track my complaint',
    'What documents needed?',
    'Contact support'
  ];

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chat-bot-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        ) : (
          <img src={logo} alt="Citizen Loop" className="bot-logo" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-bot-window">
          {/* Header */}
          <div className="chat-bot-header">
            <div className="chat-bot-header-content">
              <img src={logo} alt="Bot" className="bot-avatar-img" />
              <div>
                <h3>Citizen Loop Assistant</h3>
                <p>{useGemini ? 'Gemini AI Mode' : 'Quick Response Mode'}</p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Mode Toggle */}
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${!useGemini ? 'active' : ''}`}
              onClick={() => setUseGemini(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
              </svg>
              Quick
            </button>
            <button 
              className={`mode-btn ${useGemini ? 'active' : ''}`}
              onClick={() => {
                setUseGemini(true);
                setMessages(prev => [...prev, { 
                  type: 'bot', 
                  text: '🚧 Gemini AI Mode is Under Construction\n\nThis feature is currently being developed. Please use Quick Response Mode for now.\n\nSwitching back to Quick Mode...' 
                }]);
                setTimeout(() => setUseGemini(false), 3000);
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M11,6V12L16,15L15.25,16.15L10,13V6H11Z" />
              </svg>
              Gemini AI
            </button>
          </div>

          {/* Messages */}
          <div className="chat-bot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                {msg.type === 'bot' && <img src={logo} alt="Bot" className="message-avatar-img" />}
                <div className="message-bubble">{msg.text}</div>
                {msg.type === 'user' && <div className="message-avatar">👤</div>}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <img src={logo} alt="Bot" className="message-avatar-img" />
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              {quickQuestions.map((q, idx) => (
                <button 
                  key={idx} 
                  className="quick-question-btn"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => handleSend(), 100);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-bot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={!input.trim()}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .chat-bot-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .chat-bot-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(37, 99, 235, 0.6);
        }

        .chat-bot-button.open {
          background: linear-gradient(135deg, #dc2626, #ef4444);
        }

        .chat-bot-button svg {
          fill: white;
        }

        .bot-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .chat-bot-window {
          position: fixed;
          bottom: 5rem;
          right: 2rem;
          width: 320px;
          height: 450px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .chat-bot-header {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          padding: 1rem;
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-bot-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bot-avatar {
          font-size: 1.5rem;
        }

        .bot-avatar-img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 8px;
        }

        .chat-bot-header h3 {
          margin: 0;
          font-size: 1rem;
        }

        .chat-bot-header p {
          margin: 0;
          font-size: 0.75rem;
          opacity: 0.9;
        }

        .mode-toggle {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .mode-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          transition: all 0.3s;
        }

        .mode-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .mode-btn.active {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          border-color: #2563eb;
        }

        .mode-btn svg {
          flex-shrink: 0;
        }

        .chat-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          color: white;
          font-size: 1.1rem;
          transition: all 0.3s;
        }

        .chat-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-bot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: #f8fafc;
        }

        .chat-message {
          display: flex;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .chat-message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .message-avatar-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .message-bubble {
          max-width: 75%;
          padding: 0.6rem 0.85rem;
          border-radius: 14px;
          line-height: 1.4;
          white-space: pre-wrap;
          font-size: 0.9rem;
        }

        .chat-message.bot .message-bubble {
          background: white;
          color: #1e293b;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .chat-message.user .message-bubble {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.typing {
          display: flex;
          gap: 0.4rem;
          padding: 1rem;
        }

        .message-bubble.typing span {
          width: 8px;
          height: 8px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .message-bubble.typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .message-bubble.typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        .quick-questions {
          padding: 0 1rem 0.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          background: #f8fafc;
        }

        .quick-question-btn {
          background: white;
          border: 2px solid #e2e8f0;
          padding: 0.4rem 0.85rem;
          border-radius: 16px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s;
          color: #475569;
        }

        .quick-question-btn:hover {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .chat-bot-input {
          padding: 0.85rem 1rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 0.6rem;
          background: white;
          border-radius: 0 0 16px 16px;
        }

        .chat-bot-input input {
          flex: 1;
          border: 2px solid #e2e8f0;
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          outline: none;
          font-size: 0.9rem;
          transition: border-color 0.3s;
        }

        .chat-bot-input input:focus {
          border-color: #2563eb;
        }

        .chat-bot-input button {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .chat-bot-input button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
        }

        .chat-bot-input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chat-bot-window {
            width: calc(100vw - 2rem);
            height: 400px;
            right: 1rem;
            bottom: 4.5rem;
          }

          .chat-bot-button {
            bottom: 1rem;
            right: 1rem;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  );
}
