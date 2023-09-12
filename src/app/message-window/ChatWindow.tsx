"use client";
import React, { useState, SyntheticEvent } from "react";
import Image from "next/image";
import ChatBoxNavbar from "./Componets/ChatBoxNavbar";
import Button from "./Componets/Button";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { addMessage } from "../redux/chatSlice";

interface Message {
  text: string;
  sender: string;
}

const ChatWindow = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch<AppDispatch>();

  const [message, setMessage] = useState("");

  const handleSend = (e: SyntheticEvent) => {
    e.preventDefault();
  
    if (message) {
      dispatch(addMessage({ text: message, sender: "user" }));
      setMessage("");
      setTimeout(() => {
        dispatch(addMessage({ text: "ok", sender: "ai" }));
      }, 1500);
    }
  };

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  function senderView(messageText: string) {
   return (
     <div className="flex items-end justify-end" key={messageText}>
       <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
         <div>
           <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
             {messageText}
           </span>
         </div>
       </div>
       <Image
         width={200}
         height={200}
         src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
         alt="My profile"
         className="w-6 h-6 rounded-full order-2"
       />
     </div>
   );
 }

 function receiverView(messageText: string) {
   return (
     <div className="flex items-end" key={messageText}>
       <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
         <div>
           <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
           {messageText}
           </span>
         </div>
       </div>
       <Image
         width={200}
         height={200}
         src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
         alt="My profile"
         className="w-6 h-6 rounded-full order-1"
       />
     </div>
   );
 }

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen bg-slate-50">
      {console.log(messages)}
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <ChatBoxNavbar />
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message) =>
          message.sender === "user"
            ? senderView(message.text)
            : receiverView(message.text)
        )}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            value={message}
            onChange={handleOnChangeText}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <Button label="Send" onClick={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
