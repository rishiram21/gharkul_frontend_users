import React, { useEffect, useState, useCallback, useContext } from 'react';
import { MapPin, Heart, Phone, Search, X, SlidersHorizontal, Grid, List } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/Authcontext";


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
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  

  const location = useLocation();
  const [filters, setFilters] = useState({
    searchTerm: location.state?.searchTerm || '',
    priceRange: { min: '', max: '' },
    bhkType: '',
    city: '',
    area: '',
    areaRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  useEffect(() => {
    if (location.state?.searchTerm) {
      setFilters(prevFilters => ({
        ...prevFilters,
        searchTerm: location.state.searchTerm
      }));
    }
  }, [location.state]);

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to make a call or message.");
    }
  };

  // const [filters, setFilters] = useState({
  //   searchTerm: '',
  //   priceRange: { min: '', max: '' },
  //   bhkType: '',
  //   city: '',
  //   area: '',
  //   areaRange: { min: '', max: '' },
  //   sortBy: 'newest'
  // });

  const bhkOptions = ['ONE_BHK', 'TWO_BHK', 'THREE_BHK', 'FOUR_BHK', 'FIVE_BHK'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'area_low', label: 'Area: Small to Large' },
    { value: 'area_high', label: 'Area: Large to Small' }
  ];

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/properties/get`,
        {
          params: {
            page: currentPage,
            size: itemsPerPage,
          },
        }
      );
      if (!response.data || !Array.isArray(response.data.content)) {
        throw new Error("Invalid data format received from server");
      }
      const propertiesWithDefaults = response.data.content.map(property => ({
        ...property,
        bhkType: property.bhkType || 'ONE_BHK',
      }));
      setProperties(propertiesWithDefaults);
      setTotalItems(response.data.totalElements || 0);
    } catch (error) {
      console.error(
        "Error fetching properties:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProperties();
  }, [currentPage, fetchProperties]);

  useEffect(() => {
    let filtered = [...properties];

    if (filters.searchTerm) {
  const searchTermLower = filters.searchTerm.toLowerCase();

  filtered = filtered.filter((property) => {
    const propertyForDisplay = property.propertyFor.toUpperCase() === "BUY" ? "SELL" : property.propertyFor;

    return (
      property.propertyName.toLowerCase().includes(searchTermLower) ||
      property.address.city.toLowerCase().includes(searchTermLower) ||
      property.address.area.toLowerCase().includes(searchTermLower) ||
      propertyForDisplay.toLowerCase().includes(searchTermLower)
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
      sortBy: 'newest'
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
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
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
                  {bhkOptions.map(option => (
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Neighborhood</label>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-sm shadow-sm"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  {sortOptions.map(option => (
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
                  {filteredProperties.map((property, index) => (
                    <div key={property.propertyId} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20 group h-[580px] flex flex-col">
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
                          <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                            {(property.bhkType || '').replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                            {property.propertyName}

                          </h3>
                          <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                            ₹{property.expectedPrice}
                          </span>
                        </div>
                        <div>
                          <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                            Property For : {property.propertyFor}
                          </span>
                            
                        
                        </div>
                        <div className="flex items-center text-gray-500 mb-4">
                          <div className="bg-gray-100 p-2 rounded-full mr-3">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <p className="text-base line-clamp-1">{property.address.city}, {property.address.area}</p>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 rounded-xl">
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
                        <div className="flex gap-4 mt-2">
  <a
    href={`tel:${property.postedByUserPhoneNumber || ''}`}
    onClick={handleClick}
    className="flex-1 inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105"
  >
    <Phone></Phone>Call
  </a>
  <button
    onClick={() => handleViewProperty(property.propertyId)}
    className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105"
  >
    📄 Details
  </button>
</div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'list' && (
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <div key={property.propertyId} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white/20 group">
                      <div className="flex">
                        <div className="relative w-80 flex-shrink-0">
                          {property.propertyGallery && property.propertyGallery.length > 0 ? (
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                              alt={property.propertyName}
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
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
                                <span className="text-base">{property.address.city}, {property.address.area}</span>
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
                              <div className="flex gap-4">
                                <a
    href={`tel:${property.postedByUserPhoneNumber || ''}`}
    className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105"
  >
    📞 Call
  </a>
                                <button
                                  onClick={() => handleViewProperty(property.propertyId)}
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                  Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
          <div className="flex justify-between items-center mt-8">
            <p className="text-sm text-gray-600">
              Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} entries
            </p>
            <div className="flex space-x-1">
              <button
                className="px-3 py-1.5 text-sm text-white bg-indigo-800 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === 0}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <span className="px-3 py-1.5 text-sm text-gray-700 bg-gray-200 rounded-md">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                className="px-3 py-1.5 text-sm rounded-md bg-indigo-800 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                disabled={currentPage === totalPages - 1}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range ($)</label>
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
                  {bhkOptions.map(option => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Neighborhood</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  {sortOptions.map(option => (
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
        className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Listing;
