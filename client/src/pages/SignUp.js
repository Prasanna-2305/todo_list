import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "../redux/operations";

function SignUp() {
  const dispatch = useDispatch();

  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const [profile, setProfile] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const validation = () => {
    const { name, password, cpassword, email } = formValues;
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (name === "") {
      setError({ nameErr: "name is required " });
    } else if (name.length < 3) {
      setError({ nameErr: " name must have three characters " });
    } else if (email === "") {
      setError({ emailErr: " Email is Required " });
    } else if (!emailCheck) {
      setError({ emailErr: " Enter a valid Email" });
    } else if (password === "")
      setError({ passwordErr: "password is required  " });
    else if (password.length < 7)
      setError({
        passwordErr: "password  must contain  eight characters ",
      });
    else if (password !== cpassword)
      setError({
        cpasswordErr: " password didn't match !",
      });
    else {
      setError({ cpasswordErr: "" });
      const res = dispatch(registerUser(formValues, profile));
      if (res.isRegistered) {
        setFormValues({
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <div className=" background container-fluid padding  py-1 row mx-0">
      <div className=" container col-8 content  text-center ">
        <h1 className="m-2"> Registration Form </h1>
        <hr></hr>

        <form>
          <div className="mb-3 mx-2">
            <label style={{ marginRight: "5px" }}>Name :</label>
            <input
              className="input"
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInput}
              placeholder="enter your name"
            />
            <p style={{ color: "red", fontSize: "12px" }}>{error.nameErr}</p>
          </div>
          <div className="mb-3 mx-2">
            <label style={{ marginRight: "5px" }}> Email :</label>
            <input
              className="input"
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInput}
              placeholder="enter your email id "
            />{" "}
            <p style={{ color: "red", fontSize: "12px" }}>{error.emailErr}</p>
          </div>
          <div className="mb-3 mx-2">
            <label style={{ marginRight: "5px" }}>Password :</label>
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleInput}
              placeholder="password"
            />
            <button
              className="bttn"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
            <p style={{ color: "red", fontSize: "12px" }}>
              {error.passwordErr}
            </p>
          </div>
          <div className="mb-3 mx-2">
            <label style={{ marginRight: "5px" }}> Confirm Password :</label>
            <input
              className="input"
              type={showConfirmPassword ? "text" : "password"}
              name="cpassword"
              value={formValues.cpassword}
              onChange={handleInput}
              placeholder="confirm password"
            />
            <button
              className="bttn"
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
            <p style={{ color: "red", fontSize: "12px" }}>
              {error.cpasswordErr}
            </p>
          </div>
          <div className="mb-3 mx-2">
            <input
              className="input"
              type="file"
              placeholder="file"
              name="profile"
              filename="profile"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 mx-2">
            <button className="bttn" type="button" onClick={() => validation()}>
              Sign up
            </button>
          </div>
        </form>
        <div className="m-2">
          <Link to="/login">Already have an account? </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
