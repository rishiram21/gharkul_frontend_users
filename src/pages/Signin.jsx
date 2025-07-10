import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Shield, Eye, EyeOff, User, CheckCircle } from 'lucide-react';
import { AuthContext } from '../context/Authcontext';
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Signin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { login } = useContext(AuthContext);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const sendOTP = async () => {
  setErrors({});

  if (!phoneNumber) {
    setErrors({ phone: 'Phone number is required' });
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/send-login-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (response.ok) {
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
      const errorData = await response.json();
      if (errorData.message?.toLowerCase().includes('not registered')) {
        setErrors({ phone: 'This number is not registered. Please register first.' });
      } else {
        setErrors({ phone: errorData.message || 'This number is not registered. Please register first' });
      }
    }
  } catch (error) {
    setErrors({ phone: 'Network error. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};


  // In your Signin.js, update the handleSubmit function:

const handleSubmit = async () => {
    setErrors({});

    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    if (otp.length !== 4) {
      setErrors({ otp: 'OTP must be 4 digits' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/verify-login-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `${phoneNumber}`,
          otp: otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);

        if (data.token) {
          const userData = data.user;
          console.log('✅ Full UserDTO:', userData);

          if (userData) {
            login(data.token, userData);
            // Redirect to the stored location or default to the subscription page
            const from = location.state?.from || '/subscription';
            navigate(from);
          } else {
            console.error('❌ No user data found in response');
            setErrors({ otp: 'Login successful but user data not found. Please try again.' });
          }
        } else {
          console.error('❌ No token in response');
          setErrors({ otp: 'Invalid response from server' });
        }
      } else {
        const errorData = await response.json();
        setErrors({ otp: errorData.message || 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ otp: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 10);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (errors.otp) {
      setErrors({ ...errors, otp: '' });
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
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/70">Sign in to access your account</p>
          </div>

          <div className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="w-5 h-5 text-white/60" />
                  <span className="ml-2 text-white/60 text-m">+91</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full pl-20 pr-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-400' : 'border-white/30'
                  }`}
                  disabled={isOtpSent}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Send OTP Button */}
            {!isOtpSent ? (
              <button
                type="button"
                onClick={sendOTP}
                disabled={isLoading || !phoneNumber}
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
                  <p className="text-green-400 text-sm font-medium">OTP Sent Successfully!</p>
                  <p className="text-white/70 text-xs">Check your phone for the verification code</p>
                </div>
              </div>
            )}

            {/* OTP Input */}
            {isOtpSent && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Enter OTP</label>
                  <div className="relative">
                    <input
                      type={showOtp ? 'text' : 'password'}
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter 4-digit OTP"
                      className={`w-full pl-4 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-center text-lg tracking-widest ${
                        errors.otp ? 'border-red-400' : 'border-white/30'
                      }`}
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOtp(!showOtp)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                    >
                      {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp}</p>}
                </div>

                {/* Resend OTP */}
                {/* <h3 className='text-white text-center'>Default OTP - 1234</h3> */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Didn't receive OTP?</span>
                  {countdown > 0 ? (
                    <span className="text-white/60">Resend in {countdown}s</span>
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

                {/* Sign In Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !otp}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-white/70">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/50 text-sm">
          <p>Secure authentication powered by OTP verification</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
