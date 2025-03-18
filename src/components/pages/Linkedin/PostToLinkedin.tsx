import React, { useState } from 'react';
import axios from 'axios';

const PostToLinkedInPage: React.FC = () => {
    const [message, setMessage] = useState('');

    const handlePost = () => {
        const accessToken = localStorage.getItem('linkedin_access_token');
        if (accessToken) {
            axios.post('http://localhost:8080/api/linkedin/post', { message }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(() => alert('Posted successfully!'))
            .catch(err => console.error('Failed to post:', err));
        }
    };

    return (
        <div>
            <h1>Create LinkedIn Post</h1>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handlePost}>Post to LinkedIn</button>
        </div>
    );
};

export default PostToLinkedInPage;
