import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import AddCarButton from "./components/buttons/AddCarButton";
import ShowAllCarsButton from "./components/buttons/ShowAllCarsButton";
import FetchModal from "./components/modals/FetchModal";

import './styles/app.css';

const App = () => {
  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedCars, setSearchedCars] = useState([]);
  const [updatedPage, setUpdatedPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage")
      ? parseInt(localStorage.getItem("currentPage"))
      : 1
  );
  const [searchedPage, setSearchedPage] = useState(
    localStorage.getItem("searchedPage")
      ? parseInt(localStorage.getItem("searchedPage"))
      : 1
  );
  
    
 // Add a loading state variable
    
  const API = 'https://myfakeapi.com/api/cars/';
  const pageSize = 10;

  useEffect(() => {
    const savedCars = localStorage.getItem("cars");
    if (savedCars && savedCars !== []) {
      setCars(JSON.parse(savedCars));
      setFetching(false); // Update the loading state once data is loaded
    } else {
      fetch(API)
        .then(res => res.json())
        .then(data => {
          if (data && data.cars) {
            setCars(data.cars);
            localStorage.setItem("cars", JSON.stringify(data.cars));
          } else {
            throw new Error("Failed to fetch API data.");
          }
        })
        .catch(error => {
          console.error(error);
          // Set the error state variable if an error occurred
          setFetching(false);
        })
        .finally(() => {
          setFetching(false); // Update the loading state regardless of success or failure
        });
    }
  }, []);
  

  useEffect(() => {
  const savedPage = localStorage.getItem("currentPage");
  const savedSearchInput = localStorage.getItem("searchInput");
  if (savedPage) {
    setCurrentPage(parseInt(savedPage));
  }
  if (savedSearchInput) {
    setSearchInput(savedSearchInput);
  }
}, []);

useEffect(() => {
  localStorage.setItem("currentPage", currentPage);
  localStorage.setItem("searchInput", searchInput);
}, [currentPage, searchInput]);

useEffect(() => {
  localStorage.setItem("currentPage", currentPage);
  if (searchInput.length > 0) {
    localStorage.setItem("searchedPage", searchedPage);
  } else {
    localStorage.removeItem("searchedPage");
  }
}, [currentPage, searchInput, searchedPage]);


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
    (searchedPage - 1) * pageSize,
    searchedPage * pageSize
  );

const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
  setUpdatedPage(1); 
  // Reset to the first page
};

const deleteCar = (carId) => {
  const updatedCars = cars.filter((car) => car.id !== carId);
  setCars(updatedCars);
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
    localStorage.setItem("cars", JSON.stringify(updatedCars))
  };
  const addCar = (newCar) => {
    // Generate a new ID for the car
    const newId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
  
    // Create a new car object with the generated ID
    const carWithId = { ...newCar, id: newId };
  
    // Update the cars state with the new car
    const updatedCars = [...cars, carWithId]
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars))
  };
  
  const showAllCars = (cars) => {
    setCars(cars);
    setSearchedCars([]); // Clear the searched cars
    setSearchInput(""); // Clear the search input
    setCurrentPage(1)
    localStorage.setItem("cars", JSON.stringify(cars));
  };
  const showAllCarsButtonVisible = searchInput.length > 0 ?  "visible" : "hidden";

  console.log(showAllCarsButtonVisible)
  return (
    <div className="App">
    <div className="upper-container">
    <div style={{ visibility: showAllCarsButtonVisible }}>
        <ShowAllCarsButton
          className="show-all-car-button"
          cars={cars}
          showAllCars={showAllCars}
          setSearchInput={setSearchInput}
        />
      </div>
        <SearchBar className="search-bar" searchInput={searchInput} handleChange={handleChange} />
        <AddCarButton className="add-car-button" addCar={addCar} />
    </div>
       
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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchedPage={searchedPage}
        setSearchedPage={setSearchedPage}
      />
      {fetching && <FetchModal>Fetching Data...</FetchModal>}
    </div>
  );
}

export default App;
