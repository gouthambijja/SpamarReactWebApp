import React from "react";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  return (
    <div className="formContainer">
      <Form method="post" id={"enterForm"}>
        <div className="formElement ">
          <label className="fw " htmlFor="userId">
            <h3>Please Login</h3>
          </label>
        </div>
        <div className="formElement ">
          {" "}
          <input
            type="text"
            className="fw"
            autoComplete="off"
            name="userId"
            placeholder="username"
            id="userId"
            required
          />
        </div>
        <div className="formElement ">
          {" "}
          <input
            type="password"
            className="fw"
            autoComplete="off"
            name="password"
            placeholder="password"
            id="password"
            required
          />
        </div>
        <div className="formElement">
          <div className="submitContainer">
            <button className="fw submit" type="submit">
              <a>
                <span>Login</span>
                <div className="liquid"></div>
              </a>
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
