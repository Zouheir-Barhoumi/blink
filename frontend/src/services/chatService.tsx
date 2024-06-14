import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const getChat = async (user1: string, user2: string) => {
  console.log("Hi from getChat");
  try {
    const response = await axios.get(`{API_URL}/${user1}/${user2}`);
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
  console.log("Hi from createChat");
  try {
    const response = await axios.post(API_URL, { participants });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Error creating chat: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("Error creating chat: No response received");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error creating chat: ${error.message}`);
    }
  }
};
