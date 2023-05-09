import { User } from "./types";
import axios from "axios";

type GetUsersResponse = {
  data: User[];
};

export async function getUsers(): Promise<User> {
  return axios
    .get("http://localhost:8080/users/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
}

export default getUsers;
