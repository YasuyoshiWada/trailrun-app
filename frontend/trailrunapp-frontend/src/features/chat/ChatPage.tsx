import React from "react";
import { Box,Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";


const ChatPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <Box role="main" sx={{ p: "0.8rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        チャットページ
      </Typography>
      {roomId ? (
        <ChatRoom roomId={roomId} />
      ) : (
        <Typography component="p">ルームを選択してください。</Typography>
      )}
    </Box>
  );
};

export default ChatPage;
