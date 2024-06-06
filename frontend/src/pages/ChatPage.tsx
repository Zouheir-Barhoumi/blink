import React from "react";
import ChatWindow from "../components/ChatWindow";

const user = localStorage.getItem("username");
const ChatPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome, {user}!</h1>
      <h2>Chat Page</h2>
      <ChatWindow
        chatId="665c2e6b592945ecab1c35d3"
        userId="665c257525713d838e9ab6fd"
      />
      {/* <div>
        <p>Chat messages will appear here.</p>
      </div>
      <form>
        <input type="text" placeholder="Enter your message here..." />
        <button type="submit">Send</button>
      </form> */}
    </div>
  );
};

export default ChatPage;
