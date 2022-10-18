import axios from "axios";

import {
  apiCallStart,
  apiCallError,
  fetchStudentsSuccess,
  editStudentSuccess,
  addStudentSuccess,
  deleteStudentSuccess,
} from "./students.slice";

export const fetchStudentsData = async (dispatch) => {
  dispatch(apiCallStart());

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch(fetchStudentsSuccess(response.data));
  } catch (error) {
    dispatch(apiCallError());
  }
};

export const addStudent = async (dispatch, studentData) => {
  dispatch(apiCallStart());

  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      { studentData }
    );
    dispatch(addStudentSuccess(response.data.studentData));
  } catch (error) {
    dispatch(apiCallError());
  }
};

export const updateStudent = async (dispatch, studentData) => {
  dispatch(apiCallStart());

  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${studentData.id}`,
      { ...studentData }
    );
    dispatch(editStudentSuccess(response.data))
  } catch (error) {
    dispatch(apiCallError());
  }
};

export const deleteStudent = async (dispatch, studentId) => {
  dispatch(apiCallStart());

  try {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${studentId}`
    );
    dispatch(deleteStudentSuccess(studentId))
  } catch (error) {
    dispatch(apiCallError());
  }
};
