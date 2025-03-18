// This page displays the user’s LinkedIn profile data (name, id, etc.).
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Profile = {
    localizedFirstName: string;
    localizedLastName: string;
    id: string;
};

const LinkedInProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        //read from local storage
        const accessToken = localStorage.getItem('linkedin_access_token');

        //calls backend , also The backend will call LinkedIn’s profile API (/v2/me) using the access token.
        if (accessToken) {
            axios.get(`http://localhost:8080/api/linkedin/profile`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            //Stores the profile data in state, so it can be displayed on the page.
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => console.error('Failed to fetch LinkedIn profile:', err));
        }
    }, []);

    if (!profile) {
        return <div>Loading LinkedIn profile...</div>;
    }

    return (
        <div>
            <h1>Welcome, {profile.localizedFirstName} {profile.localizedLastName}</h1>
            <p>LinkedIn ID: {profile.id}</p>
        </div>
    );
};

export default LinkedInProfilePage;
