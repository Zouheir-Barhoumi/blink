import React from "react";

const ChatPage: React.FC = () => {
  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        <p>Chat messages will appear here.</p>
      </div>
      <form>
        <input type="text" placeholder="Enter your message here..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
