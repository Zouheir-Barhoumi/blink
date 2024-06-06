import React, { useState, useEffect } from "react";
import { getUsers } from "../services/usersService";
import UserCard from "./UserCard";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="user-list">
      <h3>Users in Chat</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
          // <li key={user._id}>
          //   <UserCard name={user.username} profilePic="" lastMessage="" />
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
