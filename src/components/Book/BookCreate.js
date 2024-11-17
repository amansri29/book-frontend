import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apis'; // Utility for API calls
import './BookCreate.css';

const BookCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: 'new', // Keeping condition as part of form data
    availability_status: true,
    location: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('books/create/', formData);
      console.log('Book created successfully:', response.data);
      navigate('/books'); // Redirect to book listings page after successful creation
    } catch (error) {
      setError('There was an error creating the book. Please try again.');
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="book-create-container">
      <h2>Create a New Book Listing</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
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
            value={formData.author} 
            onChange={handleChange} 
            required 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input 
            type="text" 
            id="genre" 
            name="genre" 
            value={formData.genre} 
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
            value={formData.condition} 
            onChange={handleChange} 
            required
            className="form-control"
          >
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="availability_status">Availability Status</label>
          <select
            id="availability_status"
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="submit-btn">Create Book</button>
      </form>
    </div>
  );
};

export default BookCreate;
