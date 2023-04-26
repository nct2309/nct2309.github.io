import axios from 'axios';
import { User } from './types';

type GetUsersResponse = {
    data: User[];
};
  
export async function getUsers() {
        // 👇️ const data: GetUsersResponse
        const data = await axios.get<GetUsersResponse>(
        'https://localhost:8080/users/1', { withCredentials: true })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    
}
