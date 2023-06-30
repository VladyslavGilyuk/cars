import React from "react";
import '../../styles/buttons/show-all-car-button.css';

const ShowAllCarsButton = ({ cars, showAllCars, setSearchInput }) => {
  const handleShowClick = () => {
    showAllCars(cars);
    setSearchInput("");
  };

  return (
    <div>
      <button id="show-all-car-button" onClick={handleShowClick}>Go back to All Cars</button>
    </div>
  );
};

export default ShowAllCarsButton;
