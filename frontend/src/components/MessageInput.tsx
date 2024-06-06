import React, { useState } from "react";
import socketService from "../services/socketService";

interface MessageInputProps {
  chatId: string;
  userId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ chatId, userId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      socketService.sendMessage(chatId, userId, message);
      setMessage("");
      socketService.stopTyping({ userId, chatId });
    }
  };

  const handleTyping = () => {
    socketService.typing({ userId, chatId });
  };

  const handleStopTyping = () => {
    socketService.stopTyping({ userId, chatId });
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        onKeyUp={handleStopTyping}
      />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
