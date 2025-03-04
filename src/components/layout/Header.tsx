import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)!;

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {/* Public Link always visible */}
          <Button color="inherit" component={Link} to="/">Home</Button>

          {/* Links only visible after authentication */}
          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/home">Dashboard</Button>
              <Button color="inherit" component={Link} to="/students">Students</Button>
            </>
          )}
        </Box>

        {/* Auth buttons - show logout if authenticated, otherwise show login/signup */}
        {isAuthenticated ? (
          <Button color="inherit" onClick={logout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
