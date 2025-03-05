import axios from 'axios';

export const fetchAllClasses = async () => {
  const token = localStorage.getItem('token');  
  console.log('Fetching classes from API...');

  const response = await axios.get('https://stage.techeazyconsulting.com/dms/api/classes', {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('API Response:', response.data);
  return response.data;
};
