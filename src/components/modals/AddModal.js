import React, { useState } from "react";
import "../../styles/modal.css"

const AddModal = ({ onClose, addCar }) => {
  const [car, setCar] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carModelYear, setCarModelYear] = useState("");
  const [carVin, setCarVin] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carAvailability, setCarAvailability] = useState("available");
  const [yearError, setYearError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [vinError, setVinError] = useState("");
   // Functions to handle input changes for Car:
  const handleCarChange = (e) => {
    setCar(e.target.value);
  };

  const handleCarModelChange = (e) => {
    setCarModel(e.target.value);
  };

  const handleCarColorChange = (e) => {
    setCarColor(e.target.value);
  };

  const handleCarModelYearChange = (e) => {
    const value = e.target.value;
    setCarModelYear(value);
    setYearError(!Number.isNaN(Number(value)) ? "" : "Year must be a number !");
  };

   const handleCarVinChange = (e) => {
    setCarVin(e.target.value);
    setVinError(e.target.value.length === 17 ? "" : "VIN must consist of exactly 17 characters");
  };

  const handleCarPriceChange = (e) => {
    setCarPrice(e.target.value);
    setPriceError(e.target.value.match(/^\$[0-9]+(\.[0-9]{2})?$/) ? "" : "Price must be a number starting with '$'");
  };

  const handleCarAvailabilityChange = (e) => {
    setCarAvailability(e.target.value);
  };
  // Function to handle the form submission when adding a new car
  const handleSubmit = (e) => {
    e.preventDefault();
    // Don't submit if there are errors in year, price, or VIN
    if (yearError || priceError || vinError) {
        return; // Don't submit if there's an error
      }
    const newCar = {
      car,
      car_model: carModel,
      car_color: carColor,
      car_model_year: carModelYear,
      car_vin: carVin,
      price: carPrice,
      availability: carAvailability === "available",
    };
    addCar(newCar); // Call the addCar function to add the new car to the list
    onClose(); // Close the modal after adding the car
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Car</h2>
        <form onSubmit={handleSubmit}>
          <label>Company:</label>
          <input type="text" value={car} onChange={handleCarChange} required />

          <label>Model:</label>
          <input type="text" value={carModel} onChange={handleCarModelChange} required />

          <label>VIN:</label>
          <input type="text" value={carVin} onChange={handleCarVinChange} required />
          {vinError && <span className="error">{vinError}</span>}

          <label>Color:</label>
          <input type="text" value={carColor} onChange={handleCarColorChange} required />

          <label>Year:</label>
          <input type="text" value={carModelYear} onChange={handleCarModelYearChange} required />
          {yearError && <span className="error">{yearError}</span>}

          <label>Price:</label>
          <input type="text" value={carPrice} onChange={handleCarPriceChange} required />
          {priceError && <span className="error">{priceError}</span>}

          <label>Availability:</label>
          <select value={carAvailability} onChange={handleCarAvailabilityChange} >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
            {/* Buttons to Add or Cancel */}
          <button className="add-button"  type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
          </form>
  </div>
</div>
);
};

export default AddModal;
