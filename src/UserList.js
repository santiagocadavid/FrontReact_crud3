import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editProfession, setEditProfession] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editEmail, setEditEmail] = useState("");
  
  

  const fetchUsers = async () => {
    
    console.log("Fetching users...");
    const response = await axios.get("/api/users");
    const users = response.data;
    
    console.log("API response:", response.data);
    console.log("Data type:", typeof users);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (id) => {
    // Find the user by ID and populate the edit form fields
    const userToEdit = users.find((user) => user.id === id);
    setEditUserId(userToEdit.id);
    setEditName(userToEdit.name);
    setEditProfession(userToEdit.profession);
    setEditAge(userToEdit.age);
    setEditEmail(userToEdit.email);

    setShowEditModal(true);
  };
  

  const handleUpdateUser = async () => {
    // Prepare updated user data
    const updatedUserData = {
      name: editName,
      profession: editProfession,
      age: editAge,
      email: editEmail,
    };

    // Send the updated data to the server
    await axios.put(`/api/users/${editUserId}`, updatedUserData);
    console.log(editUserId);
    console.log(updatedUserData);
    setShowEditModal(false);
    fetchUsers();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };


  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      // Refresh the user list after a delete
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle the error as needed (e.g., show a message to the user)
    }
  }
  

  return (
    <div>
      <div className="container">
        <div className="container">

        </div>
        <h1 className="h1">User List</h1>
        <table className="table table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Name</th>
              <th>Profession</th>
              <th>Age</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.profession}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <Button onClick={() => handleEditUser(user.id)} variant="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteUser(user.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="text"
              value={editProfession}
              onChange={(e) => setEditProfession(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};


export default UserList;