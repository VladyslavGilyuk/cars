// Modal.js

import React from "react";
import "../../styles/modal.css"

const FetchModal = ({ children }) => {
  // The FetchModal component displays a loading modal while data is being fetched.
  return (
    <div className="modal-background">
      <div className="modal-content">
      {/* The 'children' prop is the content to be displayed inside the modal, 
            typically a loading message like "Fetching Data..." */}
        {children}
      </div>
    </div>
  );
};

export default FetchModal;
