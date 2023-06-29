import React, { useState, useMemo } from "react";
import Rows from "./Rows";
import Pagination from './Pagination';
import '../styles/pagination.css';

const Table = ({ cars, searchedTableData, searchedCars, updatedPage, setUpdatedPage, deleteCar, editCar }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Data for base pagination
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return cars.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, cars]);

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
          <Rows cars={searchedTableData && searchedTableData.length > 0 ? searchedTableData : currentTableData} deleteCar={deleteCar}  editCar={editCar}/>
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={searchedCars && searchedCars.length > 0 ? updatedPage : currentPage}
        totalCount={searchedCars && searchedCars.length > 0 ? searchedCars.length : cars.length}
        pageSize={pageSize}
        onPageChange={page => searchedCars && searchedCars.length > 0 ? setUpdatedPage(page) : setCurrentPage(page)}
      />
    </>
  );
}

export default Table;
