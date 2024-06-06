import React from "react";
import Avatar from "@material-ui/core";

interface UserCardProps {
  name: string;
  profilePic: string;
  lastMessage: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  profilePic,
  lastMessage,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar src={profilePic} />
      <div style={{ marginLeft: "1rem" }}>
        <h3>{name}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default UserCard;
