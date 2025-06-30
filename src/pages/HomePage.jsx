import React, { useState, useEffect } from 'react';
import { Search, Star, Phone, MessageCircle, Share2, MapPin, Home, Building, Users, Heart, Filter, Menu, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePropertyType, setActivePropertyType] = useState('Kharadi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const propertyTypes = ['Kharadi', 'Viman Nagar', 'Bhorawadi', 'Baner', 'Balewadi'];
  const tabs = ['Buy', 'Rent', 'Requirement'];

  const images = [
    '/src/assets/image1.jpg',
    '/src/assets/image2.jpg',
    '/src/assets/image3.jpg',
    '/src/assets/image4.jpg'
  ];

  const projects = [
    {
      id: 1,
      title: "Skyline Residences",
      subtitle: "Premium 2 & 3 BHK Apartments",
      location: "Baner, Pune",
      price: "₹85 Lakh - ₹1.2 Cr",
      status: "60% Complete",
      completion: "Dec 2025",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      badge: "New Launch",
      badgeColor: "bg-green-500"
    },
    {
      id: 2,
      title: "Heritage Gardens",
      subtitle: "Luxury Villa Community",
      location: "Kharadi, Pune",
      price: "₹1.8 Cr - ₹2.5 Cr",
      status: "40% Complete",
      completion: "Mar 2026",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      badge: "Premium",
      badgeColor: "bg-purple-500"
    },
    {
      id: 3,
      title: "Tech Park Towers",
      subtitle: "Smart 1, 2 & 3 BHK Homes",
      location: "Hinjewadi, Pune",
      price: "₹55 Lakh - ₹95 Lakh",
      status: "75% Complete",
      completion: "Aug 2025",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      badge: "Fast Track",
      badgeColor: "bg-orange-500"
    },
    {
      id: 4,
      title: "Riverside Enclave",
      subtitle: "Waterfront Apartments",
      location: "Wakad, Pune",
      price: "₹70 Lakh - ₹1.1 Cr",
      status: "30% Complete",
      completion: "Jun 2026",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      badge: "Exclusive",
      badgeColor: "bg-blue-500"
    }
  ];

  const featuredProperties = [
    {
      id: 1,
      title: '3 BHK in Ganga Constella',
      location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop&crop=center',
      price: '₹85 Lac',
      type: '3BHK',
      area: '1250 sq ft'
    },
    {
      id: 2,
      title: '2 BHK Ganga Ishanya',
      location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop&crop=center',
      price: '₹65 Lac',
      type: '2BHK',
      area: '950 sq ft'
    },
    {
      id: 3,
      title: '3 BHK Lavish Flat',
      location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop&crop=center',
      price: '₹95 Lac',
      type: '3BHK',
      area: '1400 sq ft'
    }
  ];

  const rentalsProperties = [
    {
      id: 1,
      title: '2 BHK Apartment for Rent',
      location: 'Kharadi, Pune',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop&crop=center',
      price: '₹25,000/month',
      type: '2BHK',
      area: '1100 sq ft'
    },
    {
      id: 2,
      title: '1 BHK Flat for Rent',
      location: 'Viman Nagar, Pune',
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=250&fit=crop&crop=center',
      price: '₹18,000/month',
      type: '1BHK',
      area: '750 sq ft'
    },
    {
      id: 3,
      title: '3 BHK Villa for Rent',
      location: 'Baner, Pune',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=250&fit=crop&crop=center',
      price: '₹40,000/month',
      type: '3BHK',
      area: '1600 sq ft'
    }
  ];

  const resaleProperties = [
    {
      id: 1,
      title: '2 BHK Resale Flat',
      location: 'Balewadi, Pune',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop&crop=center',
      price: '₹75 Lac',
      type: '2BHK',
      area: '1050 sq ft'
    },
    {
      id: 2,
      title: '3 BHK Resale Apartment',
      location: 'Hadapsar, Pune',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=center',
      price: '₹95 Lac',
      type: '3BHK',
      area: '1400 sq ft'
    },
    {
      id: 3,
      title: '1 BHK Resale Flat',
      location: 'Koregaon Park, Pune',
      image: 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&h=250&fit=crop&crop=center',
      price: '₹55 Lac',
      type: '1BHK',
      area: '700 sq ft'
    }
  ];

  const requirements = [
    {
      id: 1,
      name: "Isha Shah",
      timePosted: "Just now",
      locations: ["Kharadi", "Viman Nagar", "Baner", "Undri", "Hadapsar"],
      primaryLocation: "Kharadi",
      description: "Need a 2BHK urgently in Kharadi, semi-furnished okay. Budget around 25k.",
      status: "Posted Just now"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      timePosted: "2 hours ago",
      locations: ["Wakad", "Hinjewadi", "Balewadi", "Aundh"],
      primaryLocation: "Wakad",
      description: "Looking for 3BHK fully furnished apartment in Wakad. Budget 35-40k. Family of 4.",
      status: "Active"
    },
    {
      id: 3,
      name: "Priya Mehta",
      timePosted: "5 hours ago",
      locations: ["Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Camp"],
      primaryLocation: "Koregaon Park",
      description: "Single working professional seeking 1BHK in Koregaon Park area. Budget 20-25k.",
      status: "Urgent"
    }
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % requirements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + requirements.length) % requirements.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Posted Just now':
        return 'bg-green-100 text-green-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const underConstructionProject = {
    title: 'Gharkul Premises',
    subtitle: 'Possession From NA',
    price: '₹ 2.5 Cr',
    status: 'Onwards*',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&crop=center'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Section with Background Image Slider */}
      <section
        className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-32 relative"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="w-full px-3 md:px-6 lg:px-8 relative z-10">
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search Properties, Requirements..."
                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-center mb-6 md:mb-8">
            <div className="bg-white rounded-lg p-1 flex shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 md:px-6 py-2 rounded-md font-medium transition-colors text-sm md:text-base ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActivePropertyType(type)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border font-medium transition-colors text-xs md:text-sm ${
                    activePropertyType === type
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-500 text-white px-8 md:px-12 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Requirements Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-b border-gray-200">
  <div className="w-full px-4 md:px-6 lg:px-8">
    <div className="text-center mb-6 md:mb-8">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
        Featured Requirements
      </h2>
      <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto px-2">
        Discover premium opportunities curated for your expertise
      </p>
    </div>

    <div className="relative max-w-5xl mx-auto">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border hover:scale-110 group"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border hover:scale-110 group"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
      </button>

      <div className="overflow-hidden rounded-2xl shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {requirements.map((req, index) => (
            <div key={req.id} className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-indigo-200 group">
                
                {/* Header with Icon and Title */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {req.name}
                      </h3>
                      <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold inline-block mt-2 sm:mt-0 w-fit shadow-sm ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requirement Details Grid */}
                <div className="space-y-4 sm:space-y-6 mb-6">
                  
                  {/* Looking For & Property Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">1</span>
                        <label className="text-xs font-semibold text-gray-700">Looking For</label>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{req.lookingFor || 'Buy/Rent'}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">2</span>
                        <label className="text-xs font-semibold text-gray-700">Property Type</label>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{req.propertyType || 'Apartment'}</p>
                    </div>
                  </div>

                  {/* BHK & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">3</span>
                        <label className="text-xs font-semibold text-gray-700">BHK Type</label>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">{req.bhkConfiguration || '2-3 BHK'}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center mb-2">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">4</span>
                        <label className="text-xs font-semibold text-gray-700">Budget Range</label>
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {req.budget || '₹50L - ₹1Cr'}
                      </p>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center mb-3">
                      <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">5</span>
                      <label className="text-xs font-semibold text-gray-700">Preferred Locations</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                        📍 {req.primaryLocation}
                      </span>
                      {req.locations?.slice(1).map((location, idx) => (
                        <span key={idx} className="bg-white text-gray-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-gray-200 shadow-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  {req.description && (
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center mb-3">
                        <span className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-2 text-white font-bold text-xs">6</span>
                        <label className="text-xs font-semibold text-gray-700">Additional Requirements</label>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {req.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all duration-200 p-2 rounded-lg hover:bg-indigo-50">
                      <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">Contact</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      // Navigate to requirement details page
                      window.location.href = `/requirements/${req.id}`;
                    }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🏠</span>
                      View Details
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="flex justify-center space-x-3 mt-6">
        {requirements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg scale-110' 
                : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
            }`}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
          <span className="text-sm font-medium text-gray-700 mr-2">
            {currentSlide + 1} of {requirements.length}
          </span>
          <div className="w-16 bg-gray-200 rounded-full h-1.5 ml-2">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / requirements.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Handpicked Properties Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Handpicked Properties
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Discover premium properties curated by our expert team for the perfect investment opportunity
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4">
              <style jsx>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {featuredProperties.map((property, index) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="flex-none w-80 snap-center"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-[520px] flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                          <Heart className="w-4 h-4 text-red-500 hover:fill-current transition-all duration-300" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {property.type || 'Property'}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            ✨ Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-base text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {property.title || 'Property Title'}
                        </h3>
                        <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                          {property.price || 'Price'}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <div className="bg-gray-100 p-1.5 rounded-full mr-2">
                          <MapPin className="w-3 h-3" />
                        </div>
                        <p className="text-sm line-clamp-1">{property.location || 'Location'}</p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg mb-4">
                        <span className="text-gray-700 text-sm font-medium">{property.area || 'Area'}</span>
                      </div>
                      <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Broker</p>
                          <p className="font-medium text-gray-800 text-xs truncate">
                            {property.brokerName || 'Broker Name'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <a
                          href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </a>
                        <Link
                          to={`/property/${property.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {featuredProperties.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-[580px] flex flex-col">
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-current transition-all duration-300" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {property.type || 'Property'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                          ✨ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {property.title || 'Property Title'}
                      </h3>
                      <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                        {property.price || 'Price'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <p className="text-base line-clamp-1">{property.location || 'Location'}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl mb-5">
                      <span className="text-gray-700 font-medium">{property.area || 'Area'}</span>
                    </div>
                    <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">
                          {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Broker</p>
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {property.brokerName || 'Broker Name'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      <Link
                        to={`/property/${property.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <Link
              to="/listing"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View All Properties
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Rentals Handpicked Properties Section */}
      <section className="py-8 md:py-12 bg-white relative overflow-hidden">
        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Rentals Handpicked Properties
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Discover premium rental properties curated by our expert team for the perfect living experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4">
              <style jsx>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {rentalsProperties.map((property, index) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="flex-none w-80 snap-center"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-[520px] flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                          <Heart className="w-4 h-4 text-red-500 hover:fill-current transition-all duration-300" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {property.type || 'Property'}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            ✨ Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-base text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {property.title || 'Property Title'}
                        </h3>
                        <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                          {property.price || 'Price'}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <div className="bg-gray-100 p-1.5 rounded-full mr-2">
                          <MapPin className="w-3 h-3" />
                        </div>
                        <p className="text-sm line-clamp-1">{property.location || 'Location'}</p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg mb-4">
                        <span className="text-gray-700 text-sm font-medium">{property.area || 'Area'}</span>
                      </div>
                      <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Broker</p>
                          <p className="font-medium text-gray-800 text-xs truncate">
                            {property.brokerName || 'Broker Name'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <a
                          href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 text-sm font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </a>
                        <Link
                          to={`/property/${property.id}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-2.5 px-3 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 text-center text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {rentalsProperties.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalsProperties.map((property, index) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-[580px] flex flex-col">
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-current transition-all duration-300" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {property.type || 'Property'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                          ✨ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {property.title || 'Property Title'}
                      </h3>
                      <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                        {property.price || 'Price'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <p className="text-base line-clamp-1">{property.location || 'Location'}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl mb-5">
                      <span className="text-gray-700 font-medium">{property.area || 'Area'}</span>
                    </div>
                    <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">
                          {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Broker</p>
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {property.brokerName || 'Broker Name'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      <Link
                        to={`/property/${property.id}`}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <Link
              to="/rentals"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View All Rentals
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Resale Handpicked Properties Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
        <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Building className="w-8 h-8 text-white" />
            </div> */}
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Resale Handpicked Properties
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Discover premium resale properties curated by our expert team for the perfect investment opportunity
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-4 px-4">
              <style jsx>{`
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {resaleProperties.map((property, index) => (
                <Link
                  key={property.id}
                  to={`/property/${property.id}`}
                  className="flex-none w-80 snap-center"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-[520px] flex flex-col">
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                          <Heart className="w-4 h-4 text-red-500 hover:fill-current transition-all duration-300" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {property.type || 'Property'}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            ✨ Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-base text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {property.title || 'Property Title'}
                        </h3>
                        <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                          {property.price || 'Price'}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <div className="bg-gray-100 p-1.5 rounded-full mr-2">
                          <MapPin className="w-3 h-3" />
                        </div>
                        <p className="text-sm line-clamp-1">{property.location || 'Location'}</p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg mb-4">
                        <span className="text-gray-700 text-sm font-medium">{property.area || 'Area'}</span>
                      </div>
                      <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500">Broker</p>
                          <p className="font-medium text-gray-800 text-xs truncate">
                            {property.brokerName || 'Broker Name'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <a
                          href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 px-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-sm font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </a>
                        <Link
                          to={`/property/${property.id}`}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2.5 px-3 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 text-center text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {resaleProperties.map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resaleProperties.map((property, index) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-[580px] flex flex-col">
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-current transition-all duration-300" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {property.type || 'Property'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                          ✨ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {property.title || 'Property Title'}
                      </h3>
                      <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                        {property.price || 'Price'}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <div className="bg-gray-100 p-2 rounded-full mr-3">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <p className="text-base line-clamp-1">{property.location || 'Location'}</p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl mb-5">
                      <span className="text-gray-700 font-medium">{property.area || 'Area'}</span>
                    </div>
                    <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">
                          {property.brokerName ? property.brokerName.charAt(0).toUpperCase() : 'B'}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500">Broker</p>
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {property.brokerName || 'Broker Name'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={`tel:${property.brokerPhone || property.phone || '0000000000'}`}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      <Link
                        to={`/property/${property.id}`}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/listing"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View All Properties
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Under Construction Projects Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="w-full px-3 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-2xl font-bold text-center text-gray-800 mb-4 md:mb-6">
            Top Under Construction Projects
          </h2>

          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project) => (
                  <div key={project.id} className="w-full flex-shrink-0">
                    <div className="h-60 md:h-80 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 md:left-6 text-white">
                        <h3 className="text-lg md:text-xl font-bold mb-1">{project.title}</h3>
                        <p className="text-blue-100 text-sm md:text-base mb-2">{project.subtitle}</p>
                        <div className="flex items-center space-x-1 text-blue-200 text-xs md:text-sm">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 md:right-6 text-right text-white">
                        <div className="text-xl md:text-2xl font-bold mb-1">{project.price}</div>
                        <div className="text-blue-100 text-sm md:text-base mb-1">{project.status}</div>
                        <div className="flex items-center justify-end space-x-1 text-blue-200 text-xs md:text-sm">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{project.completion}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 md:right-6">
                        <span className={`${project.badgeColor} text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium`}>
                          {project.badge}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4 md:left-6">
                        <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-xs md:text-sm font-medium">
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-center space-x-2 mt-4 overflow-x-auto pb-2">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-800 truncate max-w-20">
                      {project.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {project.location.split(',')[0]}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-6 md:py-8 bg-blue-50">
        <div className="w-full px-3 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">100 +</div>
              <div className="text-gray-600 text-sm md:text-base">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">1000 +</div>
              <div className="text-gray-600 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">20 +</div>
              <div className="text-gray-600 text-sm md:text-base">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600 text-sm md:text-base">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
