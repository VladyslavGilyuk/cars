import React from "react";
import '../styles/search-bar.css';

const SearchBar = ({ searchInput, handleChange }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default SearchBar;
