import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({});

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("User Added Successfully");
          e.target.reset();
        }
      });
  };
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };
  return (
    <div>
      <h2>Please New Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          onBlur={handleOnBlur}
          type="text"
          name="name"
          placeholder="name"
        />
        <br />
        <input
          onBlur={handleOnBlur}
          type="text"
          name="country"
          placeholder="country"
        />
        <br />
        <input
          onBlur={handleOnBlur}
          type="email"
          name="email"
          placeholder="email"
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
