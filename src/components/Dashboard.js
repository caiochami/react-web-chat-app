import React from "react";
import { useConversations } from "../hooks/Contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";
export default function Dashboard({ id }) {
  const {selectedConversation} = useConversations()
  console.log(selectedConversation)
  return (
    <div className="d-flex vh-100">
       <Sidebar id={id} />
      { selectedConversation && <OpenConversation />} 
    </div>
  );
}
