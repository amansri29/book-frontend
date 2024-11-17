import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContainer, AuthForm, AuthInput, AuthButton, Logo, ProjectName } from './AuthStyles';
import logo from '../../assets/logo.png';
import { resetPasswordConfirm } from '../../services/authService';  // Assuming you have this API service function

const ResetPasswordConfirm = () => {
  const { token } = useParams();  // Capture the token from the URL
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // To redirect user after successful password reset

  // Handle password change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success before submitting
    setError('');
    setSuccess('');

    // Make the API request using the service function to reset password
    try {
      await resetPasswordConfirm(token, { password });
      setSuccess('Your password has been reset successfully.');
      
      // redirect to login page after success
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error.message); // Display error message
    }
  };

  return (
    <AuthContainer>
      <Logo src={logo} alt="Book Exchange Logo" />
      <ProjectName>Book Exchange Platform</ProjectName>
      <h2>Reset Your Password</h2>
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          type="password"
          placeholder="Enter your new password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <AuthButton type="submit">Reset Password</AuthButton>
      </AuthForm>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </AuthContainer>
  );
};

export default ResetPasswordConfirm;
