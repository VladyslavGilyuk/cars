import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";

const App = () => {
  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedCars, setSearchedCars] = useState([]);
  const [updatedPage, setUpdatedPage] = useState(1);


  const API = 'https://myfakeapi.com/api/cars/';
  const pageSize = 10;

  useEffect(() => {
    const savedCars = localStorage.getItem("cars");
    if (savedCars && savedCars !== []) {
      setCars(JSON.parse(savedCars));
    } else {
      fetch(API)
        .then(res => res.json())
        .then(data => {
          setCars(data.cars);
          localStorage.setItem("cars", JSON.stringify(data.cars));
          console.log(data.cars)
        });
    }
  }, []);

  useEffect(() => {
    if (searchInput.length > 0) {
      const filteredCars = cars.filter((car) => {
        const lowerCaseSearchInput = searchInput.toLowerCase();
        const lowerCaseCarModel = car.car_model.toLowerCase();
        const lowerCaseCar = car.car.toLowerCase();
        const carModelYear = car.car_model_year.toString();
        const lowerCaseCarVin = car.car_vin.toLowerCase();
        const lowerCaseCarColor = car.car_color.toLowerCase();
        const carPrice = car.price.toString();
        const availability = car.availability ? "available" : "unavailable";

        return (
          lowerCaseCarModel.startsWith(lowerCaseSearchInput) ||
          lowerCaseCar.startsWith(lowerCaseSearchInput) ||
          carModelYear.startsWith(searchInput) ||
          lowerCaseCarVin.startsWith(lowerCaseSearchInput) ||
          lowerCaseCarColor.startsWith(lowerCaseSearchInput) ||
          carPrice.startsWith(searchInput) ||
          availability.startsWith(searchInput)
        );
      });

      setSearchedCars(filteredCars);
    }
  }, [searchInput, cars]);

  const searchedTableData = searchedCars.slice(
    (updatedPage - 1) * pageSize,
    updatedPage * pageSize
  );

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setUpdatedPage(1);
  };

  const deleteCar = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    setSearchedCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  const editCar = (carId, carColor, carPrice, carAvailability) => {
    const updatedCars = cars.map((car) => {
      if (car.id === carId) {
        return {
          ...car,
          car_color: carColor,
          price: carPrice,
          availability: carAvailability === "available",
        };
      }
      return car;
    });

    setCars(updatedCars);
    setSearchedCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars))
  };


  return (
    <div className="App">
      <SearchBar searchInput={searchInput} handleChange={handleChange} />
      <Table
        cars={cars}
        setCars={setCars}
        searchedTableData={searchedTableData}
        searchedCars={searchedCars}
        updatedPage={updatedPage}
        setUpdatedPage={setUpdatedPage}
        setSearchedCars={setSearchedCars}
        pageSize={pageSize}
        deleteCar={deleteCar}
        editCar={editCar}
      />
    </div>
  );
}

export default App;
