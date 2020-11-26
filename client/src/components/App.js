//import { useState } from "react";
import Login from "./Login";
import { useStorage } from "../hooks/useStorage";
import { ContactsProvider } from "../hooks/Contexts/ContactsProvider";
import { ConversationsProvider } from "../hooks/Contexts/ConversationsProvider";
import Dashboard from "./Dashboard";
import SocketProvider from "../hooks/Contexts/SocketProvider";
function App() {
  const [id, setId] = useStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return (
    <ContactsProvider>
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </ContactsProvider>
  );
}

export default App;
