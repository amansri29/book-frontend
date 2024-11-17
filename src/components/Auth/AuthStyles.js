import styled from 'styled-components';

export const AuthContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

export const ProjectName = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
  font-family: 'Arial', sans-serif;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AuthInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const AuthButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
