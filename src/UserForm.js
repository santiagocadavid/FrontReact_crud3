import React, { useState } from "react";
import { Button } from "react-bootstrap";


function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    onSubmit({
      name,
      profession,
      age,
      email,
    });
  };

  return (
    <div>
      
      <div className="container">
    
        <form className="form-users" onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="form-label"> Name</label>
            <br />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-6">

            <label className="form-label">Profession</label>
            <br />

            <input
              type="text"
              placeholder="Profession"
              value={profession}
              onChange={(event) => setProfession(event.target.value)}
            />
            
          </div>

          <div className="mb-6">

            <label className="form-label">Age</label>
            <br />

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />

          </div>

          <div className="mb-6">

            <label className="form-label">Email</label>
            <br />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

          </div>
          <br />
          
          
          <Button className="button-form-user" variant="success" type="submit">Submit</Button>
          
        </form>
      </div>

    </div>
  );
}

export default UserForm;
