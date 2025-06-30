import React, { useState, useEffect } from 'react';
import { Home, Users, Target, Heart, Mail, Phone, MapPin, Award, Star, ArrowRight } from 'lucide-react';

const Aboutus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: 'NA +', label: 'Happy Tenants', icon: Users },
    { number: 'NA +', label: 'Properties Listed', icon: Home },
    { number: 'NA +', label: 'Years Experience', icon: Award },
    { number: 'NA %', label: 'Customer Satisfaction', icon: Star }
  ];

  const teamMembers = [
  {
    name: 'Rajni Sharma',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'With 15+ years in real estate, Rajni founded Gharkul with a vision to simplify property rentals.'
  },
  {
    name: 'Priya Patel',
    role: 'Head of Operations',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Priya ensures smooth operations and exceptional customer service across all our locations.'
  },
  {
    name: 'Amit Kumar',
    role: 'Technology Lead',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    bio: 'Amit leads our tech innovation, making house hunting seamless through cutting-edge solutions.'
  }
];


  const values = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We believe in doing the right thing, always. Our commitment to honesty and transparency is the foundation of our relationships with clients and partners.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We listen to their needs and go above and beyond to exceed their expectations.',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We embrace change and continuously seek new ways to improve our services and deliver exceptional value.',
      color: 'bg-green-500'
    },
    {
      icon: Home,
      title: 'Community',
      description: 'We are dedicated to making a positive impact in the communities we serve through responsible business practices.',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-yellow-400">Gharkul</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in finding the perfect rental property. Making dreams come home since 2010.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                <Home className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-semibold">Connecting Hearts to Homes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12 bg-white rounded-full p-2 shadow-lg">
          {['story', 'mission', 'values', 'team'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Story Section */}
        {activeTab === 'story' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 transform transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Founded in 2010, Gharkul has grown from a small local agency to a leading name in the property rental market. Our journey began with a simple mission: to make house hunting simple, fast, and reliable.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Over the years, we have helped thousands of families and individuals find their perfect homes, creating lasting relationships built on trust and exceptional service.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Learn more about our journey</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Our journey"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-lg">
                  Since 2010
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Section */}
        {activeTab === 'mission' && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl p-8 md:p-12 text-white transform transition-all duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <Target className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-8">
                At Gharkul, our mission is to provide an unparalleled property rental experience. We strive to offer a wide range of high-quality rental properties that meet the diverse needs of our clients.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                We are committed to excellence and dedicated to ensuring that every customer finds a place they can truly call home.
              </p>
            </div>
          </div>
        )}

        {/* Values Section */}
        {activeTab === 'values' && (
          <div className="grid md:grid-cols-2 gap-8 transform transition-all duration-500">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-14 h-14 ${value.color} rounded-full mb-6`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Team Section */}
        {activeTab === 'team' && (
          <div className="transform transition-all duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team is composed of experienced professionals who are passionate about real estate and dedicated to providing the best service possible.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">
              Ready to find your dream home? We're here to help you every step of the way.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 group-hover:bg-blue-500 transition-colors">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">gharkul@gmail.com</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 group-hover:bg-green-500 transition-colors">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">+91 9632748927</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4 group-hover:bg-purple-500 transition-colors">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">Wakad Road, Hinjewadi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;