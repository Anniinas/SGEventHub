// frontend/app/public/fetchData.ts
import axios from 'axios';

export interface DataType {
  id: string;
  name: string;
  message: string;
  location: string;
  date: string;

  // Add other fields as necessary
}

export const fetchData = async (url: string): Promise<DataType[]> => {
  try {
    const response = await axios.get(url);
    // Transform the data if necessary

    console.log(response);

    const data = response.data.map((item: any) => ({
      id: item.id.S,
      name: item.name.S,
      message: item.message.S,
      location: item.location.S,
      date: item.date.S
    }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};