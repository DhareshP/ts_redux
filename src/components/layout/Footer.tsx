import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', padding: '1rem', mt: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body2">
          1234 Learning St, Education City, Country
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
          <MuiLink href="https://facebook.com" color="inherit" target="_blank" rel="noopener">
            Facebook
          </MuiLink>
          <MuiLink href="https://twitter.com" color="inherit" target="_blank" rel="noopener">
            Twitter
          </MuiLink>
          <MuiLink href="https://linkedin.com" color="inherit" target="_blank" rel="noopener">
            LinkedIn
          </MuiLink>
        </Box>
        <Box sx={{ mt: 1 }}>
          <img src="/logo.png" alt="Company Logo" style={{ height: '40px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
