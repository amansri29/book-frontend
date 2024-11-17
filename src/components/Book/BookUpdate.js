import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook, getBookDetails } from '../../services/bookService';  // Import service functions
import './BookUpdate.css';

const BookUpdate = () => {
  const { id } = useParams();  // Get book ID from URL parameters
  const navigate = useNavigate();  // Use navigate to redirect after update
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    condition: 'new',
    location: '',
    availability_status: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch book details by ID
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookDetails(id);  // Fetch book details using service
        setBookData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching book details.');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, bookData);  // Call updateBook service to update the book
      navigate('/books');  // Redirect to book list page after successful update
    } catch (err) {
      setError('Error updating the book.');
    }
  };

  return (
    <div className="book-update-container">
      <h2>Update Book</h2>
      {loading ? (
        <p>Loading book details...</p>  
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {/* Show error message */}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={bookData.condition}
              onChange={handleChange}
              className="form-control"
            >
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookData.location}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability_status">Availability</label>
            <select
              id="availability_status"
              name="availability_status"
              value={bookData.availability_status}
              onChange={handleChange}
              className="form-control"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Update Book</button>
        </form>
      )}
    </div>
  );
};

export default BookUpdate;
