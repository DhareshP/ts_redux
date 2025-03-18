import React, { useState } from 'react';
import axios from 'axios';

const LinkedInSearchPage: React.FC = () => {
    const [profileUrl, setProfileUrl] = useState('');
    const [profileData, setProfileData] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = () => {
        setError('');
        setProfileData(null);

        axios.post('http://localhost:8080/api/linkedin/search', { profileUrl })
            .then(response => setProfileData(response.data))
            .catch(err => setError('Failed to fetch profile. Make sure the URL is correct.'));
    };

    return (
        <div>
            <h1>Search LinkedIn Profile</h1>
            <input
                type="text"
                placeholder="Paste LinkedIn Profile URL"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                style={{ width: '400px', marginRight: '10px' }}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {profileData && (
                <div>
                    <h2>{profileData.name}</h2>
                    <p>{profileData.headline}</p>
                    {/* Add more fields if available */}
                </div>
            )}
        </div>
    );
};

export default LinkedInSearchPage;
