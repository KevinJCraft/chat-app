import React, { useState, useEffect } from "react";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { PersonIcon } from "@primer/octicons-react";

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
    socket.emit("loginAttempt", name);
  };

  useEffect(() => {
    socket.on("screenNameCheck", (data) => {
      setName({ ...name, isAvailable: data.isAvailable });
    });
    socket.on("loginSuccess", (user) => {
      handleLogin(user.name);
    });
    socket.on("loginFail", (user) => {
      setName(user);
    });
    return () => socket.off();
  }, [handleLogin, name, socket]);

  return (
    <Row className="white-background px-5 flex-grow-1 d-flex flex-column justify-content-around ">
      <div>
        <Row className="d-flex justify-content-around mb-4">
          <PersonIcon className="primary-text" size={200} />
        </Row>
        <Row className="align-items-center">
          <Form className="flex-fill" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                placeholder="enter user name..."
                value={name.name}
                onChange={handleChange}
                type="text"
                className=""
              />
              <InputGroup.Append>
                <Button
                  active={name.isRightLength && name.isAvailable}
                  type="submit"
                  className="btn primary-background"
                >
                  join
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        <Row style={{ minHeight: "2rem" }}>
          {name.isRightLength && (
            <Form.Text className="ml-3 black-text">
              {name.isAvailable ? "Available" : "Not Available"}
            </Form.Text>
          )}
        </Row>
      </div>
    </Row>
  );
};

export default Login;
