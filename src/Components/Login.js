import React, { useState, useEffect } from "react";

export const Login = ({ handleLogin, socket }) => {
  const [name, setName] = useState({
    name: "",
    isAvailable: true,
    isRightLength: false,
  });

  const handleChange = (e) => {
    let isRightLength = false;
    if (e.target.value.length > 2) {
      isRightLength = true;
    }
    if (e.target.value.length <= 10) {
      socket.emit("screenNameCheck", { screenName: e.target.value });
      setName({ ...name, name: e.target.value, isRightLength });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.isAvailable && name.isRightLength) {
      handleLogin(name.name);
    }
  };

  useEffect(() => {
    socket.on("screenNameCheck", (data) => {
      setName({ ...name, isAvailable: data.isAvailable });
    });
    return () => socket.off();
  }, [socket, name]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input value={name.name} onChange={handleChange} type="text"></input>
        <button>join chat</button>
        <div>
          {name.isRightLength ? (
            <span>{name.isAvailable ? "Available" : "Not Available"}</span>
          ) : (
            "Minimum 3 characters"
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
