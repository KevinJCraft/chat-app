import React, { useState, useEffect } from "react";

export const Login = ({ handleLogin, socket }) => {
  const [name, setName] = useState({ name: "", isAvailable: true });

  const handleChange = (e) => {
    if (e.target.value.length <= 10) {
      socket.emit("screenNameCheck", { screenName: e.target.value });
      setName({ ...name, name: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.isAvailable) {
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
      {console.log("render")}
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input value={name.name} onChange={handleChange} type="text"></input>
        <button>join chat</button>
        <div>
          <span>{name.isAvailable ? "Available" : "Not Available"}</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
