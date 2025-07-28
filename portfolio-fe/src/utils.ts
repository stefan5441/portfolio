import axios from "axios";

export const fetchLeetCodeActivity = async (username: string) => {
  const response = await axios.get(`http://localhost:3000/activity/leetcode?username=${username}`);
  return response.data;
};

export const fetchCodeforcesActivity = async (username: string) => {
  const response = await axios.get(`http://localhost:3000/activity/codeforces?username=${username}`);
  return response.data;
};
