// CarsContext.js
import React, { createContext, useEffect, useState } from "react";

const CarsContext = createContext();

const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const API = 'https://myfakeapi.com/api/cars/';

  useEffect(() => {
    // Fetch data and update cars state
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCars(data.cars);
      });
  }, []);

  return (
    <CarsContext.Provider value={{ cars, setCars }}>
      {children}
    </CarsContext.Provider>
  );
};

export { CarsContext, CarsProvider };
