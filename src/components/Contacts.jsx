import React, { useState } from "react";
import { useEffect } from "react";
import logo from "../assets/logo.svg";
function Contacts(props) {
  const { contacts, currentUser, changeChat } = props;

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserSelected, setCurrentUserSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentUserSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="grid grid-rows-[10%,75%,15%] overflow-hidden bg-[#080420]">
          {/* brand */}
          <div className="flex items-center justify-center gap-4">
            <img src={logo} alt="Logo" className="h-8" />
            <h3 className="text-white uppercase text-lg">Chat App</h3>
          </div>
          {/* contacts */}
          <div className="flex flex-col items-center overflow-auto gap-3 scroll-bar">
            {contacts.map((contact, index) => {
              return (
                //contact
                <div
                  key={index}
                  className={`bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded p-[0.4rem] gap-4 flex items-center transition ease-in-out duration-500 ${
                    index === currentUserSelected ? "bg-[#9186f3]" : ""
                  }`}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  {/* avatar */}
                  <div>
                    <img
                      className="h-[3rem]"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  {/* username */}
                  <div>
                    <h3 className="text-white text-lg">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* current user */}
          <div className="]bg-[#0d0d30] flex justify-center items-center min-[1080px]:gap-8 gap-2">
            {/* avatar */}
            <div>
              <img
                className="h-16 "
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            {/* username */}
            <div>
              <h2 className="text-white min-[1080px]:text-lg text-base">
                {currentUserName}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
