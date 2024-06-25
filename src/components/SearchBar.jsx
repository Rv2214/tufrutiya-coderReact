import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../media/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
        placeholder="Search..."
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
