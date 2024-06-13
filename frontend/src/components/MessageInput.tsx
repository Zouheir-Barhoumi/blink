import React, { useState } from "react";
import socketService from "../services/socketService";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import MessageList from "./MessageList";

interface MessageInputProps {
  chatId: string;
  userId: string;
  messages: any[];
  typingUsers: string[];
}

const MessageInput: React.FC<MessageInputProps> = ({
  chatId,
  userId,
  messages,
  typingUsers,
}) => {
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
    <Flex
      bg="black"
      flexDir="column"
      h="calc(100vh - 8rem)"
      borderRadius="20px"
    >
      <Box flex="1" w="100%" overflow="auto" bg="black" borderRadius="20px">
        {/* Messages go here */}
        <MessageList messages={messages} typingUsers={typingUsers} />
      </Box>

      {/* Input Box at the bottom */}
      <Flex
        align="center"
        w="100%"
        borderRadius="20px"
        bg="background"
        h="6rem"
        px="3rem"
        // gap="1rem"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={handleStopTyping}
          m={0}
          flex="1"
          bg="white"
          color="black"
          borderRadius="20px 0 0 20px"
          zIndex={0}
          _focus={{
            outline: "none",
            boxShadow: "none",
            border: "none",
            zIndex: "0",
          }}
        />
        <Button
          position="relative"
          onClick={handleSendMessage}
          bg="bgL"
          color="wheat"
          ml="-1rem"
          border="4px"
          borderColor="white"
          borderRadius="20px"
          _hover={{ bg: "bgD", color: "white" }}
        >
          Send
        </Button>
      </Flex>
    </Flex>

    // <Flex bg="black">
    // </Flex>
  );
};

export default MessageInput;
