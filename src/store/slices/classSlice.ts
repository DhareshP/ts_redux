import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllClasses } from '../../services/classApi'; // ✅ Import API function

// Define state interface
interface ClassState {
  classes: any[];
  selectedClassId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ClassState = {
  classes: [],
  selectedClassId: null,
  status: 'idle',
  error: null,
};

// ✅ Async thunk to fetch classes from API
export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await fetchAllClasses();
  return response; // Ensure response is returned correctly
});

// Create slice
const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setSelectedClass: (state, action: PayloadAction<string>) => {
      state.selectedClassId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = 'succeeded';
        state.classes = action.payload; // ✅ Store fetched classes
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch classes';
      });
  },
});

// ✅ Export actions and reducer
export const { setSelectedClass } = classSlice.actions;
export default classSlice.reducer;
