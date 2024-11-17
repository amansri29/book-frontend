import api from '../utils/apis';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await api.post('auth/register/', userData);
        return response.data; // Return the response data (e.g., token)
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error during registration');
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('auth/login/', credentials);
        return response.data; // Return the token
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error during login');
    }
};

// Password Reset
export const resetPassword = async (email) => {
    try {
        const response = await api.post('auth/password-reset/', { email });
        return response.data; // Return success message
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error sending password reset email');
    }
};


// Reset Password with Token
export const resetPasswordConfirm = async (token, data) => {
    try {
        const response = await api.post(`auth/password-reset/confirm/${token}/`, data);
        return response.data;  // Return success message
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Error during password reset');
    }
};