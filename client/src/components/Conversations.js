import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../hooks/Contexts/ConversationsProvider";
export default function Contacts() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
          key={index}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
