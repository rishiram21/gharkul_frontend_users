import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Authcontext'; // Adjust the import path as necessary


const PostProperty = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Access the user from AuthContext

  // State declarations remain the same
  const [enums, setEnums] = useState({
    propertyCategory: [],
    furnishedType: [],
    bhkType: [],
    propertyFor: [],
    apartmentType: [],
  });


 useEffect(() => {
    const fetchEnums = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/properties/all_enum`
        );
        setEnums(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching enums:", error);
      }
    };
    fetchEnums();
  }, []);


  const [selectedFiles, setSelectedFiles] = useState([]);

  // Basic state
  // const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [subPropertyType, setSubPropertyType] = useState("");
  const [transactionType, setTransactionType] = useState("");

  // Property Details
  const [propertyName, setPropertyName] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [floor, setFloor] = useState("");
  const [totalFloor, setTotalFloor] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");

  // Location Details
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Rental/Purchase Details
  const [expectedRent, setExpectedRent] = useState("");
  const [expectedDeposit, setExpectedDeposit] = useState("");
  const [monthlyMaintenance, setMonthlyMaintenance] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [preferredTenants, setPreferredTenants] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [description, setDescription] = useState("");

  // PG Specific
  const [roomType, setRoomType] = useState("");
  const [pgGender, setPgGender] = useState("");
  const [preferredGuests, setPreferredGuests] = useState("");
  const [gateClosingTime, setGateClosingTime] = useState("");

  // Commercial Specific
  const [buildingType, setBuildingType] = useState("");
  const [floorType, setFloorType] = useState("");

  // Land/Plot Specific
  const [plotArea, setPlotArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [boundaryWall, setBoundaryWall] = useState("");
  const [amenities, setAmenities] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
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

    fetchAmenities();
  }, []);

  const handleAmenityChange = (amenityId) => {
    setSelectedAmenities((prevState) =>
      prevState.includes(amenityId)
        ? prevState.filter((id) => id !== amenityId)
        : [...prevState, amenityId]
    );
  };

  const cities = ["Pune"];

  const handlePropertyTypeClick = (type) => {
    setPropertyType(type);
    setSubPropertyType("");
    setTransactionType("");
    console.log("Property Type:", type);
  };

  const handleTransactionTypeClick = (type) => {
    setTransactionType(type);
    console.log("Transaction Type:", type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Use the user ID from the context
    const userId = user?.userId || 1; // Fallback to 1 if user is not available

    const propertyData = {
      postedByUserId: userId, // Use the user ID from the context
      category: propertyType || "RESIDENTIAL",
      propertyFor: transactionType || "RENT",
      apartmentType: apartmentType || "FLAT",
      propertyName: propertyName || "test",
      bhkType: bhkType || "BHK_6",
      floor: parseInt(floor) || 1,
      totalFloors: parseInt(totalFloor) || 1,
      totalBuildUpArea: parseFloat(builtUpArea) || 1,
      carpetArea: parseFloat(carpetArea) || 1,
      address: {
        area: area || "test",
        city: "Pune",
        state: state || "test",
        pinCode: pincode || "1",
      },
      buildingType: buildingType || "",
      plotArea: parseFloat(plotArea) || 0,
      length: parseFloat(length) || 0,
      width: parseFloat(width) || 0,
      boundaryWall: boundaryWall || "",
      expectedPrice: parseFloat(expectedPrice) || 0,
      deposit: parseFloat(expectedDeposit) || 1,
      monthlyMaintenance: parseFloat(monthlyMaintenance) || 1,
      availableFrom:
        new Date(availableFrom).toISOString() || new Date().toISOString(),
      preferred_tenants: preferredTenants || "Anyone",
      furnishedType: furnishing || "UNFURNISHED",
      description: description || "test",
      amenityIds: selectedAmenities,
    };

    console.log("Property Data:", propertyData);

    formData.append("property", JSON.stringify(propertyData));

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/properties/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Property posted successfully:", response.data);
      alert("Property posted successfully!");
      navigate('/listing');
    } catch (error) {
      console.error(
        "Error posting property:",
        error.response ? error.response.data : error.message
      );
      alert("Error posting property. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
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
        <p className="mb-2">
          {propertyType === "RESIDENTIAL" &&
          (transactionType === "RENT" || transactionType === "SELL")
            ? "Upload 1-4 photos"
            : "Upload up to 10 photos"}
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Upload Media
        </button>
        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <p>Selected Files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderBasicSelection = () => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      {/* Property Type Buttons */}
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
            onClick={() => handlePropertyTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Transaction Type Buttons */}
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
                onClick={() => handleTransactionTypeClick(type)}
              >
                {type}
              </button>
            ))}
        </div>
      )}
    </div>
  );

  const renderPropertyDetails = () => {
    if (!propertyType || !transactionType) {
      console.log("Property Type or Transaction Type not set");
      return null;
    }
    console.log(
      "Rendering Property Details for:",
      propertyType,
      transactionType
    );

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            2
          </span>
          Property Details
        </h2>

        {/* Residential Rent/Sell */}
        {propertyType === "RESIDENTIAL" &&
          (transactionType === "RENT" || transactionType === "SELL") && (
            <>
              <input
                type="text"
                placeholder="Property Name"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />

              <div className="flex flex-wrap gap-3 mb-3">
                {enums.apartmentType.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      apartmentType === type
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setApartmentType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3 mb-3">
                <select
                  className="w-1/3 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={bhkType}
                  onChange={(e) => setBhkType(e.target.value)}
                >
                  <option value="">BHK Type</option>
                  {enums.bhkType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="w-1/3 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  min={1}
                />

                <input
                  type="number"
                  className="w-1/3 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Total Floors"
                  value={totalFloor}
                  onChange={(e) => setTotalFloor(e.target.value)}
                  min={1}
                />
              </div>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Built-up Area (sq.ft)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Carpet Area (sq.ft)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(e.target.value)}
                />
              </div>
            </>
          )}

        {/* PG/Hostel */}
        {propertyType === "RESIDENTIAL" &&
          (transactionType === "PG" || transactionType === "HOSTEL") && (
            <>
              <input
                type="text"
                placeholder="Property Name"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />

              <select
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Room Type in PG</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
              </select>

              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Built-up Area (sq.ft)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Carpet Area (sq.ft)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(e.target.value)}
                />
              </div>
            </>
          )}

        {/* Commercial */}
        {propertyType === "COMMERCIAL" && (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Office Space",
                "Shop",
                "Showroom",
                "Godown",
                "Industrial Building",
                "Other",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    subPropertyType === type
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSubPropertyType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Independent House",
                "Business Park",
                "Mall",
                "Standalone Building",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    buildingType === type
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setBuildingType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <select
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={propertyAge}
              onChange={(e) => setPropertyAge(e.target.value)}
            >
              <option value="">Age of Property</option>
              <option value="<1">Less than 1 year</option>
              <option value="3-5">3 to 5 years</option>
              <option value="5-10">5 to 10 years</option>
              <option value=">10">More than 10 years</option>
            </select>

            <div className="flex space-x-3 mb-3">
              <select
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              >
                <option value="">Floor</option>
                <option value="Lower Basement">Lower Basement</option>
                <option value="Ground">Ground</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <select
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={floorType}
                onChange={(e) => setFloorType(e.target.value)}
              >
                <option value="">Floor Type</option>
                <option value="Full Building">Full Building</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </>
        )}

        {/* Land/Plot */}
        {propertyType === "PLOT" && (
          <>
            <input
              type="text"
              placeholder="Plot Area (sq.ft)"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={plotArea}
              onChange={(e) => setPlotArea(e.target.value)}
            />

            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="Length (ft)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <input
                type="text"
                placeholder="Width (ft)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mb-3">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    boundaryWall === option
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setBoundaryWall(option)}
                >
                  Boundary Wall: {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderLocationDetails = () => {
    if (!propertyType || !transactionType) {
      console.log("Property Type or Transaction Type not set");
      return null;
    }
    console.log(
      "Rendering Location Details for:",
      propertyType,
      transactionType
    );

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
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="flex space-x-3 mb-3">
          <input
            type="text"
            placeholder="State"
            className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pin Code"
            className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderPricingDetails = () => {
    if (!propertyType || !transactionType) {
      console.log(
        "Pricing Details not rendered. Property Type:",
        propertyType,
        "Transaction Type:",
        transactionType
      );
      return null;
    }
    console.log(
      "Rendering Pricing Details for:",
      propertyType,
      transactionType
    );

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">
            4
          </span>
          {propertyType === "RESIDENTIAL" &&
            transactionType === "RENT" &&
            "Rental Details"}
          {propertyType === "RESIDENTIAL" &&
            transactionType === "SELL" &&
            "Resale Details"}
          {propertyType === "RESIDENTIAL" &&
            (transactionType === "PG" || transactionType === "HOSTEL") &&
            "PG Details"}
          {propertyType === "COMMERCIAL" && "Rental Details"}
          {propertyType === "PLOT" && "Resale Details"}
        </h2>

        {/* Residential Rent */}
        {propertyType === "RESIDENTIAL" && transactionType === "RENT" && (
          <>
            <p className="text-gray-600 mb-3">
              Property Available for rent/lease
            </p>

            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="Expected Rent (INR)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={expectedRent}
                onChange={(e) => setExpectedRent(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expected Deposit (INR)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={expectedDeposit}
                onChange={(e) => setExpectedDeposit(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Monthly Maintenance (INR)"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={monthlyMaintenance}
              onChange={(e) => setMonthlyMaintenance(e.target.value)}
            />

            <input
              type="date"
              placeholder="Available From"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-sm text-gray-600 w-full mb-2">
                Preferred Tenants:
              </span>
              {[
                "Anyone",
                "Family",
                "Bachelor Female",
                "Bachelor Male",
                "Company",
              ].map((tenant) => (
                <button
                  key={tenant}
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    preferredTenants === tenant
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setPreferredTenants(tenant)}
                >
                  {tenant}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-sm text-gray-600 w-full mb-2">
                Furnishing:
              </span>
              {enums.furnishedType.map((furnish) => (
                <button
                  key={furnish}
                  type="button"
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    furnishing === furnish
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFurnishing(furnish)}
                >
                  {furnish}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        )}

        {/* Residential Sell */}
        {propertyType === "RESIDENTIAL" && transactionType === "SELL" && (
          <>
            <input
              type="text"
              placeholder="Expected Price (INR)"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
            />

            <input
              type="date"
              placeholder="Available From"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        )}

        {/* PG/Hostel */}
        {propertyType === "RESIDENTIAL" &&
          (transactionType === "PG" || transactionType === "HOSTEL") && (
            <>
              <div className="flex space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Expected Rent (INR)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={expectedRent}
                  onChange={(e) => setExpectedRent(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Expected Deposit (INR)"
                  className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={expectedDeposit}
                  onChange={(e) => setExpectedDeposit(e.target.value)}
                />
              </div>

              

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm text-gray-600 w-full mb-2">
                  PG Details:
                </span>
                {["Male", "Female", "Others"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pgGender === gender
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setPgGender(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-sm text-gray-600 w-full mb-2">
                  Preferred Guests:
                </span>
                {["Working", "Student", "Both"].map((guest) => (
                  <button
                    key={guest}
                    type="button"
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      preferredGuests === guest
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setPreferredGuests(guest)}
                  >
                    {guest}
                  </button>
                ))}
              </div>

              <input
                type="date"
                placeholder="Available From"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />

              <input
                type="time"
                placeholder="Gate Closing Time"
                className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={gateClosingTime}
                onChange={(e) => setGateClosingTime(e.target.value)}
              />
            </>
          )}

        {/* Commercial */}
        {propertyType === "COMMERCIAL" && (
          <>
            <div className="flex space-x-3 mb-3">
              <input
                type="text"
                placeholder="Expected Rent (INR)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={expectedRent}
                onChange={(e) => setExpectedRent(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expected Deposit (INR)"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={expectedDeposit}
                onChange={(e) => setExpectedDeposit(e.target.value)}
              />
            </div>

            <input
              type="date"
              placeholder="Available From"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />

            
          </>
        )}

        {/* Land/Plot */}
        {propertyType === "PLOT" && (
          <>
            <input
              type="text"
              placeholder="Expected Price (INR)"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
            />

            <input
              type="date"
              placeholder="Available From"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            
          </>
        )}
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
                selectedAmenities.includes(amenity.amenityId)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
            Post Your Property
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Fill in the details to list your property
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
              🏠 Post My Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;