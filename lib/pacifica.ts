// src/lib/pacifica.ts
import axios from 'axios';

export const getPacificaPositions = async (wallet: string) => {
  try {
    // The most reliable Testnet endpoint for the 2026 Hackathon
    const response = await axios.get(`https://test-api.pacifica.fi/api/v1/account/positions`, {
      params: { 
        address: wallet,
        subaccount_id: 0 
      },
      headers: {
        'x-api-key': process.env.PACIFICA_API_KEY, // The 5AAbeY... key from your screenshot
        'Content-Type': 'application/json'
      }
    });

    return response.data?.result || response.data || [];
  } catch (error) {
    console.error("API Error - check .env.local and URL");
    return [];
  }
};