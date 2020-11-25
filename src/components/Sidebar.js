import React from "react";
import { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationOpen = activeKey === CONVERSATIONS_KEY;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container onSelect={setActiveKey} activeKey={activeKey}>
        <Nav variant="tabs" className=" justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="flex-grow-1 border-right overflow-auto">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <div className="p-2 border-top border-right small">
        Connected as: <span className="text-muted">{id}</span>
      </div>
      <Button onClick={() => setModalOpen(true)} className="rounded-0">
        New {conversationOpen ? "Conversation" : "Contact"}
      </Button>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        {conversationOpen ? (
          <NewConversationModal closeModal={() => setModalOpen(false)} />
        ) : (
          <NewContactModal closeModal={() => setModalOpen(false)} />
        )}
      </Modal>
    </div>
  );
}
