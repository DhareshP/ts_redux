import React, { useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { AuthContext } from '../../auth/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container sx={{ flexGrow: 1, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>


        {!isAuthenticated && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Please <a href="/login">login</a> or <a href="/signup">signup</a> to access the full platform.
          </Typography>
        )}

        {isAuthenticated && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Explore your <a href="/home">dashboard</a> or check out <a href="/courses">courses</a>.
          </Typography>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default LandingPage;
