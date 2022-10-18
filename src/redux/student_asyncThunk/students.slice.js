import { createSlice } from "@reduxjs/toolkit";

import {
  fetchStudentsData,
  updateStudent,
  deleteStudent,
  addStudent,
} from "./students.api.calls";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    openModal: false,
    dataFetched: false,
    pending: false,
    error: false,
  },
  reducers: {
    getOldUserData: (state, action) => {
      state.oldUser = action.payload;
      state.openModal = !state.openModal;
    },
    toggleModal: (state) => {
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    search: (state, action) => {
      state.studentList = action.payload;
    },
  },
  extraReducers: {
    // FETCH DATA FROM API
    [fetchStudentsData.pending]: (state) => {
      state.pending = true;
    },
    [fetchStudentsData.fulfilled]: (state, action) => {
      state.pending = false;
      state.studentList = action.payload;
      state.lastUserId = action.payload.length + 1;
      state.dataFetched = true;
    },
    [fetchStudentsData.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },

    // ADD STUDENT TO THE LIST OF API
    [addStudent.pending]: (state) => {
      state.pending = true;
    },
    [addStudent.fulfilled]: (state, action) => {
      state.pending = false;
      state.studentList = [...state.studentList, action.payload];
      state.lastUserId = state.lastUserId + 1;
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    [addStudent.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },

    // UPDATE THE STUDENT IN THE API
    [updateStudent.pending]: (state) => {
      state.pending = true;
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.pending = false;
      state.studentList = state.studentList.map((std) =>
        std.id === action.payload.id ? action.payload : std
      );
      state.openModal = !state.openModal;
      state.oldUser = null;
    },
    [updateStudent.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },

    // REMOVE THE STUDENT FROM THE API
    [deleteStudent.pending]: (state) => {
      state.pending = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.studentList = state.studentList.filter(
        (std) => std.id !== action.payload
      );
    },
    [deleteStudent.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const { getOldUserData, toggleModal, search } = studentSlice.actions;

export default studentSlice.reducer;
