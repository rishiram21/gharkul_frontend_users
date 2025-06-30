import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, ChevronLeft, ChevronRight, MessageCircle, Phone, Star, Calendar, Wifi, Car, Dumbbell, Shield } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Mock data for demonstration
    const properties = [
      {
        id: 1,
        propertyName: "Modern Apartment in Koregaon Park",
        location: "Koregaon Park, Pune",
        price: "₹80,000",
        period: "/month",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,200",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
        ],
        featured: true,
        description: "This stunning modern apartment features contemporary design with premium finishes throughout. Located in the heart of Koregaon Park, it offers easy access to restaurants, cafes, and shopping centers. The apartment boasts spacious rooms with large windows providing natural light, a fully equipped modern kitchen, and a beautiful balcony with city views.",
        amenities: ["WiFi", "Parking", "Gym", "Security"],
        owner: {
          name: "Rajesh Sharma",
          rating: 4.8,
          reviews: 24,
          phone: "+91 98765 43210",
          description: "Experienced property owner with over 10 years in real estate. Known for maintaining high-quality properties and excellent tenant relationships. Responsive to maintenance requests and ensures all amenities are well-maintained.",
          joinedDate: "2018"
        }
      },
      // Add other properties here
    ];

    const selectedProperty = properties.find(prop => prop.id === parseInt(id));
    setProperty(selectedProperty);
  }, [id]);

  if (!property) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'gym':
        return <Dumbbell className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={property.images[currentImageIndex]}
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
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{property.propertyName}</h2>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-6 w-6 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    {property.price}
                    <span className="text-lg text-gray-500 font-normal">{property.period}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-8 mb-8">
                  <div className="flex items-center">
                    <Bed className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-6 w-6 mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.area} sqft</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="flex flex-wrap gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                        {getAmenityIcon(amenity)}
                        <span className="ml-2 text-gray-800">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Property Owner</h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-xl text-gray-900">{property.owner.name}</h4>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                      <span className="text-gray-700">{property.owner.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-5 w-5 mr-1" />
                    <span>Joined {property.owner.joinedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{property.owner.reviews} reviews</span>
                  </div>
                  <p className="text-gray-700 mb-5">{property.owner.description}</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Chat with Owner
                  </button>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Phone className="h-6 w-6 mr-2" />
                    Call {property.owner.phone}
                  </button>
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
