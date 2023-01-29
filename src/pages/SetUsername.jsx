import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  checkUsernameRoute,
  registerRoute,
} from "../utils/APIRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { debounce } from "../utils/Debounce";

function SetUsername() {
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState(undefined);
  const [usernameStatus, setUsernameStatus] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (dataUser) => {
    if (!dataUser) {
      navigate("/login");
    } else {
      setEmail(
        dataUser.email ? dataUser.email : dataUser.providerData[0].email
      );
    }
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
      });

      if (data.status === false) {
        toast.error(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    if (values.length < 3) {
      toast.error(
        "Username is required and should be greater than 3 characters"
      );

      return false;
    }

    return true;
  };

  const handleChange = debounce((name) => checkUsername(name), 300);

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUsernameRoute, { username });
      setUsernameStatus(data.status);
      setLabel(data.msg);
      setValues(username);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      {email && (
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] px-20 py-12"
        >
          <span className="text-white uppercase text-lg">
            Check Username availablity
          </span>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e.target.value)}
              min="3"
              className={` ${
                usernameStatus
                  ? "border-[#39ff14] focus:border-[#39ff14]"
                  : usernameStatus !== undefined
                  ? "border-[#ff3131] focus:border-[#ff3131]"
                  : ""
              }`}
            />
            <label
              htmlFor=""
              className={`block mt-2 ml-1 transition-all duration-300 ease-in-out h-2 ${
                usernameStatus
                  ? "text-[#39ff14] "
                  : usernameStatus !== undefined
                  ? "text-[#ff3131]"
                  : ""
              }`}
            >
              {label}
            </label>
          </div>

          <button
            className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer rounded-[0.4rem] text-base uppercase transition ease-in-out duration-[0.5s] hover:bg-[#4e0eff]"
            type="submit"
          >
            Create User
          </button>
        </form>
      )}
    </div>
  );
}

export default SetUsername;
