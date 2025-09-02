import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";


const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string}>();
  if (!roomId) {
    return null;
  }

  return (
    <Box role="main" sx={{ p: "0.8rem" }}>
      <ChatRoom roomId={roomId} />
    </Box>
  );
};

export default ChatPage;
