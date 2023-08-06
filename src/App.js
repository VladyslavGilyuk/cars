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
   
  const API = 'https://myfakeapi.com/api/cars/';
  const pageSize = 10;

  // Fetch data from API or load saved data from local storage on initial render
  useEffect(() => {
    const savedCars = localStorage.getItem("cars");
    if (savedCars && savedCars !== []) {
      setCars(JSON.parse(savedCars));
      setFetching(false);
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
          setFetching(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, []);
  
  // Load saved page and search input from localStorage on initial render
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

  // Save current page and search input on change
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("searchInput", searchInput);
  }, [currentPage, searchInput]);

  // Save searched page or remove it
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    if (searchInput.length > 0) {
      localStorage.setItem("searchedPage", searchedPage);
    } else {
      localStorage.removeItem("searchedPage");
    }
  }, [currentPage, searchInput, searchedPage]);

  // Filter cars based on the search input
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

  // Get the data for the current page of searched cars
  const searchedTableData = searchedCars.slice(
    (searchedPage - 1) * pageSize,
    searchedPage * pageSize
  );

  // Handle search input change
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setUpdatedPage(1); 
  };

   // Delete car
  const deleteCar = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  // Edit car
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

  // Add new car
  const addCar = (newCar) => {
    const newId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    const carWithId = { ...newCar, id: newId };
    const updatedCars = [...cars, carWithId]
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars))
  };
  
  // Show all cars (reset search and pagination)
  const showAllCars = (cars) => {
    setCars(cars);
    setSearchedCars([]);
    setSearchInput("");
    setCurrentPage(1)
    localStorage.setItem("cars", JSON.stringify(cars));
  };

  // Hide or show ShowAllCarsButton
  const showAllCarsButtonVisible = searchInput.length > 0 ?  "visible" : "hidden";

  return (
    <div className="App">
      <div className="upper-container">
        <div style={{ visibility: showAllCarsButtonVisible }}>
            <ShowAllCarsButton className="show-all-car-button" cars={cars} showAllCars={showAllCars} setSearchInput={setSearchInput} />
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
