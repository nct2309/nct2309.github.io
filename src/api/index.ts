import { User } from './types';

export async function getUsers() {
  try {
    const response = await fetch('https://localhost:8080/users/1', {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
      mode: 'no-cors',
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}