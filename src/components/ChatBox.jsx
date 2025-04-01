import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // Install: npm install emoji-picker-react

const ChatBox = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you? 😊", sender: "incoming" },
    { id: 2, text: "I'm good! What about you? 😎", sender: "outgoing" },
    { id: 3, text: "Just chilling. Did you watch the new movie? 🎬", sender: "incoming" },
    { id: 4, text: "Yeah! It was awesome 🔥🔥🔥", sender: "outgoing" },
    { id: 5, text: "Haha! I knew you'd like it! 😂", sender: "incoming" },
    { id: 6, text: "By the way, any plans for the weekend? 🏖️", sender: "incoming" },
    { id: 7, text: "Not yet. Wanna hang out? 🍕", sender: "outgoing" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: "outgoing" }]);
    setNewMessage("");
    setTyping(false);
  };

  const addEmoji = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="flex justify-center items-center p-3 h-screen bg-gray-900">
      <div className="border-2 w-full sm:w-4/6 md:w-3/6 lg:w-2/6 p-2 bg-gray-800 shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b-2 border-gray-700">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-white">User Name</h2>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="h-96 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${msg.sender === "outgoing" ? "chat-end" : "chat-start"}`}
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
          {typing && <p className="text-gray-400 text-sm italic">User is typing...</p>}
          <div ref={chatEndRef} />
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
            onChange={handleTyping}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
