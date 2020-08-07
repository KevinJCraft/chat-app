import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, InputGroup } from "react-bootstrap";

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
    handleLogin(name.name);
  };

  useEffect(() => {
    socket.on("screenNameCheck", (data) => {
      setName({ ...name, isAvailable: data.isAvailable });
    });
    return () => socket.off();
  }, [socket, name]);

  return (
    <Container className="px-5 flex-grow-1 d-flex flex-column justify-content-around ">
      <div>
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
                  className="btn"
                >
                  join
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        <Row style={{ minHeight: "2rem" }}>
          {name.isRightLength && (
            <Form.Text className="ml-3">
              {name.isAvailable ? "Available" : "Not Available"}
            </Form.Text>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Login;
