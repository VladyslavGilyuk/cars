import React from "react";
import DropdownButton from "./DropdownButton";

const Rows = ({ cars }) => {
  return (
    <>
      {
        cars.map((currentCar) => {
          const { id, car, car_model, car_color, car_model_year, car_vin, price, availability } = currentCar;
          return (
            <tr key={id}>
              <td>{car}</td>
              <td>{car_model}</td>
              <td>{car_vin}</td>
              <td>{car_color}</td>
              <td>{car_model_year}</td>
              <td>{price}</td>
              <td>{availability ? "available" : "unavailable"}</td>
              <td><DropdownButton /></td>
            </tr>
          )
        })
      }
    </>
  );
}


  
export default Rows;