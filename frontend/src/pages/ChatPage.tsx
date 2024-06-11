import React from "react";
import ChatWindow from "../components/ChatWindow";
import { Container, Heading } from "@chakra-ui/react";

const user = localStorage.getItem("username");
const ChatPage: React.FC = () => {
  return (
    <Container maxW="1300px" h="100%" p={0}>
      <Heading as="h1" mb={4}>
        Welcome, {user}!
      </Heading>

      <ChatWindow
        chatId="665c2e6b592945ecab1c35d3"
        userId="665c257525713d838e9ab6fd"
      />
    </Container>
  );
};

export default ChatPage;
