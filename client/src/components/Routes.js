import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { NavDropdown } from "react-bootstrap";

import LogIn from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import UserToDo from "./UserToDo";
import Profile from "./Profile";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const user_id = localStorage.getItem("id");
  useEffect(() => {
    const token = localStorage.getItem("Token");
    setToken(token);
  }, [token]);

  return (
    <div className="container-fluid main ">
      <Router>
        <div
          className="p-1 bg-light navbar "
          style={{ border: "1px solid black", backgroundColor: "#b3ccff" }}
        >
          <div className="container d-flex ">
            {token ? (
              <>
                <div style={{ padding: "5px", marginRight: "auto" }}>
                  <Link
                    to="/todo"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Todos
                  </Link>{" "}
                </div>
                <div className="drop-menu ">
                  <NavDropdown
                    id="basic-nav-dropdown"
                    title={<FaUserCircle color="black" size={25} />}
                    className="dropdown"
                    style={{ textDecoration: "none", marginTop: "-8px" }}
                  >
                    <NavDropdown.Item as={Link} to={"/profile"}>
                      {" "}
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.clear();
                        window.location = "/login";
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            ) : (
              <>
                <div style={{ padding: "5px" }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Home
                  </Link>{" "}
                </div>
                <div style={{ padding: "5px", marginLeft: "auto" }}>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Sign Up
                  </Link>{" "}
                </div>
                <div style={{ padding: "5px" }}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                    <BiLogIn />
                  </Link>{" "}
                </div>
              </>
            )}
          </div>
        </div>

        <Routes>
          {token ? (
            <>
              <Route path="/todo" element={<UserToDo />} />
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </>
          ) : (
            <>
              <Route path="/login" element={<LogIn />} />
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<SignUp />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}
export default Navbar;
