import React, {  useState, useMemo, useContext } from "react";
import Rows from "./Rows";
import Pagination from './components/Pagination';
import { CarsContext } from "./CarsContext";
import './styles/pagination.css';



const Table = ( { searchedTableData, searchedCars, updatedPage, setUpdatedPage }) => {

  const { cars } = useContext(CarsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 10;

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
          <Rows cars={searchedTableData && searchedTableData.length > 0 ? searchedTableData : currentTableData} />
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={searchedCars && searchedCars.length > 0 ? updatedPage : currentPage}
        totalCount={searchedCars && searchedCars.length > 0 ? searchedCars.length : cars.length}
        pageSize={PageSize}
        onPageChange={page => searchedCars && searchedCars.length > 0 ? setUpdatedPage(page) : setCurrentPage(page)}
      />
    </>
  );
}

export default Table;
