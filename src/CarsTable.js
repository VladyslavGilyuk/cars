const CarsTable = ({ cars }) => {
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
              <td>{availability ? "available" : "inavailable"}</td>
              <td>{"Dropdown button"}</td>
            </tr>
          )
        })
      }
    </>
  );
}


  
export default CarsTable;