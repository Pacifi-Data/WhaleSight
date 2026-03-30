import axios from 'axios';

export const getWhaleSentiment = async (ticker: string) => {
  try {
    const response = await axios.get(`https://api.elfa.ai/v1/sentiment/${ticker}`, {
      headers: { 'x-api-key': process.env.ELFA_API_KEY }
    });
    return response.data; 
  } catch (error) {
    return { score: 50, mentions: 0 }; // Default neutral
  }
};