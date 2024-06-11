import React from "react";
import { Avatar, Box, Text, Circle } from "@chakra-ui/react";

interface UserCardProps {
  name: string;
  profilePic: string;
  lastMessage: string;
  status: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  profilePic,
  lastMessage,
  status,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" position="relative">
        <Avatar src={profilePic} />
        <Circle
          size="10px"
          bg={status === "online" ? "green.500" : "gray.500"}
          position="absolute"
          top="70%"
          right="-0.5rem"
        />
      </Box>
      <Box ml="1rem">
        <Text fontWeight="bold">{name}</Text>
        <Text>{lastMessage}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
