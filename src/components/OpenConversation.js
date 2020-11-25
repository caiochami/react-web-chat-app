import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../hooks/Contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState();

  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text
    );
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto"></div>
      <Form>
        <Form.Group onSubmit={handleSubmit} className="m-2">
          <InputGroup>
            <Form.Control
              value={text}
              required
              as="textarea"
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
