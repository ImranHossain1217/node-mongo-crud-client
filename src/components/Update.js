import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);

  const handleAddUser = (e) => {
    e.preventDefault();
    //   console.log(user);
    fetch(`http://localhost:5000/users/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("User Updated Successfully !!");
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
      <h2>Update User: {storedUser.name}</h2>
      <form onSubmit={handleAddUser}>
        <input
          onBlur={handleOnBlur}
          type="text"
          name="name"
          placeholder="name"
          defaultValue={storedUser.name}
        />
        <br />
        <input
          onBlur={handleOnBlur}
          type="text"
          name="country"
          placeholder="country"
          defaultValue={storedUser.country}
        />
        <br />
        <input
          onBlur={handleOnBlur}
          type="email"
          name="email"
          placeholder="email"
          defaultValue={storedUser.email}
        />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Update;
