import { useState } from "react";
import "../../styles/modal.css"

const EditModal = ({ carId, onClose, cars, setCars }) => {
  // Add state variables and update functions for editable fields
  const [carColor, setCarColor] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carAvailability, setCarAvailability] = useState("");

  const handleColorChange = (e) => {
    setCarColor(e.target.value);
  };

  const handlePriceChange = (e) => {
    setCarPrice(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setCarAvailability(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return {
          ...car,
          car_color: carColor,
          price: carPrice,
          availability: carAvailability === "available",
        };
      }
      return car;
    });

    setCars(updatedCars);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Car</h2>
        <form onSubmit={handleSubmit}>
          <label>Color:</label>
          <input
            type="text"
            value={carColor}
            onChange={handleColorChange}
            required
          />

          <label>Price:</label>
          <input
            type="text"
            value={carPrice}
            onChange={handlePriceChange}
            required
          />

          <label>Availability:</label>
          <select value={carAvailability} onChange={handleAvailabilityChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
