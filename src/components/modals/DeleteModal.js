import React from "react";
import "../../styles/modal.css"

const DeleteModal = ({ carId, onClose, deleteCar }) => {
  // Function to handle car deletion
  const handleDelete = () => {
    deleteCar(carId)
    onClose(); // Close the modal after deleting the car
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete Car</h2>
        <p>Are you sure you want to delete this car?</p>
        <div className="button-container">
          <button className="delete-button" onClick={handleDelete}>Delete </button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
