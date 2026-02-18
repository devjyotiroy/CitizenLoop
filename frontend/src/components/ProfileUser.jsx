import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { 
  Camera, 
  Save, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  X, 
  Loader,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Edit2,
  Bell,
  Key,
  Upload,
  Trash2
} from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    role: "",
    profilePic: "",
    notifications: true,
  });
  
  const [formData, setFormData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [previewUrl, setPreviewUrl] = useState("");
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (formData.newPassword) {
      calculatePasswordStrength(formData.newPassword);
    }
  }, [formData.newPassword]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("https://citizenloop.onrender.com/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setProfile(data);
      setFormData(prev => ({
        ...prev,
        name: data.name,
        notifications: data.notifications || true
      }));
      
      if (data.profilePic) {
        const url = data.profilePic.startsWith('http') 
          ? data.profilePic 
          : `https://citizenloop.onrender.com/uploads/${data.profilePic}`;
        setPreviewUrl(url);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to fetch profile." });
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size too large. Please choose a file smaller than 2MB." });
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setMessage({ type: "error", text: "Please select a valid image file (JPEG, PNG, WebP, GIF)." });
        return;
      }
      
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result);
        setShowCropModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop({
      unit: '%',
      width: 90,
      aspect: 1 / 1,
    });
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        crop,
        'profile-pic.jpg'
      );
      
      if (croppedImageBlob.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "Cropped image is still too large. Please try a different image." });
        setShowCropModal(false);
        return;
      }
      
      setProfilePic(croppedImageBlob);
      setPreviewUrl(URL.createObjectURL(croppedImageBlob));
      setImageError(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    
    setPasswordStrength(Math.min(strength, 100));
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 80) return { text: "Strong", color: "text-green-600", bg: "bg-green-500" };
    if (passwordStrength >= 60) return { text: "Good", color: "text-blue-600", bg: "bg-blue-500" };
    if (passwordStrength >= 40) return { text: "Fair", color: "text-yellow-600", bg: "bg-yellow-500" };
    return { text: "Weak", color: "text-red-600", bg: "bg-red-500" };
  };

  const validateForm = () => {
    // Validate password if any password field is filled
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        return "Current password is required to change password";
      }
      if (!formData.newPassword) {
        return "New password is required";
      }
      if (formData.newPassword.length < 6) {
        return "Password must be at least 6 characters long";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        return "Passwords do not match";
      }
      if (passwordStrength < 40) {
        return "Password is too weak. Please choose a stronger password";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      
      // Only append password fields if current password is provided
      if (formData.currentPassword) {
        submitData.append("currentPassword", formData.currentPassword);
        submitData.append("newPassword", formData.newPassword);
      }
      
      submitData.append("notifications", formData.notifications);
      if (profilePic) submitData.append("profilePic", profilePic);

      const { data } = await axios.put(
        "https://citizenloop.onrender.com/api/users/profile",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(data.profile);
      setMessage({ 
        type: "success", 
        text: "Profile updated successfully!" 
      });
      
      // Reset password fields on success
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setPasswordStrength(0);
      setProfilePic(null);
      
      if (data.profile.profilePic) {
        const url = data.profile.profilePic.startsWith('http')
          ? data.profile.profilePic
          : `https://citizenloop.onrender.com/uploads/${data.profile.profilePic}`;
        setPreviewUrl(url);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Profile update failed. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }
    setLoading(false);
  };

  const handleRemoveProfilePic = () => {
    setPreviewUrl("");
    setProfilePic(null);
    setImageError(false);
  };

  const handleCropComplete = (crop) => {
    setCompletedCrop(crop);
  };

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleSaveCroppedImage = async () => {
    if (completedCrop) {
      await makeClientCrop(completedCrop);
    }
    setShowCropModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const hasChanges = () => {
    return formData.name !== profile.name || 
           formData.notifications !== profile.notifications ||
           formData.currentPassword || 
           formData.newPassword || 
           formData.confirmPassword || 
           profilePic;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-center relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {profile.role || "User"}
                  </span>
                </div>
                
                <div className="relative inline-block mb-4">
                  {previewUrl && !imageError ? (
                    <>
                      <img 
                        src={previewUrl} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        onError={handleImageError}
                      />
                      <button
                        onClick={handleRemoveProfilePic}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-xl">
                      {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  
                  <label 
                    htmlFor="profilePicInput" 
                    className="absolute bottom-2 right-2 bg-white text-purple-600 rounded-full p-2 cursor-pointer shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    <Camera size={20} />
                  </label>
                  <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                <p className="text-purple-100">{profile.email}</p>
                
                <div className="mt-4 flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-white font-bold">Joined</div>
                    <div className="text-purple-200 text-sm">2023</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">Status</div>
                    <div className="text-green-300 text-sm">Active</div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === "profile" 
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <User size={20} className="mr-3" />
                    Profile Information
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === "security" 
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Lock size={20} className="mr-3" />
                    Security & Password
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                      activeTab === "notifications" 
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Bell size={20} className="mr-3" />
                    Notifications
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {activeTab === "profile" && "Profile Information"}
                      {activeTab === "security" && "Security Settings"}
                      {activeTab === "notifications" && "Notification Preferences"}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {activeTab === "profile" && "Update your personal information"}
                      {activeTab === "security" && "Manage your password and security settings"}
                      {activeTab === "notifications" && "Control your notification preferences"}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">All changes saved</span>
                  </div>
                </div>

                {/* Message Alert */}
                {message.text && (
                  <div className={`p-4 rounded-xl mb-6 flex items-center ${
                    message.type === "success" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {message.type === "success" ? (
                      <CheckCircle size={20} className="mr-3" />
                    ) : (
                      <AlertCircle size={20} className="mr-3" />
                    )}
                    {message.text}
                  </div>
                )}

                {/* Profile Information Tab */}
                {activeTab === "profile" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
                          />
                          <span className="absolute right-3 top-3 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            Verified
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            value={profile.mobile || ""}
                            disabled
                            className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
                            placeholder="Not provided"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin size={18} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={profile.address || ""}
                            disabled
                            className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 cursor-not-allowed"
                            placeholder="Not provided"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors mr-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !hasChanges()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                      >
                        {loading ? (
                          <>
                            <Loader size={20} className="animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={20} className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Security & Password Tab */}
                {activeTab === "security" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6">
                      <div className="flex items-center mb-4">
                        <Key size={24} className="text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                      </div>
                      <p className="text-gray-600 mb-6">
                        For security reasons, please enter your current password before setting a new one.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={formData.currentPassword}
                              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={formData.newPassword}
                              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          
                          {/* Password Strength Meter */}
                          {formData.newPassword && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Password strength:</span>
                                <span className={`font-medium ${getPasswordStrengthText().color}`}>
                                  {getPasswordStrengthText().text}
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getPasswordStrengthText().bg} transition-all duration-300`}
                                  style={{ width: `${passwordStrength}%` }}
                                ></div>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <CheckCircle size={12} className={`mr-1 ${formData.newPassword.length >= 6 ? 'text-green-500' : 'text-gray-300'}`} />
                                  At least 6 characters
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle size={12} className={`mr-1 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                                  Uppercase letter
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle size={12} className={`mr-1 ${/[a-z]/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                                  Lowercase letter
                                </div>
                                <div className="flex items-center">
                                  <CheckCircle size={12} className={`mr-1 ${/\d/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-300'}`} />
                                  Number
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock size={18} className="text-gray-400" />
                            </div>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          setPasswordStrength(0);
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors mr-3"
                      >
                        Clear All
                      </button>
                      <button
                        type="submit"
                        disabled={loading || !formData.currentPassword}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                      >
                        {loading ? (
                          <>
                            <Loader size={20} className="animate-spin mr-2" />
                            Updating Password...
                          </>
                        ) : (
                          <>
                            <Key size={20} className="mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
                          <p className="text-gray-600">Receive updates about your account activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notifications}
                            onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      
                      <div className="space-y-3 mt-6">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Bell size={16} className="text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-700">Security Alerts</p>
                            <p className="text-sm text-gray-500">Important updates about your account security</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail size={16} className="text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-700">Product Updates</p>
                            <p className="text-sm text-gray-500">News about new features and improvements</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={loading || !hasChanges()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                      >
                        {loading ? (
                          <>
                            <Loader size={20} className="animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={20} className="mr-2" />
                            Save Preferences
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && imgSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Crop Profile Picture</h3>
                <p className="text-gray-600">Adjust the crop area to your preference</p>
              </div>
              <button 
                onClick={() => setShowCropModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <ReactCrop
                crop={crop}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
                aspect={1}
                className="rounded-lg overflow-hidden"
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-80"
                />
              </ReactCrop>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCropModal(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center"
              >
                <Upload size={18} className="mr-2" />
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
