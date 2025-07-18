import React, { useState, useEffect, useContext } from 'react';
import { Search, Star, Phone, MessageCircle, Share2, MapPin, Home, Building, Users, Filter, Menu, X, ChevronLeft, ChevronRight, Calendar, ChartArea } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../context/Authcontext";
import { toast } from 'react-toastify';

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
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const propertyTypes = ['Kharadi', 'Viman Nagar', 'Bhorawadi', 'Baner', 'Balewadi'];
  // const tabs = ['Buy', 'Rent', 'Requirement'];
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useContext(AuthContext);
  const [transactionType, setTransactionType] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);


  // Navigation functions
const prevSlide = () => {
  setCurrentSlide((prev) => (prev === 0 ? requirements.length - 1 : prev - 1));
};

const nextSlide = () => {
  setCurrentSlide((prev) => (prev === requirements.length - 1 ? 0 : prev + 1));
};

const goToSlide = (index) => {
  setCurrentSlide(index);
};







  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = () => {
  //   // Navigate to the listing page with the search filters as state
  //   navigate('/listing', {
  //     state: {
  //       searchTerm,
  //       transactionType,
  //       selectedLocations,
  //     },
  //   });
  // };

  const handleSearch = () => {
    // Navigate to the listing page with the search filters as state
    navigate('/listing', {
      state: {
        searchTerm,
        transactionType,
        selectedLocations,
      },
    });
  };

  // const toggleLocation = (location) => {
  //   setSelectedLocations((prevSelected) =>
  //     prevSelected.includes(location)
  //       ? prevSelected.filter((loc) => loc !== location)
  //       : [...prevSelected, location]
  //   );
  // };

  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // const handleSearch = () => {
  //   navigate('/listing', { state: { searchTerm } });
  // };


  const formatPrice = (price) => {
  if (price >= 10000000) return `${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 1)}Cr`;
  if (price >= 100000) return `${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)}L`;
  if (price >= 1000) return `${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k`;
  return price;
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




  // const handleCallClick = async () => {
  //   try {
  //     // Make an API call to the backend endpoint
  //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/use-contact-or-chat`, null, {
  //       params: {
  //         userId: property.postedByUserId, // Replace with the actual user ID
  //         propertyId: property.propertyId // Use the property ID from the property object
  //       }
  //     });

  //     console.log(response.data); // Log the response data

  //     // Optionally, you can redirect to the phone call or show a success message
  //     window.location.href = `tel:${property.postedByUserPhoneNumber || ''}`;
  //   } catch (error) {
  //     console.error('Error accessing contact:', error);
  //     // Optionally, show an error message to the user
  //   }
  // };




  // const handleCallClick = async (event, property) => {
  // event.preventDefault(); // Prevent the default navigation behavior of the anchor tag

  // console.log("Property object:", property); // Debugging log

  // if (!property || !property.postedByUserId) {
  //   console.error("Property or postedByUserId is undefined");
  //   return;
  // }

  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to make a call or message.");
    }
  };

//   const handleCallClick = async (event, property) => {
//     event.preventDefault();

//     if (!user) {
//       alert("You must be logged in to make a call.");
//       return;
//     }

//     if (!property || !property.postedByUserId) {
//       console.error("Property or postedByUserId is undefined");
//       return;
//     }


