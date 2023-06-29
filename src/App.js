import SearchBar from "./components/SearchBar";
import { useState, useEffect, useMemo } from "react";
import Table from "./components/Table";

function App() {

  const [cars, setCars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedCars, setSearchedCars] = useState([]);
  const [updatedPage, setUpdatedPage] = useState(1);

  const API = 'https://myfakeapi.com/api/cars/';
  const pageSize = 10;

  // Fetch data and update cars state
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCars(data.cars);
      });
  }, []);

  // Check if input exist and update searchedCars state
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

  // Data to use pagination for input results only
  const searchedTableData = useMemo(() => {
    const firstPageIndex = (updatedPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return searchedCars.slice(firstPageIndex, lastPageIndex);
  }, [updatedPage, searchedCars]);

  // Reset the page to 1 when search input changes
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setUpdatedPage(1); 
  };

  return (
    <div className="App">
        <SearchBar
        searchInput={searchInput}
        handleChange={handleChange}/>
        <Table
        cars={cars}
        searchedTableData={searchedTableData}
        searchedCars={searchedCars}
        updatedPage={updatedPage}
        setUpdatedPage={setUpdatedPage}
        pageSize = {pageSize}
        />
    </div>
  );
}

export default App;
