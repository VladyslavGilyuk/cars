import React, { useState } from "react";
import AddModal from "../modals/AddModal";
import '../../styles/buttons/add-car-button.css';

const AddCarButton = ({addCar}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      <button id="add-car-button" onClick={openAddModal}>Add Car</button>
      
      {addModalOpen && (
        <AddModal onClose={closeAddModal} addCar={addCar} />
      )}
    </div>
  );
};

export default AddCarButton;
