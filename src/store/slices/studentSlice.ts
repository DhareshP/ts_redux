import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchStudentsByClassId } from '../../services/studentApi'; // ✅ Import API function

// Define the student state
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

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (classId: string) => {
    return await fetchStudentsByClassId(classId); // ✅ Uses API function
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudentsForClass: (state, action: PayloadAction<any[]>) => {
      state.students = action.payload;
    },
  },
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

// Export the actions and reducer
export const { setStudentsForClass } = studentSlice.actions;
export default studentSlice.reducer;
