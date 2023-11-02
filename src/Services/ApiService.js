import axios from 'axios';
import { API_URL } from '../Constants/ApiConstants';

const ApiService = {
    fetchData: async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        return response.data;   
      } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
      }
    },
  };
  
  export default ApiService;