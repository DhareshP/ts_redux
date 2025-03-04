// createSlice: A utility from Redux Toolkit to easily create state slices.
// PayloadAction: A type used to define the shape of action payloads.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Dummy student data - each student is tied to a classId
const allStudents = [
  { id: '1', name: 'John Doe', rollNumber: '101', classId: 'class1' },
  { id: '2', name: 'Jane Smith', rollNumber: '102', classId: 'class1' },
  { id: '3', name: 'Alice Johnson', rollNumber: '201', classId: 'class2' },
  { id: '4', name: 'Bob Brown', rollNumber: '202', classId: 'class2' },
  { id: '5', name: 'Charlie Black', rollNumber: '301', classId: 'class3' }
];

//ts type of student object
interface Student {
  id: string;
  name: string;
  rollNumber: string;
  classId: string;
}

//  defines the shape of the student slice's state.
// students will hold a list of students.
interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: []
};

// name: Slice name.
// initialState: Initial state.
// reducers: Functions to update the state.
// Reducer Explained:
// setStudentsForClass:
// Takes a class ID (string) as the payload.
// Filters allStudents and sets students to only those in the given class.
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudentsForClass(state, action: PayloadAction<string>) {
      // Filter students for selected class using slice (slice here means array slicing, not redux slice name)
      state.students = allStudents.filter(student => student.classId === action.payload);
    }
  }
});

// setStudentsForClass: Action creator to trigger the reducer.
// reducer: Default export, will be added to the Redux store.
export const { setStudentsForClass } = studentSlice.actions;
export default studentSlice.reducer;


// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { fetchStudentsByClassId } from '../../services/studentApi';

// interface StudentState {
//   students: any[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: StudentState = {
//   students: [],
//   status: 'idle',
//   error: null,
// };

// // Fetch students for selected class
// export const fetchStudents = createAsyncThunk('students/fetchStudents', async (classId: string) => {
//   const data = await fetchStudentsByClassId(classId);
//   return data;
// });

// const studentSlice = createSlice({
//   name: 'students',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStudents.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.status = 'succeeded';
//         state.students = action.payload;
//       })
//       .addCase(fetchStudents.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch students';
//       });
//   },
// });

// export default studentSlice.reducer;
