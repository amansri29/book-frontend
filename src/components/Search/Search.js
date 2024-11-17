// src/components/Search/Search.js
import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    availability: '',
    location: '',
  });

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, filters); // Pass search query and filters to parent component
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for books..."
          className="search-input"
        />
        <select name="genre" onChange={handleFilterChange} className="search-filter">
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Adventure">Adventure</option>
          <option value="Historical Fiction">Historical Fiction</option>
        </select>
        <select name="availability" onChange={handleFilterChange} className="search-filter">
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location"
          className="search-filter"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default Search;
