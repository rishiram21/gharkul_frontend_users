import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../context/Authcontext';

const Editdetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { propertyId } = useParams();
  const pinCodeRegex = /^[1-9][0-9]{0,5}$/;

  const [enums, setEnums] = useState({
    propertyCategory: [],
    furnishedType: [],
    bhkType: [],
    propertyFor: [],
    apartmentType: [],
  });

  const [amenities, setAmenities] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [property, setProperty] = useState({
    propertyName: "",
    apartmentType: "",
    bhkType: "",
    floor: "",
    totalFloor: "",
    propertyAge: "",
    builtUpArea: "",
    carpetArea: "",
    area: "",
    state: "",
    pincode: "",
    expectedDeposit: "",
    monthlyMaintenance: "",
    availableFrom: "",
    preferredTenants: "",
    furnishing: "",
    expectedPrice: "",
    description: "",
    roomType: "",
    pgGender: "",
    preferredGuests: "",
    gateClosingTime: "",
    buildingType: "",
    floorType: "",
    plotArea: "",
    length: "",
    width: "",
    boundaryWall: "",
    selectedAmenities: [],
  });

  const [propertyType, setPropertyType] = useState("");
  const [subPropertyType, setSubPropertyType] = useState("");
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/properties/all_enum`
        );
        setEnums(response.data);
      } catch (error) {
        console.error("Error fetching enums:", error);
      }
    };

    const fetchAmenities = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/amenities/get`
        );
        const data = await response.json();
        setAmenities(data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/properties/${propertyId}`
        );
        const propertyData = response.data;
        setProperty(propertyData);
        setPropertyType(propertyData.category);
        setTransactionType(propertyData.propertyFor);
        setSelectedFiles(propertyData.images || []);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchEnums();
    fetchAmenities();
    fetchPropertyDetails();
  }, [propertyId]);

  const handleAmenityChange = (amenityId) => {
    setProperty((prevState) => ({
      ...prevState,
      selectedAmenities: prevState.selectedAmenities.includes(amenityId)
        ? prevState.selectedAmenities.filter((id) => id !== amenityId)
        : [...prevState.selectedAmenities, amenityId],
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const userId = user?.id;

    if (!userId) {
      console.error("User ID is not available");
      alert("User ID is not available. Please log in again.");
      return;
    }

    const propertyData = {
      ...property,
      postedByUserId: userId,
      category: propertyType,
      propertyFor: transactionType,
      amenityIds: property.selectedAmenities,
    };

    formData.append("property", JSON.stringify(propertyData));

    if (selectedFiles.length === 0) {
      alert("No images uploaded. Attaching default image...");
      const response = await fetch("/default-image.jpg");
      const blob = await response.blob();
      const defaultFile = new File([blob], "default-image.jpg", { type: blob.type });
      formData.append("images", defaultFile);
    } else {
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/properties/update/${propertyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Property updated successfully:", response.data);
      alert("Property updated successfully!");
      navigate('/listing');
    } catch (error) {
      console.error(
        "Error updating property:",
        error.response ? error.response.data : error.message
      );
      alert("Error updating property. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const renderBasicSelection = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {enums.propertyCategory.map((type) => (
          <button
            key={type}
            type="button"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              propertyType === type
                ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
            onClick={() => setPropertyType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {propertyType && (
        <div className="flex flex-wrap gap-3 mb-4">
          {enums.propertyFor
            .filter((type) => {
              if (propertyType === "RESIDENTIAL") {
                return (
                  type === "RENT" ||
                  type === "SELL" ||
                  type === "PG" ||
                  type === "HOSTEL"
                );
              } else if (propertyType === "COMMERCIAL") {
                return type === "RENT" || type === "SELL";
              } else if (propertyType === "PLOT") {
                return type === "SELL" || type === "RESELL";
              }
              return false;
            })
            .map((type) => (
              <button
                key={type}
                type="button"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  transactionType === type
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
                onClick={() => setTransactionType(type)}
              >
                {type}
              </button>
            ))}
        </div>
      )}
    </div>
  );

  const renderPropertyDetails = () => {
    if (!propertyType || !transactionType) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            2
          </span>
          Property Details
        </h2>
        {propertyType === "RESIDENTIAL" && (transactionType === "RENT" || transactionType === "SELL") && (
          <>
            <input
              type="text"
              placeholder="Property Name"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              name="propertyName"
              value={property.propertyName}
              onChange={handleInputChange}
            />
            {/* Add other fields similarly */}
          </>
        )}
      </div>
    );
  };

  const renderLocationDetails = () => {
    if (!propertyType || !transactionType) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            3
          </span>
          Location Details
        </h2>
        <input
          type="text"
          placeholder="Area"
          className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          name="area"
          value={property.area}
          onChange={handleInputChange}
        />
        {/* Add other fields similarly */}
      </div>
    );
  };

  const renderPricingDetails = () => {
    if (!propertyType || !transactionType) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            4
          </span>
          Pricing Details
        </h2>
        {/* Add pricing fields similarly */}
      </div>
    );
  };

  const renderAmenities = () => {
    if (!propertyType || !transactionType) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            5
          </span>
          Amenities
        </h2>
        <div className="flex flex-wrap gap-3">
          {amenities.map((amenity) => (
            <button
              key={amenity.amenityId}
              type="button"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                property.selectedAmenities.includes(amenity.amenityId)
                  ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
              onClick={() => handleAmenityChange(amenity.amenityId)}
            >
              {amenity.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderPropertyPhotos = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
          6
        </span>
        Property Photos
      </h2>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
        <p className="mb-2 text-gray-700">
          Upload 1–4 images (required)
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />
        {selectedFiles.length === 0 ? (
          <div className="flex justify-center mt-4">
            <img
              src="/default.jpg"
              alt="Default"
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Selected ${index}`}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
            Edit Your Property
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Update the details of your property
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <form onSubmit={handleSubmit}>
            {renderBasicSelection()}
            {renderPropertyDetails()}
            {renderLocationDetails()}
            {renderPricingDetails()}
            {renderAmenities()}
            {renderPropertyPhotos()}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🏠 Update Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editdetails;
