import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import ResetPass from "./pages/ResetPass"; 
import "./App.css";
import "./pages/policy"
import Help from "./pages/Help";
import Policy from "./pages/policy";
import ComplaintForm from "./pages/ComplaintForm";
import UserDashboard from "./pages/UserDashboard";
import DepartmentDashboard from "./pages/DepartmentDashboard";
import ComplaintStatusChecker from "./pages/ComplaintStatusChecker";
import ProfilePage from "./components/ProfileUser";
import History from "./pages/History";
import StatusUpdatePage from "./components/StatusUpdate";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Router>
      
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset-password-request" element={<PasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
          <Route path="/policy-Citizen Loop" element={<Policy />} />
          <Route path="/help-Citizen Loop" element={<Help />} />
          <Route path="/complaint-form" element={<ComplaintForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/department-dashboard" element={<DepartmentDashboard />} />
          <Route path="/check-complaint-status" element={<ComplaintStatusChecker />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/History" element={<History />} />
          <Route path="/update-status" element={<StatusUpdatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;