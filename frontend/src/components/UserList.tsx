import React, { useState, useEffect } from "react";
import { getUsers } from "../services/usersService";
import UserCard from "./UserCard";
import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { getChat, createChat } from "../services/chatService";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   status: string;
//   created_at: string;
//   __v: number;
// }

interface UserListProps {
  onSelectChat: (chatId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectChat }) => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStates, setActiveStates] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const toggleActiveState = async (user: any, index: number) => {
    setSelectedUserId(user._id);
    try {
      let chatId;
      const userId = localStorage.getItem("userId");
      /** Check if user chat exists  */
      if (selectedUserId && userId) {
        const existingChat = await getChat(selectedUserId, userId);
        if (existingChat) {
          chatId = existingChat._id;
          alert("Existing chat Id: " + chatId);
        } else {
          const newChat = await createChat([userId, user._id]);
          chatId = newChat._id;
        }
        // Notify parent component of the selected chat
        onSelectChat(chatId);
      }
    } catch (error) {
      console.log("Error setting chat state", error);
    }

    setActiveStates(() => {
      const newStates: boolean[] = [];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <Box
      bgColor="black"
      display="flex"
      h="calc(100vh - 8rem)"
      w="100%"
      maxW="320px"
      flexDir="column"
      alignItems="center"
      border="1px"
      borderColor="primary.100"
      borderRadius={"20px"}
      py="8px"
      px="4px"
      overflowY="auto"
      mb="1rem"
    >
      <Box w="100%" top="0" position="sticky" bg="black" zIndex={100}>
        <Heading size="md">Users in Chat</Heading>
        <Text mb="8px">{localStorage.getItem("username")}</Text>
      </Box>
      <UnorderedList display="flex" flexDir="column" alignItems="center" m={0}>
        {users.map((user, index) => (
          <ListItem
            onClick={() => toggleActiveState(user, index)}
            cursor="pointer"
            position="relative"
            key={user._id}
            w="310px"
            border="1px"
            borderColor="greyBox"
            borderRadius="20px"
            boxShadow={activeStates[index] ? "0 4px 4px #41F794" : "none"}
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgGradient: activeStates[index]
                ? "linear(to-r, primary.200, secondary.100)"
                : "linear(to-r, bgD, bgD)",
              opacity: 0.25,
              zIndex: 0,
              borderRadius: "20px",
            }}
          >
            <Box zIndex={1} position="relative">
              <UserCard
                name={user.username}
                profilePic=""
                lastMessage=""
                status="online"
              />
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default UserList;
