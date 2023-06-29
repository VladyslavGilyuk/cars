import React, { useState } from "react";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import "../styles/dropdownButton.css";

const DropdownButton = ({ carId, cars, setCars}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <span className="dropdown">
      <button className="dropbtn">Dropdown</button>
      <div className="dropdown-content">
        <div onClick={handleEditClick}>Edit</div>
        <div onClick={handleDeleteClick}>Delete</div>
      </div>

      {showEditModal && (
        <EditModal carId={carId} onClose={handleEditModalClose} cars={cars} setCars={setCars}/>
      )}

      {showDeleteModal && (
        <DeleteModal carId={carId} onClose={handleDeleteModalClose} cars={cars} setCars={setCars} />
      )}
    </span>
  );
};

export default DropdownButton;
