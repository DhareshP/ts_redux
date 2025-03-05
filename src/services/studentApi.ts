import axios from 'axios';

// Function to fetch students by class ID, including Authorization header
export const fetchStudentsByClassId = async (classId: string) => {
  const token = localStorage.getItem('token');  // Get token from localStorage

  const response = await axios.get(`https://stage.techeazyconsulting.com/dms/api/student/class/${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Add token to headers
    },
  });

  return response.data;
};
