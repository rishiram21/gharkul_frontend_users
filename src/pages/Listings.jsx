import React, { useEffect, useState, useCallback, useContext } from 'react';
import { MapPin, Heart, Phone, Search, X, SlidersHorizontal, Grid, List } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/Authcontext";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Listing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [enums, setEnums] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const [filters, setFilters] = useState({
    searchTerm: location.state?.searchTerm || '',
    transactionType: location.state?.transactionType || '',
    selectedLocations: location.state?.selectedLocations || [],
    priceRange: { min: '', max: '' },
    bhkType: '',
    city: '',
    area: '',
    areaRange: { min: '', max: '' },
    sortBy: 'newest',
    amenities: [],
    apartmentType: '',
    propertyCategory: '',
    propertyFor: '',
    furnishedType: '',
    status: '',
  });

  const fetchEnums = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/all_enum`);
      setEnums(response.data);
    } catch (error) {
      console.error("Error fetching enums:", error);
    }
  };

  useEffect(() => {
    fetchEnums();
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)} L`;
    if (price >= 1000) return `${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)} k`;
    return price;
  };

  useEffect(() => {
    if (location.state) {
      setFilters({
        searchTerm: location.state.searchTerm,
        transactionType: location.state.transactionType,
        selectedLocations: location.state.selectedLocations,
        priceRange: { min: '', max: '' },
        bhkType: '',
        city: '',
        area: '',
        areaRange: { min: '', max: '' },
        sortBy: 'newest',
        amenities: [],
        apartmentType: '',
        propertyCategory: '',
        propertyFor: '',
        furnishedType: '',
        status: '',
      });
    }
  }, [location.state]);

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to make a call or message.");
    }
  };

 const formatBHK = (bhkEnum) => {
  if (!bhkEnum) return 'BHK';

  // Remove leading underscore
  const cleanEnum = bhkEnum.startsWith('_') ? bhkEnum.slice(1) : bhkEnum;

  const parts = cleanEnum.split('_');

  // RK case
  if (parts.length === 2 && parts[1] === 'RK') {
    return `${parts[0]} RK`;
  }

  // BHK cases (remove last part 'BHK' and join the rest with dot)
  const bhkNumber = parts.slice(0, -1).join('.'); // e.g. ['2', '5'] => "2.5"
  return `${bhkNumber} BHK`;
};



  const handleCallClick = async (event, property) => {
    event.preventDefault();
    if (!user) {
      toast.error("You must be logged in to make a call.");
      return;
    }
    if (!property || !property.postedByUserId) {
      toast.error("Invalid property details.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/subscriptions/use-contact-or-chat`,
        null,
        {
          params: {
            userId: user.id,
            propertyId: property.propertyId,
          },
        }
      );
      toast.success("Calling agent...");
      window.location.href = `tel:${property.postedByUserPhoneNumber || ''}`;
    } catch (error) {
      console.error("Error accessing contact:", error);
      toast.error("Something went wrong while accessing contact.");
    }
  };

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/properties/get`
      );
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid data format received from server");
      }
      const propertiesWithDefaults = response.data.map(property => ({
        ...property,
        bhkType: property.bhkType || 'ONE_BHK',
      }));
      setProperties(propertiesWithDefaults);
      setTotalItems(propertiesWithDefaults.length);
    } catch (error) {
      console.error(
        "Error fetching properties:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [currentPage, fetchProperties]);

  useEffect(() => {
    let filtered = [...properties];
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((property) => {
        const propertyForDisplay = property.propertyFor?.toUpperCase() === "BUY" ? "SELL" : property.propertyFor;
        return (
          property.propertyName?.toLowerCase().includes(searchTermLower) ||
          property.address?.city?.toLowerCase().includes(searchTermLower) ||
          property.address?.area?.toLowerCase().includes(searchTermLower) ||
          propertyForDisplay?.toLowerCase().includes(searchTermLower) ||
          property.description?.toLowerCase().includes(searchTermLower) ||
          property.apartmentType?.toLowerCase().includes(searchTermLower) ||
          property.bhkType?.toLowerCase().includes(searchTermLower) ||
          property.furnishedType?.toLowerCase().includes(searchTermLower) ||
          property.propertyFor?.toLowerCase().includes(searchTermLower) ||
          property.status?.toLowerCase().includes(searchTermLower)
        );
      });
    }
    if (filters.priceRange.min) {
      filtered = filtered.filter(property => property.expectedPrice >= parseInt(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(property => property.expectedPrice <= parseInt(filters.priceRange.max));
    }
    if (filters.bhkType) {
      filtered = filtered.filter(property => property.bhkType === filters.bhkType);
    }
    if (filters.city) {
      filtered = filtered.filter(property =>
        property.address.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.area) {
      filtered = filtered.filter(property =>
        property.address.area.toLowerCase().includes(filters.area.toLowerCase())
      );
    }
    if (filters.areaRange.min) {
      filtered = filtered.filter(property => property.totalBuildUpArea >= parseInt(filters.areaRange.min));
    }
    if (filters.areaRange.max) {
      filtered = filtered.filter(property => property.totalBuildUpArea <= parseInt(filters.areaRange.max));
    }
    if (filters.apartmentType) {
      filtered = filtered.filter(property => property.apartmentType === filters.apartmentType);
    }
    if (filters.propertyCategory) {
      filtered = filtered.filter(property => property.category === filters.propertyCategory);
    }
    if (filters.propertyFor) {
      filtered = filtered.filter(property => property.propertyFor === filters.propertyFor);
    }
    if (filters.furnishedType) {
      filtered = filtered.filter(property => property.furnishedType === filters.furnishedType);
    }
    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity =>
          property.amenities?.some(propAmenity => propAmenity.name === amenity)
        )
      );
    }

    switch (filters.sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.expectedPrice - b.expectedPrice);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.expectedPrice - a.expectedPrice);
        break;
      case 'area_low':
        filtered.sort((a, b) => a.totalBuildUpArea - b.totalBuildUpArea);
        break;
      case 'area_high':
        filtered.sort((a, b) => b.totalBuildUpArea - a.totalBuildUpArea);
        break;
      default:
        break;
    }
    setFilteredProperties(filtered);
  }, [properties, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleAreaRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      areaRange: {
        ...prev.areaRange,
        [type]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      priceRange: { min: '', max: '' },
      bhkType: '',
      city: '',
      area: '',
      areaRange: { min: '', max: '' },
      sortBy: 'newest',
      amenities: [],
      apartmentType: '',
      propertyCategory: '',
      propertyFor: '',
      furnishedType: '',
      status: '',
    });
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/listing/${propertyId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage) - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 bg-white/70 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div> */}
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Property Listings
              </h1>
              <p className="text-gray-600">{filteredProperties.length} properties found</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, city, or area..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        <div className="w-80 flex-shrink-0 sticky top-6 z-20 h-[calc(100vh-5rem)] hidden md:block">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                Property Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors flex items-center gap-1.5"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            </div>
            <div className="space-y-6 overflow-y-auto pr-2 flex-grow pb-4 custom-scrollbar">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (₹)</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">BHK Type</label>
                <select
  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
  value={filters.bhkType}
  onChange={(e) => handleFilterChange('bhkType', e.target.value)}
>
  <option value="">All Types</option>
  {enums.bhkType?.map(option => (
    <option key={option} value={option}>
      {formatBHK(option)}
    </option>
  ))}
</select>

              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Apartment Type</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.apartmentType}
                  onChange={(e) => handleFilterChange('apartmentType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {enums.apartmentType?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Category</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.propertyCategory}
                  onChange={(e) => handleFilterChange('propertyCategory', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {enums.propertyCategory?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property For</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.propertyFor}
                  onChange={(e) => handleFilterChange('propertyFor', e.target.value)}
                >
                  <option value="">All</option>
                  {enums.propertyFor?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Furnished Type</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.furnishedType}
                  onChange={(e) => handleFilterChange('furnishedType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {enums.furnishedType?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {enums.status?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter area"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area Range (sqft)</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                      value={filters.areaRange.min}
                      onChange={(e) => handleAreaRangeChange('min', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                      value={filters.areaRange.max}
                      onChange={(e) => handleAreaRangeChange('max', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
                <div className="space-y-2">
                  {['Parking', 'Gym', 'Swimming Pool', 'Garden'].map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...filters.amenities, amenity]
                            : filters.amenities.filter(a => a !== amenity);
                          handleFilterChange('amenities', newAmenities);
                        }}
                      />
                      <label htmlFor={amenity} className="ml-2 block text-sm text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'price_low', label: 'Price: Low to High' },
                    { value: 'price_high', label: 'Price: High to Low' },
                    { value: 'area_low', label: 'Area: Small to Large' },
                    { value: 'area_high', label: 'Area: Large to Small' }
                  ].map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ml-8 overflow-y-auto">
          {filteredProperties.length > 0 ? (
            <>
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProperties.map((property) => (
                    <Link key={property.propertyId} to={`/listing/${property.propertyId}`}>
                      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20 group h-[480px] flex flex-col">
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          {property.propertyGallery && property.propertyGallery.length > 0 ? (
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                              alt={property.propertyName}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">No Image Available</span>
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                              {formatBHK(property.bhkType) || 'Property'}
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                              {(property.propertyFor || '').replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                              {property.propertyName}
                            </h3>
                            <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                              ₹{formatPrice(property.expectedPrice) || 'Price'}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 mb-4">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <p className="text-base line-clamp-1">
                              {`${property.address?.area}, ${property.address?.city}, ${property.address?.state} ${property.address?.pinCode}`}
                            </p>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 rounded-xl mb-2">
                            <span className="text-gray-700 font-medium">{property.totalBuildUpArea} sqft</span>
                          </div>
                          <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-500">
                                {property.postedByUserName || 'Unknown'}
                              </p>
                              <p className="font-medium text-gray-800 text-sm truncate">
                                {property.postedByUserRole || 'Unknown'}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <a
                                href="#"
                                onClick={(event) => handleCallClick(event, property)}
                                className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <a
                                href={`https://wa.me/${property.postedByUserPhoneNumber}`}
                                onClick={(event) => handleCallClick(event, property)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.59 5.96L0 24l6.27-1.64A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.2-3.48-8.52zm-8.5 17.49a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.23-.37A9.92 9.92 0 0 1 2.1 12c0-5.46 4.44-9.9 9.9-9.9 2.65 0 5.14 1.04 7.02 2.93a9.87 9.87 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.9 9.9zm5.39-7.43c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.28-.74.94-.91 1.14-.17.2-.34.21-.63.07-.29-.14-1.23-.46-2.34-1.48-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.5.14-.17.19-.28.29-.47.1-.2.05-.37-.02-.51-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35s-1 1-1 2.43 1.02 2.81 1.16 3.01c.14.2 2 3.2 4.86 4.49.68.29 1.21.46 1.62.59.68.21 1.3.18 1.78.11.54-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.18-.55-.32z"/>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {viewMode === 'list' && (
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <Link key={property.propertyId} to={`/listing/${property.propertyId}`}>
                      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 group">
                        <div className="flex">
                          <div className="relative w-80 flex-shrink-0">
                            {property.propertyGallery && property.propertyGallery.length > 0 ? (
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                                alt={property.propertyName}
                                className="w-full h-72 object-contain transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image Available</span>
                              </div>
                            )}
                            <div className="absolute bottom-4 left-4">
                              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                                {(property.bhkType || '').replace('_', ' ')}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-4">
                              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                                {(property.propertyFor || '').replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start h-full">
                              <div className="flex-1 flex flex-col h-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                  {property.propertyName}
                                </h3>
                                <div className="flex items-center text-gray-500 mb-4">
                                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <span className="text-base">
                                    {`${property.address?.area}, ${property.address?.city}, ${property.address?.state} ${property.address?.pinCode}`}
                                  </span>
                                </div>
                                <div className="bg-gray-50 px-4 py-2 rounded-lg mb-4 inline-block">
                                  <span className="text-gray-700 font-medium">{property.totalBuildUpArea} sqft</span>
                                </div>
                                <div className="flex items-center mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-gray-500">
                                      {property.postedByUserName || 'Unknown'}
                                    </p>
                                    <p className="font-medium text-gray-800 text-sm truncate">
                                      {property.postedByUserRole || 'Unknown'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col justify-between items-end">
                                <span className="text-blue-600 font-bold text-xl mb-4">
                                  ₹{property.expectedPrice}
                                </span>
                                <div className="flex gap-2 ml-4">
                                  <a
                                    href="#"
                                    onClick={(event) => handleCallClick(event, property)}
                                    className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
                                  >
                                    <Phone className="w-4 h-4" />
                                  </a>
                                  <a
                                    href={`https://wa.me/${property.postedByUserPhoneNumber}`}
                                    onClick={(event) => handleCallClick(event, property)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.37 0 0 5.37 0 12a11.86 11.86 0 0 0 1.59 5.96L0 24l6.27-1.64A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.2-3.48-8.52zm-8.5 17.49a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.23-.37A9.92 9.92 0 0 1 2.1 12c0-5.46 4.44-9.9 9.9-9.9 2.65 0 5.14 1.04 7.02 2.93a9.87 9.87 0 0 1 2.9 7.01c0 5.46-4.44 9.9-9.9 9.9zm5.39-7.43c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.28-.74.94-.91 1.14-.17.2-.34.21-.63.07-.29-.14-1.23-.46-2.34-1.48-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.5.14-.17.19-.28.29-.47.1-.2.05-.37-.02-.51-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35s-1 1-1 2.43 1.02 2.81 1.16 3.01c.14.2 2 3.2 4.86 4.49.68.29 1.21.46 1.62.59.68.21 1.3.18 1.78.11.54-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.18-.55-.32z"/>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 w-full">
              <div className="inline-block p-4 bg-white rounded-full mb-4">
                <SlidersHorizontal className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">BHK Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.bhkType}
                  onChange={(e) => handleFilterChange('bhkType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {enums.bhkType?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Apartment Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.apartmentType}
                  onChange={(e) => handleFilterChange('apartmentType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {enums.apartmentType?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.propertyCategory}
                  onChange={(e) => handleFilterChange('propertyCategory', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {enums.propertyCategory?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property For</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.propertyFor}
                  onChange={(e) => handleFilterChange('propertyFor', e.target.value)}
                >
                  <option value="">All</option>
                  {enums.propertyFor?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Furnished Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.furnishedType}
                  onChange={(e) => handleFilterChange('furnishedType', e.target.value)}
                >
                  <option value="">All Types</option>
                  {enums.furnishedType?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {enums.status?.map(option => (
                    <option key={option} value={option}>
                      {option.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div> */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area Range (sqft)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    min="0"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={filters.areaRange.min}
                    onChange={(e) => handleAreaRangeChange('min', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min="0"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={filters.areaRange.max}
                    onChange={(e) => handleAreaRangeChange('max', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amenities</label>
                <div className="space-y-2">
                  {['Parking', 'Gym', 'Swimming Pool', 'Garden'].map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          const newAmenities = e.target.checked
                            ? [...filters.amenities, amenity]
                            : filters.amenities.filter(a => a !== amenity);
                          handleFilterChange('amenities', newAmenities);
                        }}
                      />
                      <label htmlFor={amenity} className="ml-2 block text-sm text-gray-700">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'price_low', label: 'Price: Low to High' },
                    { value: 'price_high', label: 'Price: High to Low' },
                    { value: 'area_low', label: 'Area: Small to Large' },
                    { value: 'area_high', label: 'Area: Large to Small' }
                  ].map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={clearFilters}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Listing;
