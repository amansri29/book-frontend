import React, { useState } from 'react';
import { AuthContainer, AuthForm, AuthInput, AuthButton, Logo, ProjectName } from './AuthStyles';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // For redirection after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Redirect after login

  // Handle input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error before submitting
    setError('');

    // Make the API request to Django backend
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token (or user info)
        localStorage.setItem('token', data.token); // Save token in local storage
        navigate('/dashboard'); // Redirect to dashboard or another page after login
      } else {
        // If there is an error, show the error message
        setError(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <AuthContainer>
      <Logo src={logo} alt="Book Exchange Logo" />
      <ProjectName>Book Exchange Platform</ProjectName>
      <h2>Login</h2>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <AuthButton type="submit">Log In</AuthButton>
      </AuthForm>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      <p>
        Forgot your password? <a href="/reset-password">Reset Password</a>
      </p>
    </AuthContainer>
  );
};

export default Login;
