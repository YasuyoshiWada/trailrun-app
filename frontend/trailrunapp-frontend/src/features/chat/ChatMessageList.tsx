import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import { ChatMessage } from "./types";
import { palette } from "../../styles/palette";



interface Props {
  messages: ChatMessage[];
  currentUser?: string; //自分が送信したかどうかの判定に使う
}

const ChatMessageList: React.FC<Props> = ({ messages, currentUser }) => (
  <List role="list"
  sx={{
    flex: 1,
    overflowY: "auto"
    }}
    >
    {messages.map((m) => {
      const isMine = m.user === currentUser;
      return (
      <ListItem
      key={m.id}
      role="listitem"
      sx={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        }}
        >
        <Box
        sx={{
          maxWidth: "70%",
          px: "0.8rem",
          py: "0.6rem",
          borderRadius: "1rem",
          bgcolor: isMine ? palette.limeGreen : palette.white,
          color: palette.textPrimary,
          textAlign: isMine ? "right" : "left",
        }}>
          {/* <Typography component="p">
            {m.user}
          </Typography> */}
          <Typography component="p">{m.text}</Typography>
        </Box>
      </ListItem>
      );
    })}
  </List>
);

export default ChatMessageList;
