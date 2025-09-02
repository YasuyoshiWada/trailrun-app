import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatMessageList, { ChatMessage } from "./ChatMessageList";
import ChatInput from "./ChatInput";

interface Props {
  roomId: string;
}

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const [messages, setMessages ] = useState<ChatMessage[]>([]);

  const handleSend = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Box sx={{ p: "0.8rem" }}>
      <Typography component="h2" variant="h6" sx={{ mb: "0.8rem"}}>
        Room: {roomId}
      </Typography>
      <ChatMessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </Box>
  );
};

export default ChatRoom;
