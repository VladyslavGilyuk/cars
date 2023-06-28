import React, { useState, useEffect, useMemo, useContext } from 'react';
import { CarsContext } from '../CarsContext';
import Table from '../Table';

const SearchBar = () => {
  const { cars } = useContext(CarsContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchedCars, setSearchedCars] = useState([]);
  const [updatedPage, setUpdatedPage] = useState(1);

  const PageSize = 10;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setUpdatedPage(1); // Reset the page to 1 when search input changes
  };

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

  const searchedTableData = useMemo(() => {
    const firstPageIndex = (updatedPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchedCars.slice(firstPageIndex, lastPageIndex);
  }, [updatedPage, searchedCars]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />

      <Table
        searchedTableData={searchedTableData}
        searchedCars={searchedCars}
        updatedPage={updatedPage}
        setUpdatedPage={setUpdatedPage}
      />
    </div>
  );
};

export default SearchBar;
