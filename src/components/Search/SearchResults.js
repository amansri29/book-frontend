// src/components/Search/SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ books }) => {
  return (
    <div className="search-results">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.condition}</p>
            <p>{book.availability ? 'Available' : 'Not Available'}</p>
            <p><strong>Location: </strong>{book.location}</p>
            <Link to={`/book/${book.id}`} className="view-details">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
