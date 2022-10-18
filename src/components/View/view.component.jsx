import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../redux/student_asyncThunk/students.api.calls";
import { getOldUserData } from "../../redux/student_asyncThunk/students.slice";

import "./view.styles.css";


export const View = () => {
  const students = useSelector((state) => state.student.studentList);
  const dispatch = useDispatch();
  if (!students || students.length === 0) return null;
  const { id, name, username, email, address, phone } = students[0];
  const keys = { id, name, username, email, address, phone };
  const handleAddress = (ads) => {
    const { street, suite, city } = ads;
    return (ads = { street, suite, city });
  };
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(keys).map((k) => (
            <th key={k}>{k}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((user) => (
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
                  onClick={() => dispatch(deleteStudent(user.id))}
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
