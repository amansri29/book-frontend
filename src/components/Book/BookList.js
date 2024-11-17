import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../services/bookService'; // Correct import from BookService
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);  // State to hold list of books
  const [loading, setLoading] = useState(true); // Loading state to show when books are being fetched
  const [error, setError] = useState(''); // Error state for handling API errors

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(); // Fetch books using the fetchBooks service method
        setBooks(data); // Set the books data to the state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError('There was an error fetching the books.');  // Set error message if the API call fails
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    loadBooks();  // Call the loadBooks function on component mount
  }, []);

  // Handle delete functionality
  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);  // Call deleteBook service method to delete the book
      // Update the local state to remove the deleted book
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      setError('There was an error deleting the book.');  // Show error if deletion fails
    }
  };

  return (
    <div className="book-list-container">
      <h2>My Book Listings</h2>
      {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}
      
      {loading ? (
        <p>Loading books...</p>  
      ) : (
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <div className="book-item" key={book.id}>
                <h3>Title: {book.title}</h3>
                <p><b>Author:</b> {book.author}</p>
                <p><b>Condition:</b> {book.condition}</p>
                <p><b>Location:</b> {book.location}</p>
                <p><b>Availability:</b> {book.availability ? 'Available' : 'Not Available'}</p>

                <div className="book-actions">
                  <Link to={`/books/update/${book.id}`} className="edit-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(book.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books available.</p>  
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
