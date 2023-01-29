import React from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
function ChatInput(props) {
  const { handleSendMsg } = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmijiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji, event) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="grid grid-cols-[5%,95%] items-center bg-[#080420] px-8 pb-[0.3rem]">
      {/* button-container */}
      <div className="flex items-center text-white gap-4">
        <div className="relative">
          {/* emoji */}
          <BsEmojiSmileFill
            className="text-2xl text-[#ffff00c8] cursor-pointer"
            onClick={handleEmijiPickerHideShow}
          />
          {showEmojiPicker && (
            <div className="absolute top-[-400px]">
              <EmojiPicker
                className=""
                height={380}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
      </div>
      {/* input-container */}
      <form
        className="w-full rounded-[2rem] flex items-center gap-8 bg-[#ffffff34]"
        onSubmit={(e) => sendChat(e)}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="type your messsage here"
          className="w-[90%] h-[60%] border-none focus:border-none bg-transparent text-white pl-4 text-[1.2rem] selection:bg-[#9186f3]"
        />
        <button
          type="submit"
          className="px-8 py-[0.53rem] rounded-[2rem] flex justify-center items-center bg-[#9a86f3] border-none"
        >
          <IoMdSend className="text-[2rem] text-white" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
