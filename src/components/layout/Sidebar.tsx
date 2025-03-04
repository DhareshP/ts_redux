import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isLoggedIn }) => {
  const navLinksNotLoggedIn = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  const navLinksLoggedIn = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Courses', path: '/courses' },
    { label: 'Bootcamps', path: '/bootcamps' },
  ];

  const linksToDisplay = isLoggedIn ? navLinksLoggedIn : navLinksNotLoggedIn;

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        <List>
          {linksToDisplay.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton component={Link} to={link.path} onClick={onClose}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
