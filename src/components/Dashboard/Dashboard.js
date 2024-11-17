// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import Sidebar from '../Dashboard/Sidebar';
import Search from '../Search/Search';
import SearchResults from '../Search/SearchResults';
import './Dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6); // Display 6 books per page
  const [username, setUsername] = useState('John Doe'); // Placeholder username
  const location = useLocation(); // Get current route

  useEffect(() => {
    // Dummy data for books
    const fetchBooks = () => {
      const allBooks = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', condition: 'New', availability: true, location: 'New York' },
        { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', condition: 'Used', availability: false, location: 'London' },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', condition: 'Good', availability: true, location: 'Alabama' },
        { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', condition: 'Used', availability: true, location: 'California' },
        { id: 5, title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', condition: 'New', availability: false, location: 'Chicago' },
        { id: 6, title: 'Moby-Dick', author: 'Herman Melville', genre: 'Adventure', condition: 'Good', availability: true, location: 'Massachusetts' },
        { id: 7, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', condition: 'New', availability: true, location: 'London' },
        { id: 8, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical Fiction', condition: 'Used', availability: true, location: 'Russia' },
        { id: 9, title: 'The Odyssey', author: 'Homer', genre: 'Epic', condition: 'Used', availability: true, location: 'Greece' },
        { id: 10, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', condition: 'New', availability: false, location: 'England' },
        { id: 11, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', condition: 'Used', availability: true, location: 'Middle-Earth' },
        { id: 12, title: 'The Shining', author: 'Stephen King', genre: 'Horror', condition: 'New', availability: true, location: 'Colorado' },
      ];
      setBooks(allBooks);
      setFilteredBooks(allBooks); // Show all books by default
    };

    fetchBooks();
  }, []);

  // Handle filtering and pagination
  const handleSearch = (searchQuery, filters) => {
    let filtered = books.filter((book) => 
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.genre ? book.genre === filters.genre : true) &&
      (filters.availability ? book.availability === JSON.parse(filters.availability) : true) &&
      (filters.location ? book.location.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);



  return (
    <div className="dashboard-container">
      
      
      <div className="dashboard-content">
        <h2>Explore Books</h2>
        <Search onSearch={handleSearch} />

        <SearchResults books={currentBooks} />
        
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
