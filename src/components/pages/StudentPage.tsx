import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchClasses, setSelectedClass } from '../../store/slices/classSlice';
import { fetchStudents } from '../../store/slices/studentSlice';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Box, Typography, Paper, FormControl, Select, MenuItem, CircularProgress, Divider } from '@mui/material';

const StudentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { classes, selectedClassId, status: classStatus } = useSelector((state: RootState) => state.classes);
  const { students, status: studentStatus } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedClassId) {
      dispatch(fetchStudents(selectedClassId));
    }
  }, [selectedClassId, dispatch]);

  const handleClassChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const classId = e.target.value as string;
    dispatch(setSelectedClass(classId));
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box flexGrow={1} p={3} bgcolor="#f5f5f5">
        <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: '0 auto', backgroundColor: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Student Management
          </Typography>

          {/* Class Dropdown */}
          <Box my={2}>
            <Typography variant="subtitle1">Select Class:</Typography>
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

          {/* Class Details */}
          {selectedClassId && (
            <Box my={3} p={2} bgcolor="#f0f0f0" borderRadius="8px">
              <Typography variant="h6">Class Details</Typography>
              <Typography>Class ID: {selectedClassId}</Typography>
              {/* Add more class details here if needed */}
            </Box>
          )}

          {/* Divider */}
          <Divider sx={{ my: 2 }} />

          {/* Students List */}
          <Box>
            <Typography variant="h5">Students</Typography>
            {studentStatus === 'loading' && <CircularProgress />}
            {studentStatus === 'succeeded' && students.length > 0 ? (
              students.map((student) => (
                <Paper
                  key={student.id}
                  sx={{ p: 2, my: 1, backgroundColor: '#fafafa' }}
                >
                  <Typography>{student.name} ({student.rollNumber})</Typography>
                </Paper>
              ))
            ) : studentStatus === 'succeeded' && students.length === 0 ? (
              <Typography>No students found for this class.</Typography>
            ) : studentStatus === 'failed' ? (
              <Typography color="error">Failed to load students.</Typography>
            ) : null}
          </Box>
        </Paper>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default StudentPage;
