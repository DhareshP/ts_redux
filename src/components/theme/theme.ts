import {createTheme} from '@mui/material/styles';

export const getThemeForRoles = (roles: string[] = []) => {
    let primaryColor = '#1976d2'; //deault blue for user

    if (roles.includes ('ADMIN') || roles.includes ('TCHEAZY_ADMIN')) {
        primaryColor = '#f57c00'; //orange for admin
    }

    else if (roles.includes ('TEACHER')) {
        primaryColor = '#4caf50'; //green for teacher   
    }

    else if (roles.includes ('STUDENT')) {
        primaryColor = '#3f51b5'; //deep orange for student
    }

    return createTheme({

    palette: {
        primary: {
            main: primaryColor,
        },
        secondary:{
            main:'#f50057',
        },
    },
    });
};