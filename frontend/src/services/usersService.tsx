import axios from "axios";

const API_URL = "http://localhost:5000/api/chat/users";

// export const getUsers = async (chatId: string) => {
//   const response = await axios.get(API_URL + "/" + chatId);
//   return response.data;
// };
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
