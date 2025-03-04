import axios from 'axios';

export const fetchAllClasses = async () => {
  const token = localStorage.getItem('token');  // Get token from localStorage
  const response = await axios.get('http://localhost:8080/dms/api/classes', {
    headers: {
      Authorization: `Bearer ${token}`,  // Add token to headers
    },
  });

  return response.data;
};
