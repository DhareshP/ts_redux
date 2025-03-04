import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchStudentsByClassId } from '../../services/studentApi';

interface StudentState {
  students: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  status: 'idle',
  error: null,
};

// Fetch students for selected class
export const fetchStudents = createAsyncThunk('students/fetchStudents', async (classId: string) => {
  const data = await fetchStudentsByClassId(classId);
  return data;
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch students';
      });
  },
});

export default studentSlice.reducer;
