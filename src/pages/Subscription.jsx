import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Users, Briefcase, X, Zap, Shield, TrendingUp, ArrowRight, ChevronDown, ChevronUp, Gift, Clock, Phone, Mail, MessageCircle, CreditCard, Lock, ArrowLeft, Award, Target, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Subscription = () => {
  const [showUserPlans, setShowUserPlans] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setAnimateCards(true);
  }, [showUserPlans]);

  const togglePlans = (isUser) => {
    setShowUserPlans(isUser);
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  };

  const userPlans = [
    {
      name: 'Starter',
      price: '₹299',
      originalPrice: '₹399',
      period: '/30 days',
      description: 'Perfect for getting started with basic property access',
      features: [
        '10 Property Contacts',
        'One-time Property Access',
        'Easy-to-Use Interface',
        '30 Days Validity',
        'Basic Search Filters',
        'Mobile App Access'
      ],
      popular: false,
      color: 'from-blue-500 to-blue-600',
      icon: <TrendingUp size={24} className="text-white" />,
      savings: '25% OFF',
      planId: 'starter_user',
      badge: 'Best for Beginners'
    },
    {
      name: 'Smart',
      price: '₹699',
      originalPrice: '₹999',
      period: '/30 days',
      description: 'Great for active property seekers with enhanced features',
      features: [
        '25 Property Contacts',
        'Priority Customer Support',
        'Advanced Matching Features',
        '30 Days Validity',
        'Property Alerts & Notifications',
        'Saved Searches & Favorites',
        'Property History Tracking'
      ],
      popular: true,
      color: 'from-purple-500 to-purple-600',
      icon: <Zap size={24} className="text-white" />,
      savings: '30% OFF',
      planId: 'smart_user',
      badge: 'Most Popular'
    },
    {
      name: 'Premium',
      price: '₹999',
      originalPrice: '₹1,499',
      period: '/30 days',
      description: 'Complete solution with premium support and exclusive features',
      features: [
        '50 Property Contacts',
        'WhatsApp Instant Alerts',
        '24x7 Priority Support',
        '30 Days Validity',
        'Exclusive Property Listings',
        'Personal Property Advisor',
        'Market Analytics & Reports',
        'Virtual Property Tours'
      ],
      popular: false,
      color: 'from-emerald-500 to-emerald-600',
      icon: <Shield size={24} className="text-white" />,
      savings: '33% OFF',
      planId: 'premium_user',
      badge: 'Best Value'
    }
  ];

  const brokerPlans = [
    {
      name: 'Basic',
      price: '₹4,999',
      originalPrice: '₹6,999',
      period: '/45 days',
      description: 'Essential tools for growing your real estate business',
      features: [
        '20 Property Listings',
        'Basic Profile Visibility',
        'Easy Property Management',
        '45 Days Validity',
        'Lead Management System',
        'Basic Analytics Dashboard'
      ],
      popular: false,
      color: 'from-orange-500 to-orange-600',
      icon: <Users size={24} className="text-white" />,
      savings: '28% OFF',
      planId: 'basic_broker',
      badge: 'Startup Friendly'
    },
    {
      name: 'Pro',
      price: '₹8,999',
      originalPrice: '₹12,999',
      period: '/60 days',
      description: 'Advanced features for professional real estate agents',
      features: [
        '35 Property Listings',
        'Advanced Analytics & Insights',
        'Professional Profile Page',
        '60 Days Validity',
        'CRM Integration',
        'Marketing Tools & Templates',
        'Lead Scoring System'
      ],
      popular: true,
      color: 'from-red-500 to-red-600',
      icon: <Briefcase size={24} className="text-white" />,
      savings: '31% OFF',
      planId: 'pro_broker',
      badge: 'Professional Choice'
    },
    {
      name: 'Elite',
      price: '₹14,999',
      originalPrice: '₹19,999',
      period: '/75 days',
      description: 'Premium solution for elite real estate professionals',
      features: [
        '100 Property Listings',
        'Featured Agent Badge',
        'WhatsApp Business Integration',
        '75 Days Validity',
        'Dedicated Account Manager',
        'Custom Branding Options',
        'Priority Listing Display',
        'Advanced Market Reports'
      ],
      popular: false,
      color: 'from-indigo-500 to-indigo-600',
      icon: <Award size={24} className="text-white" />,
      savings: '25% OFF',
      planId: 'elite_broker',
      badge: 'Enterprise Grade'
    }
  ];

  const currentPlans = showUserPlans ? userPlans : brokerPlans;

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Property Investor",
      content: "The Smart plan completely transformed my property search experience. Found my dream home within 2 weeks!",
      rating: 5,
      avatar: "RK",
      location: "Mumbai"
    },
    {
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      content: "Premium features helped me close 40% more deals. The analytics dashboard is incredibly insightful.",
      rating: 5,
      avatar: "SJ",
      location: "Delhi"
    },
    {
      name: "Mumbai Properties",
      role: "Real Estate Firm",
      content: "The Elite broker platform streamlined our entire operation. Client management has never been easier.",
      rating: 5,
      avatar: "MP",
      location: "Mumbai"
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. If you upgrade mid-cycle, you'll only pay the prorated difference."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 14-day free trial for all plans. No credit card required to start. You can explore all features and decide which plan works best for you."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted channels."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all plans if you're not completely satisfied. No questions asked policy."
    },
    {
      question: "How do property contacts work?",
      answer: "Each plan includes a specific number of property contacts. When you're interested in a property, you can reveal the owner's contact details, which counts as one contact usage."
    },
    {
      question: "Can I use the service in multiple cities?",
      answer: "Yes, all our plans work across all cities where we operate. You can search and contact properties in any supported location."
    }
  ];

