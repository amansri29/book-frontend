import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { registerUser } from '../../services/authService'; // API logic import
import { AuthContainer, AuthForm, AuthInput, AuthButton, Logo, ProjectName } from './AuthStyles';
import logo from '../../assets/logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Updated to useNavigate

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);  // Call the API service
            localStorage.setItem('token', response.token); // Save the token in localStorage
            navigate('/dashboard'); // Updated to use navigate for redirection
        } catch (err) {
            setError('Registration failed, please try again.');
        }
    };

    return (
        <AuthContainer>
            <Logo src={logo} alt="Book Exchange Logo" />
            <ProjectName>Book Exchange Platform</ProjectName>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <AuthForm onSubmit={handleSubmit}>
                <AuthInput
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <AuthInput
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <AuthInput
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <AuthInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <AuthInput
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <AuthButton type="submit">Register</AuthButton>
            </AuthForm>
            <p>
                Already have an account? <a href="/">Log In</a>
            </p>
        </AuthContainer>
    );
};

export default Register;
