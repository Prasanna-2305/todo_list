import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getUserProfile, uploadProfile } from "../redux/operations";
import Loader from "./Loader";

function Profile() {
  const ref = useRef();
  const user_id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.TodoReducer);
  useEffect(() => {
    dispatch(getUserProfile(user_id));
  }, []);

  const [profile, setProfile] = useState("");

  const selectProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const changeProfile = (user_id) => {
    if (profile !== "") {
      var formData = new FormData();
      formData.append("profile", profile);
      dispatch(uploadProfile(user_id, formData));
      setProfile("")
      ref.current.value = "";
    }
  };

  return (
    <>
      <div className="image my-2 text-center   bg-light shadow">
        {" "}
        {user.name}-Profile
        <div className="image ">
          {loading ? (
            <Loader />
          ) : (
            <>
              <img
                className="border border-dark rounded"
                src={user.profile}
                height={180}
                width={150}
              ></img>
            </>
          )}
        </div>
        <div className=" text-center m-2">
          {" "}
          <input
            type="file"
            className=""
            name="profile"
            filename="profile"
            ref={ref}
            onChange={selectProfile}
          />
        </div>
        <div className="">
          {" "}
          <button
            className="btn btn-success m-2"
            type="button "
            onClick={() => changeProfile(user_id)}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
