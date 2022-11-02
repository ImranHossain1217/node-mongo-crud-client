import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  const handleDelete = (user) => {
    const agree = window.confirm(`Are sure you want to delete ${user.name}`);
    if (agree) {
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            alert("User Deleted successfully!!");
            const remainingUser = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUsers(remainingUser);
          }
        });
    }
  };
  return (
    <div>
      <h2>User: {displayUsers.length}</h2>
      <div>
        {displayUsers.map((user) => (
          <div key={user._id}>
            <p>
              <b>Name:</b> {user.name} <b>Email:</b> {user.email}{" "}
              <b>Country: </b>
              {user.country}{" "}
              <button onClick={() => handleDelete(user)}>X</button>{" "}
              <Link to={`users/${user._id}`}>
                <button>Update</button>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
