import api from '../utils/apis';  // Import the api instance from utils/apis.js

// Function to fetch books with optional filters
export const fetchBooks = async (filters = {}) => {
  try {
    const response = await api.get('books/', {
      params: filters,  // Pass filters as query parameters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Function to add a new book to the user's list
export const addBook = async (bookData) => {
  try {
    const response = await api.post('books/create/', bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Function to get details of a specific book
export const getBookDetails = async (bookId) => {
  try {
    const response = await api.get(`books/${bookId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

// Function to update a book listing
export const updateBook = async (bookId, bookData) => {
  try {
    const response = await api.put(`books/${bookId}/update/`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Function to delete a specific book
export const deleteBook = async (bookId) => {
  try {
    await api.delete(`books/${bookId}/delete/`);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
