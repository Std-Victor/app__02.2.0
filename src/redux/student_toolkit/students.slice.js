import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    openModal: false,
    dataFetched: false,
    pending: false,
    error: false,
  },
  reducers: {
    apiCallStart: (state) => {
      state.pending = true;
    },
    apiCallError: (state) => {
      state.error = true;
      state.pending = false;
    },
    fetchStudentsSuccess: (state, action) => {
      state.pending = false;
      state.studentList = action.payload;
      state.lastUserId = action.payload.length + 1;
      state.dataFetched = true;
    },
    getOldUserData: (state, action) => {
      state.oldUser = action.payload;
      state.openModal = !state.openModal;
    },
    editStudentSuccess: (state, action) => {
      state.pending = false;
      state.studentList = state.studentList.map((std) =>
        std.id === action.payload.id ? action.payload : std
      );
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    toggleModal: (state) => {
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    search: (state, action) => {
      state.studentList = action.payload;
    },
    addStudentSuccess: (state, action) => {
      state.pending = false;
      state.studentList = [...state.studentList, action.payload];
      state.lastUserId = state.lastUserId + 1;
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    deleteStudentSuccess: (state, action) => {
      state.studentList = state.studentList.filter(
        (std) => std.id !== action.payload
      );
    },
  },
});

export const {
  apiCallStart,
  apiCallError,
  fetchStudentsSuccess,
  getOldUserData,
  editStudentSuccess,
  toggleModal,
  search,
  addStudentSuccess,
  deleteStudentSuccess,
} = studentSlice.actions;

export default studentSlice.reducer;
