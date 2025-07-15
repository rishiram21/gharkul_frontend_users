import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/Authcontext';
import {
  User, Phone, Mail, Calendar, Shield, Home, MessageSquare, Heart,
  Trash2, Edit3, Camera, Settings, Bell, Award, TrendingUp,
  MapPin, Building, CreditCard, LogOut, ChevronRight, Star,
  Plus, Filter, Search, Eye, Download, Upload
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);
  const [requirements, setRequirements] = useState([]);

  

  useEffect(() => {
    const fetchRequirements = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/requirement/user/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch requirements');
          }
          const data = await response.json();
          setRequirements(data);
        } catch (error) {
          console.error('Error fetching requirements:', error);
        }
      }
    };

    fetchRequirements();
  }, [user]);


  const navigate = useNavigate();

const [showModal, setShowModal] = useState(false);

  const handleDelete = async (confirmed = false) => {
    try {
      const url = new URL(`${import.meta.env.VITE_BASE_URL}/api/auth/delete-user/${user.id}`);
      if (confirmed) {
        url.searchParams.append('confirmed', 'true');
      }
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();

      if (!confirmed) {
        setShowModal(true);
      } else {
        alert('✅ Your account has been deleted successfully.');
        navigate("/signin");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('❌ Failed to delete the account. Please try again later.');
    }
  };

  const confirmDelete = async () => {
    setShowModal(false);
    await handleDelete(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };


  const [properties, setProperties] = useState([]);

  

  const handleEdit = (property) => {
    
    navigate(`/editproperty/${property.propertyId}`);
  };



  useEffect(() => {
    const fetchProperties = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/properties/user/${user.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch properties');
          }
          const data = await response.json();
          setProperties(data);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      }
    };

    fetchProperties();
  }, [user]);


  const [activePackage, setActivePackage] = useState(null);

  useEffect(() => {
    const fetchActivePackage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/active-package/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch active package');
        }
        const data = await response.json();
        setActivePackage(data);
      } catch (error) {
        console.error('Error fetching active package:', error);
      }
    };

    if (activeTab === 'subscriptions') {
      fetchActivePackage();
    }
  }, [activeTab, user.id]);

  const getUserData = (field, fallback = 'Not provided') => {
    if (!user) return fallback;
    return user[field] || fallback;
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Not provided';
    return phone.startsWith('+91') ? phone : `+91 ${phone}`;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'requirements', label: 'Requirements', icon: Heart },
    { id: 'properties', label: 'Properties', icon: Home },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const statsCards = [
  {
    title: 'Total Properties',
    value: properties.length,
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    trend: 'up'
  },
  {
    title: 'Total Requirements',
    value: requirements.length,
    icon: Heart,
    color: 'from-purple-500 to-purple-600',
    trend: 'up'
  },
  {
    title: 'Active Subscriptions',
    value: activePackage ? 1 : 0,
    icon: CreditCard,
    color: 'from-green-500 to-green-600',
    trend: 'up'
  }
];


  // const mockProperties = user?.properties || [];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProperties = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">My Properties</h3>
        <p className="text-sm text-gray-600">Manage your property listings</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.length > 0 ? (
        properties.slice(0, 20).map((property) => (
          <div key={property.propertyId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                alt={property.propertyName}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                property.status === 'Available' || property.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                property.status === 'Under Review' || property.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {property.status}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">{property.propertyName}</h4>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                 {property.address?.area}, {property.address?.city} - {property.address?.pinCode}
              </p>
              <p className="text-lg font-bold text-green-600 mb-3">₹{property.expectedPrice?.toLocaleString()}</p>
              {/* <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {property.views || 0} views
                </span>
                <span className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {property.inquiries || 0} inquiries
                </span>
              </div> */}
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {property.category}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong> {property.propertyFor}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>BHK Type:</strong> {property.bhkType}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Furnished Type:</strong> {property.furnishedType}
                </p>

                <button
      onClick={() => handleEdit(property)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Edit
    </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-gray-500 mb-4">You haven't posted any properties yet</p>
          <Link to="/postproperty">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Post Your First Property
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
);


   const renderRequirements = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">My Requirements</h3>
        <p className="text-sm text-gray-600">Manage your property requirements</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requirements.length > 0 ? (
        requirements.map((requirement) => (
          <div key={requirement.requirementId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-1">{requirement.lookingFor}</h4>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Property Type:</strong> {requirement.propertyType}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>BHK Configuration:</strong> {requirement.bhkConfig}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Budget:</strong> ₹{requirement.minBudget?.toLocaleString()} - ₹{requirement.maxBudget?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Preferred Locations:</strong> {requirement.preferredLocations?.join(', ')}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Additional Requirements:</strong> {requirement.additionalRequirements}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Phone Number:</strong> {requirement.phoneNumber}
            </p>
            <p className={`text-sm font-medium ${requirement.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
              <strong>Status:</strong> {requirement.status}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 mb-4">You haven't added any requirements yet</p>
        </div>
      )}
    </div>
  </div>
);


  const renderSubscriptions = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">My Subscriptions</h3>
    <p className="text-sm text-gray-600">Manage your subscriptions</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activePackage ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-900 mb-1">{activePackage.packageName}</h4>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Start Date:</strong> {new Date(activePackage.subscriptionStartDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>End Date:</strong> {new Date(activePackage.subscriptionEndDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Remaining Posts:</strong> {activePackage.remainingPostsUsed}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Remaining Contacts:</strong> {activePackage.remainingContactsUsed}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Price:</strong> ₹{activePackage.price.toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No active subscriptions found.</p>
      )}
    </div>
  </div>
);


  const renderUserInfo = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">First Name</label>
            <p className="text-gray-900 font-medium">{getUserData('firstName')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Last Name</label>
            <p className="text-gray-900 font-medium">{getUserData('lastName')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900 font-medium">{getUserData('email')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone Number</label>
            <p className="text-gray-900 font-medium">{formatPhoneNumber(getUserData('phoneNumber'))}</p>
          </div>
        </div>
        <div className="space-y-4">
          {getUserData('userRole') === 'BROKER' && (
            <div>
              <label className="text-sm font-medium text-gray-500">RERA Number</label>
              <p className="text-gray-900 font-medium">{getUserData('reraNumber', 'N/A')}</p>
            </div>
          )}
        </div>
      </div>
      {user.address && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-base font-semibold text-gray-900 mb-3">Address</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900">{user.address.street}</p>
            <p className="text-gray-600">{user.address.area} - {user.address.pinCode}</p>
          </div>
          <div className="mt-8 text-center">
      <button
        onClick={() => handleDelete(false)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
      >
        Delete Account
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Do you really want to delete this account?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

        </div>
        

        
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Camera className="w-3 h-3" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getUserData('firstName')} {getUserData('lastName')}</h1>
                <p className="text-gray-600">{getUserData('userRole')}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'requirements' && renderRequirements()}
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'subscriptions' && renderSubscriptions()}
        {activeTab === 'settings' && renderUserInfo()}
      </div>
    </div>
  );
};

export default UserProfile;
