import axios from 'axios';

// Function to fetch students by class ID, including Authorization header
export const fetchStudentsByClassId = async (classId: string) => {
  const token = localStorage.getItem('token');  // Get token from localStorage

  const response = await axios.get(`http://localhost:8080/dms/api/students?classId=${classId}`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Add token to headers
    },
  });

  return response.data;
};
