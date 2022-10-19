import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../redux/student_asyncThunk/students.api.calls";
import {
  getOldUserData,
  setNull,
} from "../../redux/student_asyncThunk/students.slice";

import "./view.styles.css";

export const View = () => {
  const { studentList: students, pending } = useSelector(
    (state) => state.student
  );
  const dispatch = useDispatch();
  const handleAddress = (ads) => {
    const { street, suite, city } = ads;
    return (ads = { street, suite, city });
  };
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>usename</th>
          <th>email</th>
          <th>address</th>
          <th>phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {pending
          ? Array(10).fill('').map((item, index) => <tr key={index}>
          <td colSpan={7}>
            <div className="skeleton"></div>
          </td>
        </tr>)
          : students.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {Object.entries(handleAddress(user.address)).map(([k, v]) => (
                    <span className="address--field" key={k}>
                      {v}
                    </span>
                  ))}
                </td>
                <td>{user.phone}</td>
                <td>
                  <div className="action__btn">
                    <button
                      className="btn__edit"
                      onClick={() => dispatch(getOldUserData(user))}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="btn__remove"
                      onClick={() => {
                        dispatch(deleteStudent(user.id));
                        setTimeout(() => dispatch(setNull()), "3500");
                      }}
                    >
                      <i className="fa-solid fa-eraser"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
