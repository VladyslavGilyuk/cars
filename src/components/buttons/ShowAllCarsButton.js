import React from "react";
import '../../styles/buttons/show-all-car-button.css';

const ShowAllCarsButton = ({ cars, showAllCars, setSearchInput }) => {
  // Function to handle the "Go back to All Cars" button click
  const handleShowClick = () => {
    // Call the showAllCars function to display all cars again
    showAllCars(cars);
    // Clear the search input by setting it to an empty string
    setSearchInput("");
  };

  return (
    <div>
      {/* "Go back to All Cars" button */}
      <button id="show-all-car-button" onClick={handleShowClick}>Go back to All Cars</button>
    </div>
  );
};

export default ShowAllCarsButton;
