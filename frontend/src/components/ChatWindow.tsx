import React, { useEffect, useState } from "react";
import socketService from "../services/socketService";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import UserList from "./UserList";

interface ChatWindowProps {
  chatId: string;
  userId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, userId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    console.log("ChatWindow: useEffect");
    socketService.connect("http://localhost:5000");

    socketService.joinChat(chatId);

    socketService.onNewMessage((message) => {
      console.log(`ChatWindow: New Message Sent: ${message}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketService.onTyping((userId) => {
      console.log(`ChatWindow: User ${userId} is typing...`);
      setTypingUsers((prevTypingUsers) => [...prevTypingUsers, userId]);
    });

    socketService.onStopTyping((userId) => {
      console.log(`ChatWindow: User ${userId} stopped typing...`);
      setTypingUsers((prevTypingUsers) =>
        prevTypingUsers.filter((id) => id !== userId),
      );
    });

    return () => {
      console.log("ChatWindow: Disconnecting from socket server");
      socketService.socket?.disconnect();
    };
  }, [chatId]);

  return (
    <div className="chat-window">
      <UserList chatId={chatId} />
      <MessageList messages={messages} typingUsers={typingUsers} />
      <MessageInput chatId={chatId} userId={userId} />
    </div>
  );
};

export default ChatWindow;
