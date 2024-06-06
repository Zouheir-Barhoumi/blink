import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  newMessage: (message: any) => void;
  typing: (userId: string) => void;
  stopTyping: (userId: string) => void;
  chatHistory: (chat: any) => void;
  statusChange: (data: { userId: string; status: string }) => void;
}

interface ClientToServerEvents {
  message: (data: { chatId: string; sender: string; content: string }) => void;
  join: (chatId: string) => void;
  typing: (data: { userId: string; chatId: string }) => void;
  stopTyping: (chatId: string) => void;
}

class SocketService {
  public socket: Socket<ServerToClientEvents, ClientToServerEvents> | null =
    null;

  connect(url: string) {
    this.socket = io(url, {
      withCredentials: true,
    });

    this.socket.on("connect", () => {
      console.log("Frontend Service: Connected to server");
    });

    this.socket.on("disconnect", () => {});
  }

  joinChat(chatId: string) {
    this.socket?.emit("join", chatId);
  }

  sendMessage(chatId: string, sender: string, content: string) {
    this.socket?.emit("message", { chatId, sender, content });
  }

  typing(data: { userId: string; chatId: string }) {
    console.log("Frontend Service: typing");
    this.socket?.emit("typing", { userId: data.userId, chatId: data.chatId });
  }

  stopTyping(chatId: string) {
    console.log("Frontend Service: stop typing");
    this.socket?.emit("stopTyping", chatId);
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket?.on("newMessage", (message) => {
      callback(message);
    });
  }

  onTyping(callback: (userId: string) => void) {
    this.socket?.on("typing", callback);
  }

  onStopTyping(callback: (userId: string) => void) {
    this.socket?.on("stopTyping", callback);
  }

  onChatHistory(callback: (chat: any) => void) {
    this.socket?.on("chatHistory", callback);
  }

  onStatusChange(callback: (data: { userId: string; status: string }) => void) {
    this.socket?.on("statusChange", callback);
  }
}

const socketService = new SocketService();
export default socketService;
