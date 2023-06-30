import React, { useState } from "react";
import "../../styles/modal.css";

const AddModal = ({ onClose, addCar }) => {
  const [car, setCar] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carModelYear, setCarModelYear] = useState("");
  const [carVin, setCarVin] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carAvailability, setCarAvailability] = useState("available");

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
    setCarModelYear(e.target.value);
  };

  const handleCarVinChange = (e) => {
    setCarVin(e.target.value);
  };

  const handleCarPriceChange = (e) => {
    setCarPrice(e.target.value);
  };

  const handleCarAvailabilityChange = (e) => {
    setCarAvailability(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      car,
      car_model: carModel,
      car_color: carColor,
      car_model_year: carModelYear,
      car_vin: carVin,
      price: carPrice,
      availability: carAvailability === "available",
    };
    addCar(newCar);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Car</h2>
        <form onSubmit={handleSubmit}>
          <label>Car:</label>
          <input
            type="text"
            value={car}
            onChange={handleCarChange}
            required
          />

          <label>Car Model:</label>
          <input
            type="text"
            value={carModel}
            onChange={handleCarModelChange}
            required
          />

          <label>Color:</label>
          <input
            type="text"
            value={carColor}
            onChange={handleCarColorChange}
            required
          />

          <label>Model Year:</label>
          <input
            type="text"
            value={carModelYear}
            onChange={handleCarModelYearChange}
            required
          />

          <label>VIN:</label>
          <input
            type="text"
            value={carVin}
            onChange={handleCarVinChange}
            required
          />

          <label>Price:</label>
          <input
            type="text"
            value={carPrice}
            onChange={handleCarPriceChange}
            required
          />

          <label>Availability:</label>
          <select
            value={carAvailability}
            onChange={handleCarAvailabilityChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          </form>
  </div>
</div>
);
};

export default AddModal;
