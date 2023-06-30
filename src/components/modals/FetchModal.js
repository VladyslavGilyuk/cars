// Modal.js

import React from "react";
import "../../styles/modal.css"

const FetchModal = ({ children }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default FetchModal;