//   try {
//     // Make an API call to the backend endpoint
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/api/subscriptions/use-contact-or-chat`,
//       null,
//       {
//         params: {
//           userId: user.id, // Ensure this is the correct user ID
//           propertyId: property.propertyId, // Use the property ID from the property object
//         },
//       }
//     );

//     console.log(response.data); // Log the response data

//     // Redirect to the phone call or show a success message
//     window.location.href = `tel:${property.postedByUserPhoneNumber || ''}`;
//   } catch (error) {
//     console.error("Error accessing contact:", error);
//     // Optionally, show an error message to the user
//   }
// };


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




  useEffect(() => {
    const getRequirements = async () => {
      const data = await fetchRequirements();
      setRequirements(data);
    };

    getRequirements();
  }, []);


  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get`, {
  //         params: {
  //           page: 0,
  //           size: 3
  //         }
  //       });
  //       setFeaturedProperties(response.data.content);
  //     } catch (error) {
  //       console.error('Error fetching properties:', error);
  //     }
  //   };

  //   fetchProperties();
  // }, []);


  useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/get`);
      
      const allProperties = response.data || [];
      
      // Separate properties by type and get first 3 of each
      const rentProperties = allProperties.filter(property => property.propertyFor === 'RENT').slice(0, 3);
      const saleProperties = allProperties.filter(property => property.propertyFor === 'SELL').slice(0, 3);
      
      // Combine them back
      const featuredProps = [...rentProperties, ...saleProperties];
      
      setFeaturedProperties(featuredProps);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  fetchProperties();
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

  // For projects slider
const [projectSlide, setProjectSlide] = useState(0);
const [isProjectAutoPlaying, setIsProjectAutoPlaying] = useState(true);

const prevSlide1 = () => {
  setProjectSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
};

const nextSlide1 = () => {
  setProjectSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
};

const goToSlide1 = (index) => {
  setProjectSlide(index);
};

const handleProjectMouseEnter = () => 
  setIsProjectAutoPlaying(false);

const handleProjectMouseLeave = () => 
  setIsProjectAutoPlaying(true);

useEffect(() => {
  if (!isProjectAutoPlaying || projects.length <= 1) return;

  const interval = setInterval(() => {
    nextSlide1();
  }, 4000);

  return () => clearInterval(interval);
}, [projectSlide, isProjectAutoPlaying, projects.length]);

  // useEffect(() => {
  //   if (!isAutoPlaying) return;

  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [currentSlide, isAutoPlaying]);


  useEffect(() => {
  if (!isAutoPlaying || requirements.length <= 1) return;

  const interval = setInterval(() => {
    nextSlide();
  }, 4000);

  return () => clearInterval(interval);
}, [currentSlide, isAutoPlaying, requirements.length]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // const featuredProperties = [
  //   {
  //     id: 1,
  //     title: '3 BHK in Ganga Constella',
  //     location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
  //     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop&crop=center',
  //     price: '₹85 Lac',
  //     type: '3BHK',
  //     area: '1250 sq ft'
  //   },
  //   {
  //     id: 2,
  //     title: '2 BHK Ganga Ishanya',
  //     location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
  //     image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop&crop=center',
  //     price: '₹65 Lac',
  //     type: '2BHK',
  //     area: '950 sq ft'
  //   },
  //   {
  //     id: 3,
  //     title: '3 BHK Lavish Flat',
  //     location: 'Near Shankar Maharaj Math, Bhorawadi, Pune',
  //     image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop&crop=center',
  //     price: '₹95 Lac',
  //     type: '3BHK',
  //     area: '1400 sq ft'
  //   }
  // ];

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

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % requirements.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + requirements.length) % requirements.length);
  // };

  // const goToSlide = (index) => {
  //   setCurrentSlide(index);
  // };



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
<section className="relative bg-gradient-to-br from-blue-50 via-blue-60 to-blue-70 py-6 overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
  </div>

  <div className="relative w-full max-w-4xl mx-auto px-4">
    {/* Header */}
    {/* <div className="text-center mb-4">
      <div className="flex justify-center items-center gap-1 mb-2">
        <Home className="w-5 h-5 text-black" />
        <h1 className="text-xl font-bold text-black">Find Your Dream Property</h1>
      </div>
    </div> */}

    {/* Search Container */}
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
      {/* Search Bar */}
      <div className="mb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by property type, location..."
            className="w-full pl-9 pr-4 py-2 border border-blue-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction Type */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">Transaction Type</h3>
        <div className="flex justify-center gap-2">
          {["RENT", "BUY"].map((option) => (
            <button
              key={option}
              onClick={() => setTransactionType(option)}
              className={`px-4 rounded-lg font-medium transition-all duration-200 text-sm shadow hover:shadow-md transform hover:scale-105 ${
                transactionType === option
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4 text-blue-500" />
          Select Locations
        </h3>
        <div className="flex justify-center gap-2 flex-wrap">
          {["Bibwewadi", "Baner", "Kothrud", "Kharadi", "Wakad"].map((location) => (
            <button
              key={location}
              onClick={() => toggleLocation(location)}
              className={`px-3 py-1 rounded-full font-medium transition-all duration-200 text-xs shadow hover:shadow-md transform hover:scale-105 ${
                selectedLocations.includes(location)
                  ? 'bg-blue-600 text-white shadow-blue-200'
                  : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
        {selectedLocations.length > 0 && (
          <p className="text-center text-blue-600 mt-2 text-xs">
            {selectedLocations.length} location{selectedLocations.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Search Button */}
      <div className="text-center">
        <button
          onClick={handleSearch}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm shadow hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  </div>
</section>



      {/* Featured Requirements Section */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-100">
        <div className="w-full px-3 md:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-5 mb-2">
  {/* Left Side: Icon and Title */}
  <div className="flex items-center space-x-2">
    <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
    <h2 className="text-lg md:text-2xl font-bold text-gray-800">
      Featured Requirements
    </h2>
  </div>

  {/* Right Side: View All Link */}
 <Link to="/featured">
    <button className="text-sm md:text-base text-blue-600 hover:underline font-medium">
      View All
    </button>
  </Link>
</div>

          </div>
          {/* Slider Container */}
          <div className="relative max-w-3xl mx-auto">
            {/* Navigation Arrows */}
            <button
              disabled={requirements.length <= 1}
              onClick={prevSlide}
              className="`... ${requirements.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}` absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow border"
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
                        {/* <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div> */}
                        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto space-y-4">
  {/* Status Badge */}
  {/* <div>
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        req.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
      }`}
    >
      {req.status}
    </span>
  </div> */}

  {/* Property Information */}
  <div className="space-y-1">
    <h2 className="text-xl font-bold text-gray-800 capitalize">
      {console.log(req)}
      {/* {req.userName} */}
      {req.propertyType} for {req.lookingFor}
    </h2>
    <p className="text-sm text-gray-600 font-medium">BHK Configuration: {req.bhkConfig}</p>
    <p className="text-sm text-gray-600 font-medium">
      Budget: ₹{req.minBudget.toLocaleString()} - ₹{req.maxBudget.toLocaleString()}
    </p>
  </div>

  {/* Preferred Locations */}
  <div>
    <h3 className="text-sm text-gray-700 font-semibold mb-2">Preferred Locations:</h3>
    <div className="flex flex-wrap gap-2">
      {req.preferredLocations.map((location, idx) => (
        <span
          key={idx}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs md:text-sm"
        >
          {location}
        </span>
      ))}
    </div>
  </div>

  {/* Additional Requirements */}
  <div>
    <h3 className="text-sm text-gray-700 font-semibold mb-1">Additional Requirements:</h3>
    <p className="text-gray-600 text-sm">{req.additionalRequirements}</p>
  </div>

  {/* Contact Buttons */}
  <div className="flex gap-4 pt-2">
    {/* Call Button */}
    <a
      href={user ? `tel:${req.phoneNumber}` : "#"}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 ${
        user ? "bg-blue-700 hover:bg-blue-800 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
      } text-white text-sm font-medium py-2 px-4 rounded-full shadow-md transition duration-200 ${
        user ? "hover:scale-105" : ""
      }`}
    >
      <Phone size={18} /> Call
    </a>

    {/* WhatsApp Button */}
    <a
      href={user ? `https://wa.me/${req.phoneNumber}` : "#"}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 ${
        user ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-400 cursor-not-allowed"
      } text-white text-sm font-medium py-2 px-4 rounded-full shadow-md transition duration-200 ${
        user ? "hover:scale-105" : ""
      }`}
    >
      <MessageCircle size={18} /> WhatsApp
    </a>
  </div>
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
              {Math.min(currentSlide + 1, requirements.length)} of {requirements.length}
            </div>
          </div>
        </div>
      </section>

{/* Rental Handpicked */}
<section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-2 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h2 className="text-1xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-blue-600 bg-clip-text text-transparent mb-3">
        Handpicked Properties for Rent
      </h2>
      {/* <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
        Discover premium properties curated by our expert team for the perfect rental opportunity
      </p> */}
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
        {featuredProperties.filter(property => property.propertyFor === 'RENT').map((property) => (
          <Link
            key={property.propertyId}
            to={`/listing/${property.propertyId}`}
            className="flex-none w-80 snap-center"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-[430px] flex flex-col">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                  alt={property.propertyName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                    {formatBHK(property.bhkType) || 'Property'}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-base text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {property.propertyName || 'Property Title'}
                  </h3>
                  <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                    ₹{formatPrice(property.expectedPrice) || 'Price'}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <div className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-sm line-clamp-1">
                    {`${property.address.area}, ${property.address.city}, ${property.address.state} - ${property.address.pinCode}`}
                  </p>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-lg mb-4">
                  <span className="text-gray-700 text-sm font-medium">{property.carpetArea || 'Area'} sq ft</span>
                </div>
                <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
  {/* Avatar or Icon */}
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
    {/* Add icon inside if needed */}
  </div>

  {/* User Info */}
  <div className="min-w-0 flex-1">
    <p className="text-sm text-gray-500">
      {property.postedByUserName || 'Unknown'}
    </p>
    <p className="font-medium text-gray-800 text-sm truncate">
      {property.postedByUserRole || 'Unknown'}
    </p>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 ml-4">
    {/* Call Button */}
    <a
      href="#"
      onClick={(event) => handleCallClick(event, property)}
      className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
    >
      <Phone className="w-4 h-4" /> 
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${property.phoneNumber}`}
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
      <div className="flex justify-center mt-1 gap-2">
        {featuredProperties.filter(property => property.propertyFor === 'RENT').map((_, index) => (
          <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProperties.filter(property => property.propertyFor === 'RENT').map((property) => (
        <Link
          key={property.propertyId}
          to={`/listing/${property.propertyId}`}
          className="block group"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-[430px] flex flex-col">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                alt={property.propertyName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  {formatBHK(property.bhkType) || 'Property'}
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {property.propertyName || 'Property Title'}
                </h3>
                <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                  ₹{formatPrice(property.expectedPrice) || 'Price'}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <div className="bg-gray-100 p-2 rounded-full mr-3 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-base line-clamp-1">
                  {`${property.address.area}, ${property.address.city}, ${property.address.state} ${property.address.pinCode}`}
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-xl mb-2">
                <span className="text-gray-700 font-medium">{property.carpetArea || 'Area'} sq ft</span>
              </div>
              <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
  {/* Avatar or Icon */}
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
    {/* Add icon inside if needed */}
  </div>

  {/* User Info */}
  <div className="min-w-0 flex-1">
    <p className="text-sm text-gray-500">
      {property.postedByUserName || 'Unknown'}
    </p>
    <p className="font-medium text-gray-800 text-sm truncate">
      {property.postedByUserRole || 'Unknown'}
    </p>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 ml-4">
    {/* Call Button */}
    <a
      href="#"
      onClick={(event) => handleCallClick(event, property)}
      className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
    >
      <Phone className="w-4 h-4" /> 
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${property.phoneNumber}`}
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
  </div>
</section>

      {/* Buy Handpicked */}
<section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
  <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="text-center mb-8 md:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h2 className="text-1xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-blue-600 bg-clip-text text-transparent mb-1">
        Handpicked Properties for Sale
      </h2>
      {/* <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
        Discover premium properties curated by our expert team for the perfect investment opportunity
      </p> */}
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
        {featuredProperties.filter(property => property.propertyFor === 'SELL').map((property) => (
          <Link
            key={property.propertyId}
            to={`/listing/${property.propertyId}`}
            className="flex-none w-80 snap-center"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group h-[430px] flex flex-col">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                  alt={property.propertyName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                    {formatBHK(property.bhkType) || 'Property'}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-base text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {property.propertyName || 'Property Title'}
                  </h3>
                  <span className="text-blue-600 font-bold text-base ml-3 whitespace-nowrap">
                    ₹{formatPrice(property.expectedPrice) || 'Price'}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <div className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-sm line-clamp-1">
                    {`${property.address.area}, ${property.address.city}, ${property.address.state} ${property.address.pinCode}`}
                  </p>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-lg mb-4">
                  <span className="text-gray-700 text-sm font-medium">{property.carpetArea || 'Area'} sq ft</span>
                </div>
                <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
  {/* Avatar or Icon */}
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
    {/* Add icon inside if needed */}
  </div>

  {/* User Info */}
  <div className="min-w-0 flex-1">
    <p className="text-sm text-gray-500">
      {property.postedByUserName || 'Unknown'}
    </p>
    <p className="font-medium text-gray-800 text-sm truncate">
      {property.postedByUserRole || 'Unknown'}
    </p>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 ml-4">
    {/* Call Button */}
    <a
      href="#"
      onClick={(event) => handleCallClick(event, property)}
      className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
    >
      <Phone className="w-4 h-4" /> 
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${property.phoneNumber}`}
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
      <div className="flex justify-center mt-6 gap-2">
        {featuredProperties.filter(property => property.propertyFor === 'SELL').map((_, index) => (
          <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProperties.filter(property => property.propertyFor === 'SELL').map((property) => (
        <Link
          key={property.propertyId}
          to={`/listing/${property.propertyId}`}
          className="block group"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 h-[430px] flex flex-col">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/media/${property.propertyGallery[0]}`}
                alt={property.propertyName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                  {formatBHK(property.bhkType) || 'Property'}
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-gray-800 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                  {property.propertyName || 'Property Title'}
                </h3>
                <span className="text-blue-600 font-bold text-lg ml-4 whitespace-nowrap">
                  ₹{formatPrice(property.expectedPrice) || 'Price'}
                </span>
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-base line-clamp-1">
                  {`${property.address.area}, ${property.address.city}, ${property.address.state} ${property.address.pinCode}`}
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-xl mb-2">
                <span className="text-gray-700 font-medium">{property.carpetArea || 'Area'} sq ft</span>
              </div>
              <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
  {/* Avatar or Icon */}
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
    {/* Add icon inside if needed */}
  </div>

  {/* User Info */}
  <div className="min-w-0 flex-1">
    <p className="text-sm text-gray-500">
      {property.postedByUserName || 'Unknown'}
    </p>
    <p className="font-medium text-gray-800 text-sm truncate">
      {property.postedByUserRole || 'Unknown'}
    </p>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 ml-4">
    {/* Call Button */}
    <a
      href="#"
      onClick={(event) => handleCallClick(event, property)}
      className="flex items-center gap-1 bg-cyan-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl shadow-lg transition hover:shadow-xl transform hover:scale-105 text-sm"
    >
      <Phone className="w-4 h-4" /> 
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${property.phoneNumber}`}
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
  </div>
</section>


      {/* Under Construction Projects */}
      <section className="py-6 md:py-8 bg-white">
  <div className="w-full px-3 md:px-6 lg:px-8">

    {/* Title + View All */}
    <div className="flex items-center justify-center mb-4 md:mb-6">
      <h2 className="text-lg md:text-2xl font-bold text-gray-800">
        Top Under Construction Projects
      </h2>
    </div>

    {/* Slider Container */}
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={handleProjectMouseEnter}
      onMouseLeave={handleProjectMouseLeave}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide1}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <button
        onClick={nextSlide1}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Main Slide Wrapper */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${projectSlide * 100}%)` }}
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

                {/* Project Info */}
                <div className="absolute bottom-4 left-4 md:left-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-blue-100 text-sm md:text-base mb-2">
                    {project.subtitle}
                  </p>
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

                {/* Badges */}
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

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide1(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === projectSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center space-x-2 mt-4 overflow-x-auto pb-2">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => goToSlide1(index)}
            className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
              index === projectSlide
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
