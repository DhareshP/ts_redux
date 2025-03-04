import React, { useContext, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import Header from '../layout/Header';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null); // Clear old errors

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData = await response.json();
      console.log('Login response:', responseData); // Debug log to inspect structure

      const token = responseData?.data?.jwtToken;
      if (!token) {
        throw new Error('Token not found in response');
      }

      // Store token in localStorage (correct key name and value)
      localStorage.setItem('token', token);

      // Set auth context (assuming your context stores "isAuthenticated" and token if needed)
      login(token);

      // Redirect to home
      navigate('/home');
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message);
    }
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Button
            variant="text"
            onClick={() => navigate('/signup')}
            fullWidth
            sx={{ mt: 1 }}
          >
            Don't have an account? Sign Up
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