const location = useLocation();

const handlePlanSelect = (plan) => {
  if (!isLoggedIn()) {
    navigate('/signin', { state: { from: location.pathname } });
    return;
  }

  const serializablePlan = {
    name: plan.name,
    price: plan.price,
    originalPrice: plan.originalPrice,
    period: plan.period,
    description: plan.description,
    features: plan.features,
    popular: plan.popular,
    color: plan.color,
    savings: plan.savings,
    planId: plan.planId
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
        
        {/* Animated Background Elements */}
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
            Choose from our comprehensive plans designed for every property seeker - from first-time buyers to professional real estate agents
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
          
          {/* Stats */}
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

      {/* Plan Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
            <button
              onClick={() => togglePlans(true)}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                showUserPlans
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              Property Seekers
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
              Real Estate Agents
            </button>
          </div>
        </div>

      {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {currentPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-xl border-2 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-500 ring-4 ring-purple-500 ring-opacity-20 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${animateCards ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                    <Star size={16} fill="white" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Savings Badge */}
              {plan.savings && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {plan.savings}
                  </div>
                </div>
              )}

              <div className="p-8 pt-12">
                {/* Plan Icon */}
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6 mx-auto shadow-xl`}>
                  {plan.icon}
                </div>

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  {!plan.popular && plan.badge && (
                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {plan.badge}
                    </div>
                  )}
                  <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>

                  {/* Pricing */}
                  <div className="flex flex-col items-center mb-6">
                    {plan.originalPrice && (
                      <div className="text-lg text-gray-400 line-through mb-1">{plan.originalPrice}</div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check size={14} className="text-green-600" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="space-y-3">
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${plan.color} hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-30 active:scale-95`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Choose {plan.name} <ArrowRight size={16} />
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

      {/* Features Section */}
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
        
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who found their perfect property with us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 mb-8">Get answers to common questions about our plans and services</p>
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200"
            >
              {showFAQ ? 'Hide' : 'Show'} All FAQs
              {showFAQ ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>

          {showFAQ && (
            <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? 
                        <ChevronUp size={24} className="text-blue-600" /> : 
                        <ChevronDown size={24} className="text-gray-400" />
                      }
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-6 text-gray-700 animate-fadeIn leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact & Support */}
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

        {/* Money Back Guarantee */}
        {/* <div className="bg-green-50 rounded-3xl p-12 text-center mb-20 border border-green-200">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">30-Day Money Back Guarantee</h3>
            <p className="text-lg text-gray-700 mb-6">
              Try any plan risk-free for 30 days. If you're not completely satisfied, we'll refund your money. No questions asked.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Full Refund</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of successful property seekers and real estate professionals who trust our platform
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
          
          {/* Trust Indicators */}
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

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Custom scrollbar */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Enhanced button effects */
        .btn-primary {
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        /* Custom animations for plan cards */
        @media (prefers-reduced-motion: no-preference) {
          .plan-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .plan-card:hover {
            transform: translateY(-8px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default Subscription;