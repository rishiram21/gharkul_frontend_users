import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Shield,
  Eye,
  EyeOff,
  User,
  CheckCircle,
  UserPlus,
  Building,
} from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    accountType: "OWNER", // Default to Customer
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    address: {
      area: "",
      pinCode: "",
    },
    // agencyNumber: "",
    reraNumber: "",
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validate phone number (Indian format)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate pincode
  const validatePinCode = (pinCode) => {
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    return pinCodeRegex.test(pinCode);
  };

  const sendOTP = async () => {
    setErrors({});

    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    if (!formData.address.area.trim()) newErrors.area = "Area is required";
    if (!formData.address.pinCode) {
      newErrors.pinCode = "Pincode is required";
    } else if (!validatePinCode(formData.address.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pincode";
    }

    if (formData.accountType === "Broker") {
      if (!formData.reraNumber.trim())
        newErrors.reraNumber = "RERA number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/send-registration-otp`,
        {
          
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          userRole: formData.accountType.toUpperCase(),
          address: formData.address,
          // agencyName: formData.agencyNumber,
          reraNumber: formData.reraNumber,
        }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
        setCountdown(30);

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        const errorData = response.data;
        setErrors({ general: errorData.message || "Failed to send OTP" });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setErrors({});

    if (!formData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    if (formData.otp.length !== 4) {
      setErrors({ otp: "OTP must be 4 digits" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/verify-registration-otp`,
        {
          phoneNumber: formData.phoneNumber,
          otp: formData.otp,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        window.location.href = "/signin";
      } else {
        const errorData = response.data;
        setErrors({ otp: errorData.message || "Invalid OTP or signup failed" });
      }
    } catch (error) {
      setErrors({ otp: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 10);
  };

  const formatPinCode = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 6);
  };

  const handleInputChange = (field, value) => {
    if (field === "phoneNumber") {
      value = formatPhoneNumber(value);
    } else if (field === "pinCode") {
      value = formatPinCode(value);
    } else if (field === "otp") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    if (['area', 'pinCode'].includes(field)) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-white/70">Join us to get started</p>
          </div>

          <div className="space-y-6">
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Account Type
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("accountType", "OWNER")}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.accountType === "OWNER"
                      ? "bg-indigo-600 text-white border-2 border-indigo-500"
                      : "bg-white/10 text-white/70 border-2 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Owner
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("accountType", "BROKER")}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.accountType === "BROKER"
                      ? "bg-indigo-600 text-white border-2 border-indigo-500"
                      : "bg-white/10 text-white/70 border-2 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <Building className="w-4 h-4" />
                  Broker
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.firstName ? "border-red-400" : "border-white/30"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.lastName ? "border-red-400" : "border-white/30"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.email ? "border-red-400" : "border-white/30"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="w-5 h-5 text-white/60" />
                  <span className="ml-2 text-white/60 text-m">+91</span>
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="Enter 10-digit phone number"
                  className={`w-full pl-20 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.phoneNumber ? "border-red-400" : "border-white/30"
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Location Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Area
                </label>
                <input
                  type="text"
                  value={formData.address.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="Enter area"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.area ? "border-red-400" : "border-white/30"
                  }`}
                />
                {errors.area && (
                  <p className="text-red-400 text-xs mt-1">{errors.area}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.address.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="Enter pincode"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.pinCode ? "border-red-400" : "border-white/30"
                  }`}
                />
                {errors.pinCode && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.pinCode}
                  </p>
                )}
              </div>
            </div>

            {/* Broker-specific fields */}
            {formData.accountType === "BROKER" && (
              <div className="space-y-4">
                {/* <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Agency Number
                  </label>
                  <input
                    type="text"
                    value={formData.agencyNumber}
                    onChange={(e) =>
                      handleInputChange("agencyNumber", e.target.value)
                    }
                    placeholder="Enter agency number"
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.agencyNumber ? "border-red-400" : "border-white/30"
                    }`}
                  />
                  {errors.agencyNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.agencyNumber}
                    </p>
                  )}
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    RERA Number
                  </label>
                  <input
                    type="text"
                    value={formData.reraNumber}
                    onChange={(e) =>
                      handleInputChange("reraNumber", e.target.value)
                    }
                    placeholder="Enter RERA number"
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.reraNumber ? "border-red-400" : "border-white/30"
                    }`}
                  />
                  {errors.reraNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.reraNumber}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Send OTP Button */}
            {!isOtpSent ? (
              <button
                type="button"
                onClick={sendOTP}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Send OTP
                  </div>
                )}
              </button>
            ) : (
              <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <p className="text-green-400 text-sm font-medium">
                    OTP Sent Successfully!
                  </p>
                  <p className="text-white/70 text-xs">
                    Check your phone for the verification code
                  </p>
                </div>
              </div>
            )}

            {/* OTP Input */}
            {isOtpSent && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <input
                      type={showOtp ? "text" : "password"}
                      value={formData.otp}
                      onChange={(e) => handleInputChange("otp", e.target.value)}
                      placeholder="Enter 4-digit OTP"
                      className={`w-full pl-4 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center text-lg tracking-widest ${
                        errors.otp ? "border-red-400" : "border-white/30"
                      }`}
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                    >
                      {showOtp ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.otp && (
                    <p className="text-red-400 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>

                {/* Resend OTP */}
                {/* <h3 className='text-white text-center'>Default OTP - 1234</h3> */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Didn't receive OTP?</span>
                  {countdown > 0 ? (
                    <span className="text-white/60">
                      Resend in {countdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOTP}
                      className="text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.otp}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/50 text-sm">
          <p>Secure registration with OTP verification</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
