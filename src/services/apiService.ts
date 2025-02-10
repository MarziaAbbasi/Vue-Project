import axios from 'axios';
import { RealtimeData } from '@/types/RealtimeData';

const API_URL = '/api/v3/api/energy'; 
const API_KEY = import.meta.env.VITE_API_KEY; 

interface EnergyDataResponse {
  data: {
    realtime: RealtimeData[];
  };
}

export const fetchEnergyData = async (): Promise<RealtimeData> => {
  try {
    const response = await axios.get<EnergyDataResponse>(API_URL, {
      params: {
        algorithm: 'sha256',
        mode: 'realtime',
      },
      headers: {
        accept: 'application/json',
        'x-api-key': API_KEY,  
      },
    });
    return response.data.data.realtime[0];
  } catch (error) {
    throw new Error('Failed to fetch energy data');
  }
};
