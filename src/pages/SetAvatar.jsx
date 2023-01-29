import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import loader from "../assets/loader.gif";
import { setAvataRoute } from "../utils/APIRoutes";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, SetAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  });

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvataRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again");
      }
    }
  };

  useEffect(() => {
    const getAvatar = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      SetAvatar(data);
      setIsLoading(false);
    };

    getAvatar();
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-12 bg-[#131324]">
      {isLoading ? (
        <>
          <img src={loader} alt="loader" className="h-1/2" />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-white">
              Pick an avatar as your profile picture
            </h1>
          </div>

          <div className="flex gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`border-[0.4rem] border-[transparent] p-[0.4rem] rounded-[5rem] flex justify-center items-center transition ease-in-out duration-[0.5s] ${
                    selectedAvatar === index
                      ? "border-[0.4rem] border-[#4e0eff]"
                      : ""
                  }`}
                >
                  <img
                    className="h-24"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-[#997af0] text-white px-8 py-4 font-bold cursor-pointer rounded-[0.4rem] text-base uppercase transition ease-in-out duration-[0.5s] hover:bg-[#4e0eff]"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </>
      )}
    </div>
  );
}

export default SetAvatar;
