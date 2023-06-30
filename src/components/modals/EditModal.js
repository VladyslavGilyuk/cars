import { useState } from "react";
import "../../styles/modal.css"

const EditModal = ({ carId, onClose, editCar }) => {
  // Add state variables and update functions for editable fields
  const [carColor, setCarColor] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carAvailability, setCarAvailability] = useState("available");
  const [priceError, setPriceError] = useState("");
  
  const handleColorChange = (e) => {
    setCarColor(e.target.value);
  };

  const handlePriceChange = (e) => {
    setCarPrice(e.target.value);
    setPriceError(e.target.value.match(/^\$[0-9]+(\.[0-9]{2})?$/) ? "" : "Price must be a number starting with '$'");
  };

  const handleAvailabilityChange = (e) => {
    setCarAvailability(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceError) {
      return; // Don't submit if there's an error
    }
    editCar(carId, carColor, carPrice, carAvailability)
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Car</h2>
        <form onSubmit={handleSubmit}>
          <label>Color:</label>
          <input type="text" value={carColor} onChange={handleColorChange} required />

          <label>Price:</label>
          <input type="text"  value={carPrice} onChange={handlePriceChange} required />
          {priceError && <span className="error">{priceError}</span>}

          <label>Availability:</label>
          <select value={"available"} onChange={handleAvailabilityChange}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <button className="save-button" type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
