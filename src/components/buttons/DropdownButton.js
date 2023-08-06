import React, { useState } from "react";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import "../../styles/buttons/dropdownButton.css";

const DropdownButton = ({ carId, deleteCar, editCar }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Function to handle the "Edit" button click
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  // Function to handle the "Delete" button click
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  // Function to close the EditModal
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  // Function to close the DeleteModal
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <span className="dropdown">
    {/* DropdownButton to display options */}
      <button className="dropbtn">Change</button>
      <div className="dropdown-content">
        <div onClick={handleEditClick}>Edit</div>
        <div onClick={handleDeleteClick}>Delete</div>
      </div>
      {/* EditModal component, displayed when 'showEditModal' is true */}
      {showEditModal && (
        <EditModal carId={carId} onClose={handleEditModalClose} editCar={editCar}/>
      )}
      {/* DeleteModal component, displayed when 'showDeleteModal' is true */}
      {showDeleteModal && (
        <DeleteModal carId={carId} onClose={handleDeleteModalClose} deleteCar={deleteCar} />
      )}
    </span>
  );
};

export default DropdownButton;
