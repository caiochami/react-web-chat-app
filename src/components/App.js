//import { useState } from "react";
import Login from "./Login";
import { useStorage } from "../hooks/useStorage";
import { ContactsProvider } from "../hooks/Contexts/ContactsProvider";
import { ConversationsProvider } from "../hooks/Contexts/ConversationsProvider";
import Dashboard from "./Dashboard";
function App() {
  const [id, setId] = useStorage("id");

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return (
    <ContactsProvider>
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </ContactsProvider>
  );
}

export default App;
