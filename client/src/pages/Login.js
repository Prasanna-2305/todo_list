import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { userLogin } from "../redux/operations";

function LogIn() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });
  useEffect(() => {
    const user = getCookie("myEmail");
    const pswd = getCookie("myPassword");
    setValues({
      email: user,
      password: pswd,
    });
    document.cookie = "myEmail=; MaxAge=0; secure ;path=http://localhost:3000";
    document.cookie =
      "myPassword=; MaxAge=0; secure ; path=http://localhost:3000";
  }, []);

  const getCookie = (key) => {
    const name = key + "=";
    const arr = document.cookie.split("; ");

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      while (item.charAt(0) === " ") {
        return (item = item.substring(1));
      }
      if (item.indexOf(name) === 0) {
        return item.substring(name.length, item.length);
      }
    }
  };

  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validation = () => {
    const { email, password } = values;
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (!emailCheck) {
      setError({ emailErr: " Email is Required / Enter a valid Email" });
    } else if (password === "" || password.length <= 7) {
      setError({
        passwordErr: "Invalid password ",
      });
    } else {
      dispatch(userLogin(values));
      setError({ passwordErr: "" });
    }
  };
  const remember = () => {
    document.cookie =
      "myEmail=" + values.email + "; path=http://localhost:3000";
    document.cookie =
      "myPassword=" + values.password + "; path=http://localhost:3000";
  };

  return (
    <div className="container-fluid  background row  mx-0">
      <div className=" container col-8 content text-center ">
        <h1 className="m-2"> Login </h1>
        <hr></hr>
        <div className="mb-3 mx-2 text-center">
          <label style={{ marginRight: "5px" }}>Email :</label>
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInput}
            placeholder="enter your email"
          />{" "}
          <p style={{ color: "red", fontSize: "12px" }}>{error.emailErr}</p>
        </div>
        <div className="mb-3 mx-2">
          <label style={{ marginRight: "5px" }}>Password :</label>
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleInput}
            placeholder="password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
          <p style={{ color: "red", fontSize: "12px" }}>{error.passwordErr}</p>
        </div>
        <div className="mb-3 mx-2">
          <input
            style={{ marginRight: "5px" }}
            type="checkbox"
            name="remember me"
            id="myCheck"
            onClick={() => {
              remember();
            }}
          />
          <label>
            <b>Remember me</b>
          </label>
        </div>
        <div className="mb-3 mx-2">
          <button className="bttn" type="submit" onClick={() => validation()}>
            log in
          </button>
        </div>
        <div className="mb-3 mx-2">
          <Link to="/signup">Create an Account? </Link>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
