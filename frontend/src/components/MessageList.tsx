import React from "react";

interface MessageListProps {
  messages: any[];
  typingUsers: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages, typingUsers }) => {
  return (
    <div className="message-list">
      <h2>Message List</h2>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.sender}</strong>: {message.content}
        </div>
      ))}
      {typingUsers.map((userId, index) => (
        <div key={index} className="typing">
          {userId} is typing... {index}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
