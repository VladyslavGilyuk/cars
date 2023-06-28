import React, { useEffect, useState } from "react";
import CarsTable from "./CarsTable";

const Cars = () => {
  const API = 'https://myfakeapi.com/api/cars/';
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCars(data.cars);
      })
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CarsTable cars={cars} />
        </tbody>
      </table>
    </>
  );
}

export default Cars;
