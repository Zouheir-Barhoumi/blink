import React from "react";

interface UserListProps {
  chatId: string;
}

const UserList: React.FC<UserListProps> = ({ chatId }) => {
  // Placeholder: Implement fetching and displaying users based on chatId
  const users = ["User1", "User2", "User3"]; // Replace with actual user fetching logic

  return (
    <div className="user-list">
      <h3>Users in Chat</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
