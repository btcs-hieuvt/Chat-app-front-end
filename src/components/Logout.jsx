import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className="flex justify-center items-center p-[0.5rem] rounded-lg bg-[#9a86f3] cursor-pointer"
      onClick={handleClick}
    >
      <BiPowerOff className="text-[1.3rem] text-[#ebe7ff]" />
    </div>
  );
}

export default Logout;
