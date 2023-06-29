import React from "react";
import '../styles/dropdownButton.css';

const DropdownButton = () => {
  return (
    <span className="dropdown">
      <button className="dropbtn">Dropdown</button>
      <div className="dropdown-content">
        <div>Edit</div>
        <div>Delete</div>
      </div>
    </span>
  );
};

export default DropdownButton;
