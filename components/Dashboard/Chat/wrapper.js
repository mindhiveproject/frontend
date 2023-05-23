import { useState, useEffect } from "react";

import Chats from "./Chats/chatsList";
import AddChat from "./Chats/addChat";
import ChatPage from "./Chats/chatPage";
import AddMembersToChat from "./Chats/addMembers";

export default function ChatWrapper({ user, openedPage, openedChatId }) {
  const [page, setPage] = useState(openedPage);
  const [chatId, setChatId] = useState(openedChatId);
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    if (!openedChatId) {
      setPage("chats");
    } else {
      setChatId(openedChatId);
    }
  }, [openedChatId]);

  const addChat = () => {
    setPage("addchat");
  };

  const openChat = (chatId) => {
    setPage("chatpage");
    setChatId(chatId);
  };

  const goBack = () => {
    setPage(null);
    setChatId(null);
  };

  const openAddMembers = (chatId, chatTitle) => {
    setPage("addmemberstochat");
    setChatId(chatId);
    setChatTitle(chatTitle);
  };

  if (page === "addchat") {
    return <AddChat goBack={goBack} />;
  }

  if (page === "chatpage") {
    return (
      <ChatPage key={chatId} user={user} chatId={chatId} goBack={goBack} />
    );
  }

  if (page === "addmemberstochat") {
    return (
      <AddMembersToChat chatId={chatId} goBack={goBack} chatTitle={chatTitle} />
    );
  }

  return (
    <Chats
      user={user}
      addChat={addChat}
      openChat={openChat}
      openAddMembers={openAddMembers}
    />
  );
}
