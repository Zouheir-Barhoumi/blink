import React, { useEffect, useState } from "react";
import socketService from "../services/socketService";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import { Flex, Box } from "@chakra-ui/react";

// interface ChatWindowProps {
//   chatId: string;
//   userId: string;
// }

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const userId = "665c257525713d838e9ab6fd";
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    const connectSocket = async () => {
      console.log("ChatWindow: useEffect");
      socketService.connect("http://localhost:5000");

      if (chatId) {
        socketService.joinChat(chatId);
        console.log("ChatWindow: connected");
      }

      socketService.onNewMessage((message) => {
        console.log(`ChatWindow: New Message Sent: ${message.content}`);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketService.onTyping((userId) => {
        console.log(`ChatWindow: User ${userId} is typing...`);
        setTypingUsers((prevTypingUsers) => {
          if (!prevTypingUsers.includes(userId)) {
            return [...prevTypingUsers, userId];
          }
          return prevTypingUsers;
        });
      });

      socketService.onStopTyping((userId) => {
        console.log(`ChatWindow: User ${userId} stopped typing...`);
        setTypingUsers((prevTypingUsers) =>
          prevTypingUsers.filter((id) => id !== userId),
        );
      });
    };

    connectSocket();

    return () => {
      console.log("ChatWindow: Disconnecting from socket server");
      socketService.socket?.disconnect();
    };
  }, [chatId]);

  return (
    <Flex className="chat-window" pt="7rem" gap="1rem">
      {/* <UserList chatId={chatId} /> */}
      <UserList onSelectChat={setChatId} userId={userId} />
      <Box w="100%" h="100%">
        <MessageInput
          chatId={chatId || ""}
          userId={userId}
          messages={messages}
          typingUsers={typingUsers}
        />
      </Box>
    </Flex>
  );
};

export default ChatWindow;
