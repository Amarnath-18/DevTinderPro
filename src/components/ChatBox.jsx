import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // Install: npm install emoji-picker-react
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constraints";

const ChatBox = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  const user = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connections);
  const toUser = connections.find((conn) => conn._id === id);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      userId,
      id,
      firstName: user.name,
      lastName: user.lastName,
    });

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          text: msg.text,
          sender: msg.sender === userId ? "outgoing" : "incoming",
        },
      ]);
    });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [userId, id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chat/${id}`, {
          withCredentials: true,
        });
        const messages = response.data.messages;
        let messageObj = [];
        
        messages.forEach((msg) => {
          messageObj.push({
            id: msg._id,
            text: msg.text,
            sender: msg.senderId._id === userId? "outgoing" : "incoming",
          });
        });
        setMessages(messageObj);
      } catch (err) {
        console.error("Error fetching chat:", err);
      }
    };
  
    fetchChat(); // Call the async function
  }, [id , user]); // Dependency array includes `id`
  

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, id, text: newMessage });
    setNewMessage("");
  };

  const addEmoji = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  if (!toUser || !user){
    return <div className="loading"></div>
  }

  return (
    <div className="flex justify-center items-center p-3 h-screen bg-gray-900">
      <div className="border-2 w-full sm:w-4/6 md:w-3/6 lg:w-2/6 p-2 bg-gray-800 shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b-2 border-gray-700">
          <img
            src={toUser?.photoUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-white">{toUser?.name}</h2>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="h-96 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${
                msg.sender === "outgoing" ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.sender === "outgoing" ? "bg-blue-500" : "bg-gray-700"
                } text-white animate-fade-in`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t-2 border-gray-700 flex items-center gap-2 relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-xl bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
          >
            😀
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-14 left-2 bg-gray-800 shadow-lg rounded-lg p-2">
              <EmojiPicker onEmojiClick={addEmoji} />
            </div>
          )}

          <input
            type="text"
            className="input input-bordered flex-grow bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
