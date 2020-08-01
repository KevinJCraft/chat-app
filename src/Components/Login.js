import React, { useState } from "react";

export const Login = ({ handleLogin }) => {
  const [name, setName] = useState("");

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e, name)}>
        <label>name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>
        <button>join chat</button>
      </form>
    </div>
  );
};

export default Login;
