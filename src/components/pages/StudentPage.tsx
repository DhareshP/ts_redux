import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchClasses, setSelectedClass } from '../../store/slices/classSlice';
import { fetchStudents } from '../../store/slices/studentSlice';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { 
  Box, Typography, Paper, FormControl, Select, MenuItem, Divider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';

const StudentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { classes, selectedClassId, status, error } = useSelector((state: RootState) => state.classes);
  const { students } = useSelector((state: RootState) => state.students);

  // ✅ Fetch classes when the component mounts
  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  // ✅ Handle class selection and fetch students
  const handleClassChange = (e: any) => {
    const classId = e.target.value;
    dispatch(setSelectedClass(classId));
    dispatch(fetchStudents(classId)); // ✅ Fetch students when class is selected
  };

  if (status === 'loading') return <p>Loading classes...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* ✅ Header */}
      <Header />

      {/* ✅ Main Content */}
      <Box flexGrow={1} p={3} bgcolor="#f5f5f5" display="flex" justifyContent="center">
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1000, backgroundColor: 'white', display: 'flex' }}>
          
          {/* ✅ Left Side - Class Dropdown */}
          <Box sx={{ width: '250px', p: 2, borderRight: '1px solid #ddd' }}>
            <Typography variant="h6" gutterBottom>Select Class</Typography>
            <FormControl fullWidth>
              <Select
                value={selectedClassId || ''}
                onChange={handleClassChange}
                displayEmpty
              >
                <MenuItem value="">-- Select Class --</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.classId}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* ✅ Right Side - Class Details and Students */}
          <Box sx={{ flex: 1, p: 2 }}>
            {/* ✅ Show selected class name */}
            {selectedClassId && (
              <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h6">Class Details</Typography>
                <Typography>Class Name: {classes.find(cls => cls.classId === selectedClassId)?.className || 'N/A'}</Typography>
                <Typography>Number of Students: {students.length}</Typography>
              </Paper>
            )}

            {/* ✅ Students List */}
            <Typography variant="h6" gutterBottom>Students List</Typography>
            <Divider sx={{ mb: 2 }} />
            {students.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Roll Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Ph Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.studentName}</TableCell>
                        <TableCell>{student.contactNumber}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No students found for this class.</Typography>
            )}
          </Box>

        </Paper>
      </Box>

      {/* ✅ Footer */}
      <Footer />
    </Box>
  );
};

export default StudentPage;
