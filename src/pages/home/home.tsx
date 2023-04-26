import React, { useState, useEffect } from "react";
import { User } from "../../api/types";
import "./home.css";
import { getUsers } from "../../api/index";
const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        console.log('Error fetching users:', response);
      }
    }

    fetchData();
  }, []);
  console.log(users);
  return (
    <p id= "home-content">
      Urban Waste Collection 2.0
      <br />
      The project made by{" "}
      <a href="https://github.com/TangTuanDat/A2PK_UWC2.0">A2PK</a>.
    </p>
  );
}

export default Home;