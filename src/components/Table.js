import React, { useMemo } from "react";
import DropdownButton from "./buttons/DropdownButton";
import Pagination from './Pagination';
import '../styles/pagination.css';
import '../styles/table.css';

const Table = ({ cars, searchedTableData, searchedCars, searchedPage, setSearchedPage, deleteCar, editCar, currentPage, setCurrentPage }) => {

  const pageSize = 10;

  // Data for base pagination
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return (
      searchedCars.length > 0 ? searchedCars.slice(firstPageIndex, lastPageIndex)
      : cars.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, pageSize, cars, searchedCars]);

  // Deleting the last row from the page switches to the previous page
  if (currentTableData.length === 0 && currentPage !== 1) {
    setCurrentPage(currentPage - 1);
  }
  const showedCars= searchedTableData && searchedTableData.length > 0 ? searchedTableData : currentTableData
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
          {showedCars.map((currentCar) => {
            const {
              id,
              car,
              car_model,
              car_color,
              car_model_year,
              car_vin,
              price,
              availability,
            } = currentCar;
            return (
              <tr key={id}>
                <td>{car}</td>
                <td>{car_model}</td>
                <td>{car_vin}</td>
                <td>{car_color}</td>
                <td>{car_model_year}</td>
                <td>{price}</td>
                <td>{availability ? "available" : "unavailable"}</td>
                <td>
                  <DropdownButton carId={id} deleteCar={deleteCar} editCar={editCar}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={searchedCars.length > 0 ? searchedPage : currentPage}
        totalCount={searchedCars.length > 0 ? searchedCars.length : cars.length}
        pageSize={pageSize}
        onPageChange={page =>
          searchedCars.length > 0 ? setSearchedPage(page) : setCurrentPage(page)
        }
      />
    </>
  );
}

export default Table;
