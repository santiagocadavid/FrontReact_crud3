import React, { useState } from "react";
import { Button } from "react-bootstrap";

const UserEditForm = ({ user, onEdit }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (event) => {
    // Handle input changes and update the editedUser state
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = () => {
    // Perform the update action with the editedUser data
    console.log(editedUser);
    onEdit(editedUser);
  };

  return (
    <div>
      <h2>Edit User</h2>
      <input
        type="text"
        placeholder="Name"
        value={editedUser.name}
        onChange={handleInputChange}
      />
      {/* Include input fields for other user data (age, profession, email) */}
      <Button variant="primary" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  );
};

export default UserEditForm;
