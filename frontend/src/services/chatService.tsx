import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const getChat = async (user1: string, user2: string) => {
  try {
    const response = await axios.get(`{API_URL}/users/${user1}/${user2}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status == 404) {
      return null;
    } else {
      throw new Error("Error fetching chat");
    }
  }
};

export const createChat = async (participants: string[]) => {
  try {
    const response = await axios.post(API_URL, { participants });
    return response.data;
  } catch (error: any) {
    throw new Error("Error creating chat");
  }
};
