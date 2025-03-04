import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Dummy data for classes
const initialClasses = [
  { id: 'class1', className: 'Class 1' },
  { id: 'class2', className: 'Class 2' },
  { id: 'class3', className: 'Class 3' }
];

// The class slice manages:
// classes: List of all classes.
// selectedClassId: Currently selected class.
interface ClassState {
  classes: { id: string; className: string }[];
  selectedClassId: string | null;
}

// Initial state starts with the full class list and no selected class.
const initialState: ClassState = {
  classes: initialClasses,
  selectedClassId: null
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setSelectedClass(state, action: PayloadAction<string>) {
      state.selectedClassId = action.payload;
    }
  }
});

export const { setSelectedClass } = classSlice.actions;
export default classSlice.reducer;


// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { fetchAllClasses } from '../../services/classApi';

// interface ClassState {
//   classes: any[];   // Ideally type it properly
//   selectedClassId: string | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: ClassState = {
//   classes: [],
//   selectedClassId: null,
//   status: 'idle',
//   error: null,
// };

// // Fetch all classes
// export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
//   const data = await fetchAllClasses();
//   return data;
// });

// const classSlice = createSlice({
//   name: 'classes',
//   initialState,
//   reducers: {
//     setSelectedClass: (state, action: PayloadAction<string>) => {
//       state.selectedClassId = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchClasses.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.status = 'succeeded';
//         state.classes = action.payload;
//       })
//       .addCase(fetchClasses.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch classes';
//       });
//   },
// });

// export const { setSelectedClass } = classSlice.actions;
// export default classSlice.reducer;
