import React from "react";
import { List, ListItem, Typography } from "@mui/material";


export interface ChatMessage {
  id: string;
  user: string;
  text: string;
}

interface Props {
  messages: ChatMessage[];
}

const ChatMessageList: React.FC<Props> = ({ messages }) => (
  <List role="list" sx={{ height: "300px", overflowY: "auto" }}>
    {messages.map((message) => (
      <ListItem key={message.id} role="listitem" sx={{ display: "block"}}>
        <Typography component="p" sx={{ fontWeight: "bold" }}>
          {message.user}
        </Typography>
        <Typography component="p">{message.text}</Typography>
      </ListItem>
    ))}
  </List>
);

export default ChatMessageList;
