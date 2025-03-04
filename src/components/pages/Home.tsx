import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container sx={{ flexGrow: 1, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1">
          This is your home page after logging in. You can explore courses, bootcamps, certificates, and more.
        </Typography>
      </Container>

      <Footer />
    </Box>
  );
};

export default HomePage;
