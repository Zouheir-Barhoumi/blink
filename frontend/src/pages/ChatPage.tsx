import React from "react";
import ChatWindow from "../components/ChatWindow";
import { Container } from "@chakra-ui/react";

// const user = localStorage.getItem("username");
const ChatPage: React.FC = () => {
  return (
    <Container maxW="1300px" h="100%" p={0}>
      {/* <Heading as="h1" mb={4}>
        Welcome, {user}!
      </Heading> */}
      <ChatWindow />
    </Container>
  );
};

export default ChatPage;
