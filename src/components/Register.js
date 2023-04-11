import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Outlet } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const newUserRef = useRef(null);
  const [idExist, setIdExist] = useState("");
  const [newUserValue, setNewUserValue] = useState("");
  const [newUserNameValue, setNewUserNameValue] = useState("");
  const [newUserAgeValue, setNewUserAgeValue] = useState("");
  const [newUserEmailValue, setNewUserEmailValue] = useState("");
  const [newUserPhoneNoValue, setNewUserPhoneNoValue] = useState("");
  const [newUserPasswordValue,setNewUserPasswordValue] = useState("");

  const newUserIdHandler = async (e) => {
    const value = e.target.value;
    setNewUserValue(value);
    if (value === "") {
      setIdExist("");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/users/${value}`);
      if (res.ok) {
        setIdExist("username already exist");
        newUserRef.current.setAttribute("disabled", "");
      } else {
        setIdExist("username can be used");
        newUserRef.current.removeAttribute("disabled");
      }
    } catch {}
  };
  return (
    <div className="formContainer">
      <Form method="post" id="idForm" >
          <div className="formElement ">
            <label className="fw" htmlFor="newUserId">
              Register
            </label>
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="text"
              placeholder="username"
              autoComplete="off"
              name="newUserId"
              id="newUserId"
              value={newUserValue}
              onChange={newUserIdHandler}
              required
            />
          </div>
          <span className="idExist">{idExist}.</span>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="password"
              placeholder="password"
              autoComplete="off"
              name="newUserPassword"
              id="newUserPassword"
              value={newUserPasswordValue}
              onChange = {(e)=>setNewUserPasswordValue(e.target.value)}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="text"
              pattern="[a-z]{1,12}"
              placeholder="name"
              autoComplete="off"
              name="newUserName"
              id="newUserName"
              value={newUserNameValue}
              onChange={(e) => {
                setNewUserNameValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="number"
              placeholder="age"
              autoComplete="off"
              name="newUserAge"
              id="newUserAge"
              value={newUserAgeValue}
              onChange={(e) => {
                setNewUserAgeValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="email"
              placeholder="email"
              autoComplete="off"
              name="newUserEmail"
              id="newUserEmail"
              value={newUserEmailValue}
              onChange={(e) => {
                setNewUserEmailValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
            {" "}
            <input
              className="fw"
              type="tell"
              placeholder="phone no"
              autoComplete="off"
              name="newUserPhoneNo"
              id="newUserPhoneNo"
              value={newUserPhoneNoValue}
              onChange={(e) => {
                setNewUserPhoneNoValue(e.target.value);
              }}
              required
            />
          </div>
          <div className="formElement ">
          <button  className="fw submit" type="submit">
            <a >
              <span>Register</span>
              <div className="liquid"></div>
            </a>
            </button>
          </div>
        </Form>
    </div>
  )
}

export default Register
