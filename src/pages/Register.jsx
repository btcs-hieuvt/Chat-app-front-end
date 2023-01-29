import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Logo from "../assets/logo.svg";
import { registerRoute } from "../utils/APIRoutes";
import SocialLoginButton from "../components/SocialLoginButton";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
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
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password do not match");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters");
      return false;
    } else if (password.length < 8) {
      toast.error("password should be equal or greater than 8 characters");
      return false;
    } else if (email === "") {
      toast.error("email is required");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] px-20 py-12"
      >
        <div className="flex items-center gap-4 justify-center">
          <img className="h-20 " src={Logo} alt="Logo" />
          <h1 className="text-white uppercase text-2xl">chat app</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button
          className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer rounded-[0.4rem] text-base uppercase transition ease-in-out duration-[0.5s] hover:bg-[#4e0eff]"
          type="submit"
        >
          create account
        </button>

        <SocialLoginButton />

        <span className="text-white uppercase">
          already have an account ?{" "}
          <Link to="/login" className="text-[#4e0eff] font-bold">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
