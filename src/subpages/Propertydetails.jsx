import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Bed, Bath, Square, Heart, ChevronLeft, ChevronRight, MessageCircle, Phone, Star, Calendar, Wifi, Car, Dumbbell, Shield } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const fetchPropertyById = async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    propertyGallery: [],
    amenities: [],
    owner: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const propertyData = await fetchPropertyById(id);
        setProperty(propertyData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!property) {
    return <div className="text-center py-10">No property found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.propertyGallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.propertyGallery.length - 1 : prev - 1));
  };

  const getAmenityIcon = (amenityName) => {
    switch (amenityName?.toLowerCase()) {
      case 'gym':
        return <Dumbbell className="h-4 w-4" />;
      case 'pool':
        return <Wifi className="h-4 w-4" />; // Assuming a pool icon is not available, using Wifi as a placeholder
      case 'park':
        return <Shield className="h-4 w-4" />; // Assuming a park icon is not available, using Shield as a placeholder
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* <div className="relative">
            {property.propertyGallery && property.propertyGallery.length > 0 ? (
              <>
                <img
                  src={property.propertyGallery[currentImageIndex]}
                  alt={property.propertyName}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {property.propertyGallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div> */}
          {/* <div className="relative h-full w-full overflow-hidden flex-shrink-0">
            {property.propertyGallery && property.propertyGallery.length > 0 ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                alt={property.propertyName}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                {(property.bhkType || '').replace('_', ' ')}
              </span>
            </div>
          </div> */}

          <div className="relative w-full max-w-4xl mx-auto">
  {property.propertyGallery && property.propertyGallery.length > 0 ? (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      className="rounded-xl shadow-md"
    >
      {property.propertyGallery.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/media/${img}`}
              alt={`Property Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* BHK label - show only on first image or all */}
            {index === 0 && (
              <div className="absolute bottom-4 left-4">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  {(property.bhkType || '').replace('_', ' ')}
                </span>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
      <span className="text-gray-500">No Images Available</span>
    </div>
  )}
</div>


          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{property.propertyName}</h2>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-6 w-6 mr-2" />
                  <span className="text-lg">{property.address?.area}, {property.address?.city}, {property.address?.state}</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    ₹{property.expectedPrice}
                    <span className="text-lg text-gray-500 font-normal"></span>
                  </div>
                </div>

                <div className="flex items-center space-x-8 mb-8">
                  <div className="flex items-center">
                    <Bed className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.bhkType?.split('_')[1]} Bedrooms</span>
                  </div>
                  {/* <div className="flex items-center">
                    <Bath className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.bathroom || 'N/A'} Bathrooms</span>
                  </div> */}
                  <div className="flex items-center">
                    <Square className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.carpetArea || 'N/A'} sqft</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-4">
                    {property.amenities?.map((amenity, index) => (
                      <div key={index} className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                        {getAmenityIcon(amenity.name)}
                        <span className="ml-2 text-gray-800">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Property Owner</h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-xl text-gray-900">{property.postedByUserName}</h4>
                    
                  </div>
                </div>

                <div className="space-y-4">
                  <a
    href={`tel:${property.postedByUserPhoneNumber || ''}`}
    className="flex-1 inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105"
  >
    <Phone></Phone>Call
  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
