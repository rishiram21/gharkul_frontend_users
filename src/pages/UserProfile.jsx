import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { User, Phone, Mail, Calendar, Shield, Home, MessageSquare, Heart, Trash2, Edit3, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [isEditingImage, setIsEditingImage] = useState(false);

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
        setIsEditingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <button
              onClick={() => setIsEditingImage(true)}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          {isEditingImage && (
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-2"
              />
              <button
                onClick={() => setIsEditingImage(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-600" />
            Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Account</span>
                <User className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Subscription</span>
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Properties</span>
                <Home className="w-5 h-5" />
              </div>
              <div className="mt-2">
                <span className="text-sm opacity-90">{getUserData('totalProperties', 0)}</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Inquiries</span>
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="mt-2">
                <span className="text-sm opacity-90">{getUserData('totalInquiries', 0)}</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Interests</span>
                <Heart className="w-5 h-5" />
              </div>
              <div className="mt-2">
                <span className="text-sm opacity-90">{getUserData('totalInterests', 0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">First Name</p>
              <p className="font-medium">{getUserData('firstName')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Name</p>
              <p className="font-medium">{getUserData('lastName')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{getUserData('email')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{formatPhoneNumber(getUserData('phoneNumber'))}</p>
            </div>

            {getUserData('userRole') === 'BROKER' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Agency Name</p>
                  <p className="font-medium">{getUserData('agencyName') || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">RERA Number</p>
                  <p className="font-medium">{getUserData('reraNumber') || 'N/A'}</p>
                </div>
              </>
            )}
          </div>

          {/* Address (if available) */}
          {user?.address && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Address</h3>
              <p>{user.address.street}</p>
              <p>{user.address.city}, {user.address.state} - {user.address.pinCode}</p>
            </div>
          )}
        </div>

        {/* Subscriptions */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-green-600" />
            Subscriptions
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Current Plan</p>
                <p className="text-lg font-semibold text-green-800">
                  {getUserData('subscriptionPlan') || 'Free Plan'}
                </p>
                <p className="text-sm text-green-600">
                  Status: {getUserData('subscriptionStatus') || 'Active'}
                </p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* My Properties */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Home className="w-6 h-6 mr-2 text-yellow-600" />
            My Properties
          </h2>
          {user?.properties && user.properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.properties.slice(0, 6).map((property) => (
                <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {property.imageUrl && (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-32 object-cover rounded mb-2" />
                  )}
                  <h3 className="font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm text-green-600 font-medium">₹{property.price?.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{property.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven't posted any properties yet</p>
              <Link to="/postproperty">
                <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Post Your First Property
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Inquiries */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-purple-600" />
            Recent Inquiries
          </h2>
          {user?.inquiries && user.inquiries.length > 0 ? (
            <div className="space-y-4">
              {user.inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{inquiry.subject}</h3>
                      <p className="text-sm text-gray-600 mt-1">{inquiry.message}</p>
                      {inquiry.property && (
                        <p className="text-xs text-blue-600 mt-2">Property: {inquiry.property.title}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      inquiry.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      inquiry.status === 'RESPONDED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No inquiries yet</p>
            </div>
          )}
        </div>

        {/* My Interests */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-red-600" />
            My Interests
          </h2>
          {user?.interests && user.interests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.interests.slice(0, 6).map((property) => (
                <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {property.imageUrl && (
                    <img src={property.imageUrl} alt={property.title} className="w-full h-32 object-cover rounded mb-2" />
                  )}
                  <h3 className="font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-sm text-green-600 font-medium">₹{property.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No saved properties yet</p>
            </div>
          )}
        </div>

        {/* Account Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Trash2 className="w-6 h-6 mr-2 text-red-600" />
            Account Management
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-800 font-medium">Delete Account</p>
                <p className="text-sm text-red-600">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
