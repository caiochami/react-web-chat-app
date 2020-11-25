import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../hooks/Contexts/ContactsProvider";
import { useConversations } from "../hooks/Contexts/ConversationsProvider";
export default function NewContactModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return prevId !== contactId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                value={selectedContactIds.includes(contact.id)}
                onChange={() => handleCheckboxChange(contact.id)}
                type="checkbox"
                label={contact.name}
              />
            </Form.Group>
          ))}

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
