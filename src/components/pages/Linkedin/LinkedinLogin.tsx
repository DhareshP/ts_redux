import React from "react";

const LinkedInLoginButton: React.FC = () => {
    const CLIENT_ID = "YOUR_CLIENT_ID";
    const REDIRECT_URI = "http://localhost:3000/linkedin/callback";  // React URL to handle the callback
    const STATE = "randomStateString123";  // You should generate a secure random string

    const linkedInLoginUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=r_liteprofile%20r_emailaddress%20w_member_social&state=${STATE}`;

    const handleLogin = () => {
        window.location.href = linkedInLoginUrl;
    };

    return (
        <button onClick={handleLogin}>Login with LinkedIn</button>
    );
};

export default LinkedInLoginButton;
