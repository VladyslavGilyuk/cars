import React from "react";

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
