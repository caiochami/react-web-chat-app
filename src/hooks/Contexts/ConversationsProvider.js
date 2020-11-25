import React, { createContext, useContext, useState } from "react";

import { useContacts } from "./ContactsProvider";
import { useStorage } from "../useStorage";
const Conversations = createContext();
export function useConversations() {
  return useContext(Conversations);
}
export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useStorage("conversations", []);
  const { contacts } = useContacts();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  function addMessageToConversation({ recipients, text, sender }) {
    setConversations((prevConversations) => {
      let changed = false;
      const newMessage = { sender, text };

      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          changed = true;
          return {
            ...conversation,
            messages: [...conversation.messages.newMessage],
          };
        }

        return conversation;
      });

      if (changed) {
        return newConversations;
      } else {
        return [...prevConversations, newMessage];
      }
    });
  }

  function sendMessage(recipients, text, id) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;

    return { ...conversation, messages,recipients, selected };
  });



  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage,
  };

  return (
    <Conversations.Provider value={value}>{children}</Conversations.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((el, index) => {
    return el === b[index];
  });
}
