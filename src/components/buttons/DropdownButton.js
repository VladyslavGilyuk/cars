import React, { useState } from "react";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import "../../styles/buttons/dropdownButton.css";

const DropdownButton = ({ carId, deleteCar, editCar}) => {
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
      <button className="dropbtn">Change</button>
      <div className="dropdown-content">
        <div onClick={handleEditClick}>Edit</div>
        <div onClick={handleDeleteClick}>Delete</div>
      </div>

      {showEditModal && (
        <EditModal carId={carId} onClose={handleEditModalClose} editCar={editCar}/>
      )}

      {showDeleteModal && (
        <DeleteModal carId={carId} onClose={handleDeleteModalClose} deleteCar={deleteCar} />
      )}
    </span>
  );
};

export default DropdownButton;
