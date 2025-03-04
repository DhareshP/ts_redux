import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setSelectedClass } from '../../store/slices/classSlice';
import { setStudentsForClass } from '../../store/slices/studentSlice';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { 
  Box, Typography, Paper, FormControl, Select, MenuItem, Divider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow 
} from '@mui/material';

const StudentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { classes, selectedClassId } = useSelector((state: RootState) => state.classes);
  const { students } = useSelector((state: RootState) => state.students);

  const handleClassChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const classId = e.target.value as string;
    dispatch(setSelectedClass(classId));
    dispatch(setStudentsForClass(classId));  // Filter students for the selected class
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box flexGrow={1} p={3} bgcolor="#f5f5f5" display="flex" justifyContent="center">
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1000, backgroundColor: 'white', display: 'flex' }}>
          
          {/* Left Side - Class Dropdown */}
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
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Right Side - Class Details and Students */}
          <Box sx={{ flex: 1, p: 2 }}>
            {/* Class Details */}
            {selectedClassId && (
              <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h6">Class Details</Typography>
                <Typography>Class ID: {selectedClassId}</Typography>
                <Typography>Number of Students: {students.length}</Typography>
              </Paper>
            )}

            {/* Students List */}
            <Typography variant="h6" gutterBottom>Students List</Typography>
            <Divider sx={{ mb: 2 }} />
            {students.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Roll Number</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
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

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default StudentPage;
