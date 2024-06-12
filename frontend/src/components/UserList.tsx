import React, { useState, useEffect, useRef } from "react";
import { getUsers } from "../services/usersService";
import UserCard from "./UserCard";
import { Box, Heading, UnorderedList, ListItem, Text } from "@chakra-ui/react";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   status: string;
//   created_at: string;
//   __v: number;
// }

const UserList: React.FC = () => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
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
  const toggleActiveState = (user: any, index: number) => {
    // setUserId(user._id);
    setUserId(user.username);
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
      h="calc(100vh - 7rem)"
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
    >
      <Box w="100%" top="0" position="sticky" bg="black" zIndex={100}>
        <Heading size="md">Users in Chat</Heading>
        <Text mb="8px">{userId}</Text>
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
