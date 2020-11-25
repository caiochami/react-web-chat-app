import React, { useRef } from "react";
import { v4} from 'uuid'
import { Container, Form, Button } from "react-bootstrap";
export default function Login({onIdSubmit}) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onIdSubmit(idRef.current.value)
  };

  function createNewId(){
      onIdSubmit(v4())
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button variant="primary" className="mr-1" type="submit">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
      </Form>
    </Container>
  );
}
