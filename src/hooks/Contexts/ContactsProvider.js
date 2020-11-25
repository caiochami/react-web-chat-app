import React, { createContext, useContext } from "react";

import { useStorage } from "../useStorage";
const ContactsContext = createContext();
export function useContacts() {
  return useContext(ContactsContext);
}
export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
