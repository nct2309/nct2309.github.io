import axios from 'axios';
import { User } from './types';

type GetUsersResponse = {
    data: User[];
};
  
export async function getUsers() {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.get<GetUsersResponse>(
        'http://localhost:8080/users/1',
        {   
            withCredentials: true,
            headers: {
            Accept: 'application/json',
            },
        },
        );

        console.log(JSON.stringify(data, null, 4));

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
        } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
        }
    }
}
