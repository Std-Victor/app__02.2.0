import React from "react";
import { useSelector } from "react-redux";
import style from "./snackBar.module.css";

export const SnackBar = () => {
  const { pending, response } = useSelector((state) => state.student);
  return (
    <div
      className={style.container}
      style={{
        backgroundColor: pending ? "#ccc" : response ? "#00ad34" : "red",
        color: pending ? "black" : response ? "black" : "white",
      }}
      id={response ? style.show : style.hidden}
    >
      <div className={style.symbol}>
        {pending ? "" : response ? <h1>&#x2714;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className={style.message}>
        {pending
          ? "Sending the request"
          : response
          ? "The request has been fulfilled!"
          : "The request has been rejected"}
      </div>
    </div>
  );
};
