import React, { useState } from 'react';
import { AuthContainer, AuthForm, AuthInput, AuthButton, Logo, ProjectName } from './AuthStyles';
import logo from '../../assets/logo.png';
import { resetPassword } from '../../services/authService'; // Import the service

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  // Handle input change for email
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success before submitting
    setError('');
    setSuccess('');

    // Make the API request using the service function
    try {
      await resetPassword(email);
      setSuccess('A password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error during password reset:', error);
      setError(error.message); // Display error message
    }
  };

  return (
    <AuthContainer>
      <Logo src={logo} alt="Book Exchange Logo" />
      <ProjectName>Book Exchange Platform</ProjectName>
      <h2>Reset Password</h2>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <AuthButton type="submit">Send Reset Link</AuthButton>
      </AuthForm>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Remembered your password? <a href="/">Log In</a>
      </p>
    </AuthContainer>
  );
};

export default ResetPassword;
