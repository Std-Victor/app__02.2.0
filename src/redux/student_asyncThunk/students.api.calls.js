import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudentsData = createAsyncThunk("student/fetch", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const addStudent = createAsyncThunk(
  "student/add",
  async (studentData) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      { studentData }
    );
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  "student/update",
  async (studentData) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${studentData.id}`,
      { ...studentData }
    );
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (studentId) => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${studentId}`
    );
    return studentId;
  }
);
