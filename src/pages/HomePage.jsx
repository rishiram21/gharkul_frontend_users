import React, { useState, useEffect } from 'react';
import { Search, Star, Phone, MessageCircle, Share2, MapPin, Home, Building, Users, Filter, Menu, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

  const fetchRequirements = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/requirement/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching requirements:', error);
    return [];
  }
};

const HomePage = () => {
  const [requirements, setRequirements] = useState([]);
  const [activeTab, setActiveTab] = useState('Buy');
  const [activePropertyType, setActivePropertyType] = useState('Kharadi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const propertyTypes = ['Kharadi', 'Viman Nagar', 'Bhorawadi', 'Baner', 'Balewadi'];
  const tabs = ['Buy', 'Rent', 'Requirement'];
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const getRequirements = async () => {
      const data = await fetchRequirements();
      setRequirements(data);
    };

    getRequirements();
  }, []);

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

  // const requirements = [
  //   {
  //     id: 1,
  //     name: "Isha Shah",
  //     timePosted: "Just now",
  //     locations: ["Kharadi", "Viman Nagar", "Baner", "Undri", "Hadapsar"],
  //     primaryLocation: "Kharadi",
  //     description: "Need a 2BHK urgently in Kharadi, semi-furnished okay. Budget around 25k.",
  //     status: "Posted Just now"
  //   },
  //   {
  //     id: 2,
  //     name: "Rajesh Kumar",
  //     timePosted: "2 hours ago",
  //     locations: ["Wakad", "Hinjewadi", "Balewadi", "Aundh"],
  //     primaryLocation: "Wakad",
  //     description: "Looking for 3BHK fully furnished apartment in Wakad. Budget 35-40k. Family of 4.",
  //     status: "Active"
  //   },
  //   {
  //     id: 3,
  //     name: "Priya Mehta",
  //     timePosted: "5 hours ago",
  //     locations: ["Koregaon Park", "Kalyani Nagar", "Viman Nagar", "Camp"],
  //     primaryLocation: "Koregaon Park",
  //     description: "Single working professional seeking 1BHK in Koregaon Park area. Budget 20-25k.",
  //     status: "Urgent"
  //   }
  // ];

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
      {/* Search Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8">
        <div className="w-full px-3 md:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-4 md:mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search Properties, Requirements..."
                className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 border border-gray-200 rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex justify-center mb-4 md:mb-6">
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
          {/* Property Type Filters */}
          <div className="flex justify-center mb-4 md:mb-6">
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
          {/* Search Button */}
          <div className="text-center">
            <button className="bg-blue-500 text-white px-8 md:px-12 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base shadow-md">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Requirements Section */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-100">
        <div className="w-full px-3 md:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              <h2 className="text-lg md:text-2xl font-bold text-gray-800">Featured Requirements</h2>
            </div>
          </div>
          {/* Slider Container */}
          <div className="relative max-w-3xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            {/* Slider Content */}
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {requirements.map((req, index) => (
                  <div key={req.requirementId} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">{req.lookingFor}</h3>
                            {/* <span className={`px-2 py-1 rounded text-xs font-medium inline-block mt-1 md:mt-0 w-fit ${getStatusColor(req.status)}`}>
                              {req.status}
                            </span> */}
                          </div>
                          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                            {req.preferredLocations.map((location, idx) => (
                              <span key={idx} className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm">
                                {location}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-600 mb-4 text-sm md:text-base">
                            {req.additionalRequirements}
                          </p>
                          <p className="mb-2">
                          <a
                            href={`tel:${req.phoneNumber}`}
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                          >
                            📞 Call 
                          </a>
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {requirements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            {/* Slide Counter */}
            <div className="text-center mt-2 text-sm text-gray-500">
              {currentSlide + 1} of {requirements.length}
            </div>
          </div>
        </div>
      </section>

      {/* Handpicked Properties Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
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
                        {/* <button className="bg-white/90 backdrop-blur-md p-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                          <Heart className="w-4 h-4 text-red-500 hover:fill-current transition-all duration-300" />
                        </button> */}
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {property.type || 'Property'}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className="absolute top-4 left-4">
                          {/* <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            ✨ Featured
                          </span> */}
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
                      {/* <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
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
                      </div> */}
                      <div className="flex gap-3 mt-2">
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
                      {/* <button className="bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <Heart className="w-5 h-5 text-red-500 hover:fill-current transition-all duration-300" />
                      </button> */}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {property.type || 'Property'}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="absolute top-4 left-4">
                        {/* <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse">
                          ✨ Featured
                        </span> */}
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
                    {/* <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
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
                    </div> */}
                    <div className="flex gap-4 mt-2">
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
        </div>
      </section>

      {/* Under Construction Projects */}
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
            {/* Navigation Arrows */}
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
            {/* Slider Container */}
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

      {/* Quick Stats */}
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
