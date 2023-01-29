import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

function ChatContainer(props) {
  const { currentChat, currentUser, socket } = props;
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, arrivalMessage]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, messages: msg });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setArrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, setMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      {currentChat && (
        <div className="pt-4 grid grid-rows-[15%,70%,15%] min-[1080px]:grid-rows-[10%,78%,12%] gap-[0.1rem] overflow-hidden">
          {/* chat header */}
          <div className="flex justify-between items-center px-8">
            {/* user detail */}
            <div className="flex items-center gap-4">
              {/*avatar  */}
              <div>
                <img
                  className="h-12"
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              {/* username */}
              <div>
                <h3 className="text-white text-lg">{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {/* <Messages /> */}
          {/* chat-messages */}
          <div className="px-8 py-4 flex flex-col gap-4 overflow-auto scroll-bar">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  {/* message */}
                  <div
                    className={`flex items-center ${
                      message.fromSelf ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* content */}
                    <div
                      className={`max-w-[40%] break-words p-4 text-[1.1rem] rounded-2xl text-[#d1d1d1] ${
                        message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#9900ff20]"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
}

export default ChatContainer;
