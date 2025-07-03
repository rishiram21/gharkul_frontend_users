import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Star, Users, Briefcase, X, Zap, Shield, TrendingUp, ArrowRight, ChevronDown, ChevronUp, Gift, Clock, Phone, Mail, MessageCircle, CreditCard, Lock, ArrowLeft, Award, Target, Sparkles } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext'; // Adjust the import path as necessary

const fetchPackages = async (navigate) => {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Fetching packages with token:', token);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/packages/get`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Packages fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error);
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access, redirecting to login...');
      localStorage.removeItem('authToken');
      navigate('/signin');
    }
    throw error;
  }
};

const Subscription = () => {
  const [showUserPlans, setShowUserPlans] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const [userPlans, setUserPlans] = useState([]);
  const [brokerPlans, setBrokerPlans] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const token = localStorage.getItem('authToken');
        console.log('Token:', token);

        const packages = await fetchPackages(navigate);
        console.log('Fetched packages:', packages);

        const userPlansData = packages.filter(pkg => pkg.userRole === 'OWNER');
        const brokerPlansData = packages.filter(pkg => pkg.userRole === 'BROKER');

        console.log('User plans:', userPlansData);
        console.log('Broker plans:', brokerPlansData);

        setUserPlans(userPlansData);
        setBrokerPlans(brokerPlansData);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    setAnimateCards(true);
  }, [showUserPlans]);

  const togglePlans = (isUser) => {
    setShowUserPlans(isUser);
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  };

  const currentPlans = user?.userRole ? (user.userRole === 'OWNER' ? userPlans : brokerPlans) : (showUserPlans ? userPlans : brokerPlans);

  const handlePlanSelect = (plan) => {
    if (!isLoggedIn()) {
      navigate('/signin', { state: { from: location.pathname } });
      return;
    }

    const serializablePlan = {
      name: plan.packageName,
      price: `₹${plan.price}`,
      originalPrice: `₹${plan.price + 1000}`,
      period: `/${plan.durationDays} days`,
      description: plan.description,
      features: plan.features.split(','),
      popular: plan.status === 'POPULAR',
      color: 'from-blue-500 to-blue-600',
      savings: '25% OFF',
      planId: plan.packageId,
      badge: plan.status === 'POPULAR' ? 'Most Popular' : 'Best Value'
    };

    navigate('/checkout', { state: { selectedPlan: serializablePlan } });
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('authToken');
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Verified",
      description: "All properties and contacts are verified for your safety"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Instant Access",
      description: "Get immediate access to property owner details"
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your preferences"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Premium Support",
      description: "24/7 customer support for all your queries"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16 mt-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Limited Time Offer - Up to 33% OFF</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
            Find Your Perfect Property
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            Choose from our comprehensive plans designed for every property seeker - from first-time buyers to professional Broker
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                View Plans <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-blue-200">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">25+</div>
              <div className="text-blue-200">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
          {!isLoggedIn() && (
            <>
              <button
                onClick={() => togglePlans(true)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  showUserPlans
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Users size={20} />
                Owner
              </button>
              <button
                onClick={() => togglePlans(false)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  !showUserPlans
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Briefcase size={20} />
                Broker
              </button>
            </>
          )}

          {isLoggedIn() && user?.userRole === 'OWNER' && (
            <button
              onClick={() => togglePlans(true)}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                showUserPlans
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              Owner
            </button>
          )}

          {isLoggedIn() && user?.userRole === 'BROKER' && (
            <button
              onClick={() => togglePlans(false)}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                !showUserPlans
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Briefcase size={20} />
              Broker
            </button>
          )}
        </div>
      </div>


      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {currentPlans.map((plan, index) => (
          <div
            key={plan.packageId}
            className={`relative bg-white rounded-3xl shadow-xl border-2 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              plan.popular
                ? 'border-purple-500 ring-4 ring-purple-500 ring-opacity-20 transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            } ${animateCards ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                  <Star size={16} fill="white" />
                  {plan.badge || 'Most Popular'}
                </div>
              </div>
            )}

            {plan.savings && (
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {plan.savings}
                </div>
              </div>
            )}

            <div className="p-8 pt-12">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${plan.color || 'from-blue-500 to-blue-600'} flex items-center justify-center mb-6 mx-auto shadow-xl`}>
                <Check className="w-12 h-12 text-white" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.packageName}</h3>
                {!plan.popular && plan.badge && (
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {plan.badge}
                  </div>
                )}
                <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>

                <div className="flex flex-col items-center mb-6">
                  {plan.originalPrice && (
                    <div className="text-lg text-gray-400 line-through mb-1">₹{plan.originalPrice}</div>
                  )}
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features && plan.features.split(',').map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${plan.color || 'from-blue-500 to-blue-600'} hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-30 active:scale-95`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Choose {plan.packageName} <ArrowRight size={16} />
                  </span>
                </button>

                {plan.popular && (
                  <p className="text-center text-sm text-gray-500">
                    🔥 Most customers choose this plan
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that make property hunting effortless and successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20" id="plans">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-white text-center mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-6">Need Help Choosing the Right Plan?</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Our expert team is here to help you find the perfect plan for your property needs. Get personalized recommendations and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+919632748927"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone size={20} />
                Call Now
              </a>

              <a
                href="https://wa.me/919632748927"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle size={20} />
                WhatsApp Chat
              </a>

              <a
                href="mailto:gharkul@gmail.com"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail size={20} />
                Email Support
              </a>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of successful Owner and real estate professionals who trust our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Now <ArrowRight size={20} />
              </span>
            </button>
            <button
              onClick={() => setShowFAQ(true)}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Have Questions?
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Lock size={16} />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={16} />
              <span className="text-sm">Data Protected</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award size={16} />
              <span className="text-sm">Trusted by 50K+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
