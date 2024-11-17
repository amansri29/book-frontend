import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Dashboard/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import ResetPassword from './components/Auth/ResetPassword';
import ResetPasswordConfirm from './components/Auth/ResetPasswordConfirm';
import BookList from './components/Book/BookList';
import BookCreate from './components/Book/BookCreate';
import BookUpdate from './components/Book/BookUpdate';

const App = () => {
  const [username, setUsername] = React.useState('John Doe'); // Placeholder username, set dynamically later
  const [activePage, setActivePage] = React.useState('/dashboard'); // Current active page

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes (Unauthenticated) */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordConfirm />} />

        {/* Private Routes (Authenticated, require Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <div>
              <Sidebar username={username} activePage="/dashboard" onLogout={handleLogout} />
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/books"
          element={
            <div>
              <Sidebar username={username} activePage="/books" onLogout={handleLogout} />
              <BookList />
            </div>
          }
        />
        <Route
          path="/books/create"
          element={
            <div>
              <Sidebar username={username} activePage="/books/create" onLogout={handleLogout} />
              <BookCreate />
            </div>
          }
        />
        <Route
          path="/books/update/:id"
          element={
            <div>
              <Sidebar username={username} activePage="/books/update/:id" onLogout={handleLogout} />
              <BookUpdate />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
