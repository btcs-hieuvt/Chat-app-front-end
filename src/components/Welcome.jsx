import React from "react";
import Robot from "../assets/robot.gif";

function Welcome(props) {
  const {currentUser} = props;
  return (
    <div className="flex  justify-center items-center flex-col text-white">
      <img src={Robot} alt="Robot" className="h-[20rem]" />
      <h1 className="text-2xl">
        Welcome, <span className="text-[#4e00ff]">{currentUser.username}!</span>
      </h1>
      <h3 className="text-lg">please select a chat to Start Messaging</h3>
    </div>
  );
}

export default Welcome;
