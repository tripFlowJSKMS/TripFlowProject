import { AxiosResponse } from 'axios'; // Import axios for making HTTP requests
import { GenerateDesirableDestinationsType } from '../../../../Shared/types';
export async function generateDestinations(response: AxiosResponse<GenerateDesirableDestinationsType>) {

  try {
    const { data } = response;
    // IDE says got error but it actually works lmao
    for (const destination of data.destinations) {
      console.log('Name:', destination.name);
      console.log('Characteristics:', destination.characteristics);    
      console.log('----------------------------------');
    }
  } catch (error) {
    console.error('Error generating destinations:', error);
    throw error; // Optionally, rethrow the error for handling at a higher level
  }
}
