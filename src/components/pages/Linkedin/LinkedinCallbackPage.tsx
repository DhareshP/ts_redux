import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LinkedInCallbackPage: React.FC = () => {
    //reads the code from the URL query string (code and state) and sends it to the server to authenticate the user
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');

        //exchanegs code for access_token
        if (code) {
            axios.post('http://localhost:8080/api/linkedin/authenticate', { code })
                .then(response => {
                    const accessToken = response.data.access_token;
                    localStorage.setItem('linkedin_access_token', accessToken);
                    navigate('/linkedin/profile');  // Redirect to profile page after successful login
                })
                .catch(err => {
                    console.error('Failed to authenticate:', err);
                    navigate('/login');  // Fallback to login if error happens
                });
        }
    }, [searchParams, navigate]);

    return <div>Authenticating with LinkedIn...</div>;
};

export default LinkedInCallbackPage;
