import axios from 'axios';

export const getPacificaPositions = async (wallet: string) => {
  try {
    const response = await axios.get(`...`);
    return response.data; // Ensure this is the array of positions
  } catch (error) {
    console.error("API Call Failed");
    return []; // <--- CRITICAL: Returning an empty array prevents the 'void' error
  }
};