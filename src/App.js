import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import UserList from "./UserList";
import UserEditForm from "./UserEditForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./custom.css";
import image from "./assets/backgroundoffice5.jpg"

      

function App() {
  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState({ name: "", profession: "", email: "" });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const backgroundStyles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    
  };


  const fetchUsers = async () => {
    const response = await axios.get("/api/users");
    const users = response.data;

    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  

  const handleUpdateUser = async (id, updatedUserData) => {
    try {
        const response = await axios.put(`/api/users/${id}`, updatedUserData);
        console.log("Response from PUT request:", response.data);
        fetchUsers();
    } catch (error) {
        console.error("Error updating user:", error);
        
    }
  };

  const handleCreateUser = async (userData) => {
    const response = await axios.post("/api/users", userData);
    setUserData(response.data);
    fetchUsers();
  };

  const handleSelectUser = (id) => {
    
    setSelectedUserId(id);
  };


  return (
    
    <div style= {backgroundStyles}>
      
      

      <h1 className="h1">Welcome to user database!</h1>

      <h2 className="desc-title">Please enter the user info</h2>

      <UserForm onSubmit={handleCreateUser} />
      <UserList users={users} handleUpdateUser={handleUpdateUser} handleSelectUser={handleSelectUser} />
      {selectedUserId !== null && (
        <UserEditForm
          userId={selectedUserId}
          userData={userData}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default App;
