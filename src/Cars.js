import React, { useEffect, useState, useMemo } from "react";
import CarsTable from "./CarsTable";
import Pagination from './Pagination';
import './styles/pagination.css';

let PageSize = 10;

const Cars = () => {
  const API = 'https://myfakeapi.com/api/cars/';
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setCars(data.cars);
      })
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
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
          <CarsTable cars={currentTableData} />
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={cars.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

export default Cars;
