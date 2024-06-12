import React, { useState } from "react";
import socketService from "../services/socketService";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

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
    <Flex bg="green" flexDir="column" h="calc(100vh - 7rem)">
      {/* Messages go here */}
      <Box flex="1" w="100%" overflow="auto" bg="black"></Box>

      {/* Input Box at the bottom */}
      <Flex align="center" w="100%">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={handleStopTyping}
          m={0}
          flex="1"
          bg="white"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Flex>
    </Flex>

    // <Flex bg="black">
    // </Flex>
  );
};

export default MessageInput;
