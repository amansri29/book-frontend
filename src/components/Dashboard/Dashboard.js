import React, { useEffect, useState } from 'react';
import { fetchDashboardBooks, requestExchange } from '../../services/bookService';
import './Dashboard.css';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    page: 1,  // Default page is 1
    page_size: 10,  // Items per page
  });
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    count: 0,
  });
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [exchangeDetails, setExchangeDetails] = useState({
    delivery_method: '',
    exchange_duration: '',
  });

  // Fetch books with pagination and search filters
  const fetchBooksFromApi = async (params = '') => {
    try {
      setLoading(true);
      const data = await fetchDashboardBooks(params);
      setBooks(data.results);
      setPagination({
        next: data.next,
        previous: data.previous,
        count: data.count,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  // Handle search form input
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams).toString();
    fetchBooksFromApi(query);
  };

  // Handle page change (pagination)
  const handlePageChange = (page) => {
    setSearchParams((prevState) => ({ ...prevState, page }));
    const query = new URLSearchParams({ ...searchParams, page }).toString();
    fetchBooksFromApi(query);
  };

  // Open exchange modal
  const openExchangeModal = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  // Close exchange modal
  const closeExchangeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
    setExchangeDetails({
      delivery_method: '',
      exchange_duration: '',
    });
  };

  // Handle exchange form input
  const handleExchangeChange = (e) => {
    const { name, value } = e.target;
    setExchangeDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // Submit exchange request
  const handleExchangeSubmit = async () => {
    try {
      const payload = {
        status: 'pending',
        book_id: selectedBook.id,
        receiver_id: selectedBook.user, // Assuming book.owner has user ID
        sender: 1,
        ...exchangeDetails,
      };
      const data = await requestExchange(payload);
      alert('Exchange request sent successfully!');
      closeExchangeModal();
    } catch (err) {
      alert(err.message || 'An error occurred while sending the exchange request.');
    }
  };

  useEffect(() => {
    fetchBooksFromApi();
  }, [searchParams.page]);

  return (
    <div className="dashboard-container">
      <h2>Book Exchange Dashboard</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          name="title"
          value={searchParams.title}
          onChange={handleSearchChange}
          placeholder="Search by Title"
        />
        <input
          type="text"
          name="author"
          value={searchParams.author}
          onChange={handleSearchChange}
          placeholder="Search by Author"
        />
        <input
          type="text"
          name="genre"
          value={searchParams.genre}
          onChange={handleSearchChange}
          placeholder="Search by Genre"
        />
        <input
          type="text"
          name="location"
          value={searchParams.location}
          onChange={handleSearchChange}
          placeholder="Search by Location"
        />
        <button type="submit">Search</button>
      </form>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Book Listings */}
      <div className="book-list">
        {loading ? (
          <p>Loading books...</p>
        ) : (
          books.map((book) => (
            <div className="book-item" key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Location: {book.location}</p>
              <p>Condition: {book.condition}</p>
              <p>Status: {book.availability ? 'Available' : 'Not Available'}</p>

              {/* Exchange Button */}
              {book.owner !== 'Current User' && ( // Replace with actual logic for current user check
                <button onClick={() => openExchangeModal(book)} className="exchange-btn">
                  Request Exchange
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {pagination.previous && (
          <button onClick={() => handlePageChange(searchParams.page - 1)}>Previous</button>
        )}
        {pagination.next && (
          <button onClick={() => handlePageChange(searchParams.page + 1)}>Next</button>
        )}
      </div>

      {/* Exchange Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Request Exchange for "{selectedBook?.title}"</h3>
            <label>
              Delivery Method:
              <input
                type="text"
                name="delivery_method"
                value={exchangeDetails.delivery_method}
                onChange={handleExchangeChange}
              />
            </label>
            <label>
              Exchange Duration (days):
              <input
                type="number"
                name="exchange_duration"
                value={exchangeDetails.exchange_duration}
                onChange={handleExchangeChange}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleExchangeSubmit} className="modal-submit">
                Submit Request
              </button>
              <button onClick={closeExchangeModal} className="modal-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
