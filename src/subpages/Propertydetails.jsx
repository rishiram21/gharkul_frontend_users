import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Dumbbell,
  Wifi,
  Shield,
  ArrowLeft,
  Camera,
  AlertCircle,
  XCircle,
  Calendar,
  Users,
  Ruler,
  DollarSign,
  Warehouse,
  Mountain,
  CheckCircle,
  Home,
  Building,
  Trees,
  Waves,
  User,
  IndianRupee,
  Maximize
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AuthContext } from "../context/Authcontext";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCallClick = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("You must be logged in to make a call.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/subscriptions/use-contact-or-chat`,
        null,
        {
          params: {
            userId: property.postedByUserId,
            propertyId: property.propertyId,
          },
        }
      );
      console.log(response.data);
      window.location.href = `tel:${property.postedByUserPhoneNumber || ''}`;
    } catch (error) {
      console.error("Error accessing contact:", error);
    }
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-600 mb-2">Error loading property</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">Property not found</p>
          <p className="text-gray-500 mb-4">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (!price) return 'Price not specified';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAmenityIcon = (amenityName) => {
    const amenityIcons = {
      'gym': <Dumbbell className="w-5 h-5" />,
      'pool': <Waves className="w-5 h-5" />,
      'park': <Trees className="w-5 h-5" />,
      'security': <Shield className="w-5 h-5" />,
      'wifi': <Wifi className="w-5 h-5" />,
      'garden': <Trees className="w-5 h-5" />,
      'default': <CheckCircle className="w-5 h-5" />
    };
    return amenityIcons[amenityName?.toLowerCase()] || amenityIcons['default'];
  };

  const galleryImages = property.propertyGallery && property.propertyGallery.length > 0
    ? property.propertyGallery
    : ['/api/placeholder/800/600'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Properties</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                className="rounded-xl shadow-md"
              >
                {galleryImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/media/${img}`}
                        alt={`Property Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg flex items-center space-x-1">
                <Camera className="w-4 h-4" />
                <span className="text-sm">{galleryImages.length} Photos</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.propertyName}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>
                      {property.address?.area}, {property.address?.city}, {property.address?.state} - {property.address?.pinCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    {formatPrice(property.expectedPrice)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.propertyFor === 'RENT' ? 'Monthly Rent' : 'Total Price'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-2">
                    <Bed className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{property.bhkType || 'N/A'}</div>
                  <div className="text-xs text-gray-500">BHK Type</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                    <Bath className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{property.bathroom || 'N/A'}</div>
                  <div className="text-xs text-gray-500">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                    <Square className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{property.carpetArea || 'N/A'} sq. ft.</div>
                  <div className="text-xs text-gray-500">Carpet Area</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{property.floor || 'N/A'}</div>
                  <div className="text-xs text-gray-500">Floor</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DetailItem icon={<Home className="w-5 h-5" />} label="Property Category" value={property.category || 'Not specified'} />
                  <DetailItem icon={<Building className="w-5 h-5" />} label="Apartment Type" value={property.apartmentType || 'Not specified'} />
                  <DetailItem icon={<Maximize className="w-5 h-5" />} label="Total Build-Up Area" value={property.totalBuildUpArea ? `${property.totalBuildUpArea} sq. ft.` : 'Not specified'} />
                  <DetailItem icon={<Ruler className="w-5 h-5" />} label="Plot Area" value={property.plotArea ? `${property.plotArea} sq. ft.` : 'Not specified'} />
                </div>
                <div className="space-y-4">
                  <DetailItem icon={<Calendar className="w-5 h-5" />} label="Available From" value={formatDate(property.availableFrom)} />
                  <DetailItem icon={<Users className="w-5 h-5" />} label="Preferred Tenants" value={property.preferred_tenants || 'Not specified'} />
                  <DetailItem icon={<Home className="w-5 h-5" />} label="Furnished Type" value={property.furnishedType || 'Not specified'} />
                  <DetailItem icon={<IndianRupee className="w-5 h-5" />} label="Monthly Maintenance" value={property.monthlyMaintenance ? formatPrice(property.monthlyMaintenance) : 'Not specified'} />
                </div>
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-indigo-600">
                        {getAmenityIcon(amenity.name)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {property.postedByUserName || 'Owner'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.postedByUserRole || 'Property Owner'}
                    </div>
                  </div>
                </div>

                {property.postedByUserPhoneNumber && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{property.postedByUserPhoneNumber}</div>
                      <div className="text-sm text-gray-500">Phone Number</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Pricing Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Price</span>
                    <span className="font-semibold text-gray-900">{formatPrice(property.expectedPrice)}</span>
                  </div>
                  {property.deposit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-semibold text-gray-900">{formatPrice(property.deposit)}</span>
                    </div>
                  )}
                  {property.monthlyMaintenance && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Maintenance</span>
                      <span className="font-semibold text-gray-900">{formatPrice(property.monthlyMaintenance)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${property.postedByUserPhoneNumber || ''}`}
                  onClick={handleCallClick}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2" /> Contact Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  </div>
);

export default PropertyDetails;
