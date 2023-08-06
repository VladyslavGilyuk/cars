import React, { useState } from "react";
import AddModal from "../modals/AddModal";
import '../../styles/buttons/add-car-button.css';

const AddCarButton = ({addCar}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  // Function to open the AddModal when the "Add Car" button is clicked
  const openAddModal = () => {
    setAddModalOpen(true);
  };
  // Function to close the AddModal
  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the AddModal */}
      <button id="add-car-button" onClick={openAddModal}>Add Car</button>
      {/* AddModal component, displayed when 'addModalOpen' is true */}
      {addModalOpen && (
        <AddModal onClose={closeAddModal} addCar={addCar} />
      )}
    </div>
  );
};

export default AddCarButton;
