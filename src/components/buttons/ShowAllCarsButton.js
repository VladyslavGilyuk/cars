import React from "react";

const ShowAllCarsButton = ({ cars, showAllCars, setSearchInput }) => {
  const handleShowClick = () => {
    showAllCars(cars);
    setSearchInput("");
  };

  return (
    <div>
      <button onClick={handleShowClick}>Go back to All Cars</button>
    </div>
  );
};

export default ShowAllCarsButton;
