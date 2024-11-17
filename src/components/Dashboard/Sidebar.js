import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaHome, FaPlus, FaList, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // Import the CSS for styling

const Sidebar = ({ username, activePage, onLogout }) => {
  return (
    <div className="sidebar">
      <Navbar bg="primary" variant="dark" expand="lg" className="flex-column p-3">
        <Navbar.Brand href="#">Book Exchange</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Item>
            <Link
              to="/dashboard"
              className={`nav-link ${activePage === '/dashboard' ? 'active' : ''}`}
            >
              <FaHome /> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/books/create"
              className={`nav-link ${activePage === '/books/create' ? 'active' : ''}`}
            >
              <FaPlus /> Add Book
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/books"
              className={`nav-link ${activePage === '/books' ? 'active' : ''}`}
            >
              <FaList /> My Listings
            </Link>
          </Nav.Item>
        </Nav>
        <Button variant="danger" onClick={onLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </Button>
        <div className="username">Welcome, {username}</div>
      </Navbar>
    </div>
  );
};

export default Sidebar;
