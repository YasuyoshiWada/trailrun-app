import React from "react";
import { Box,Typography,Tabs, Tab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import  type { Room } from "../../data/rooms";
import { palette } from "../../styles/palette";

interface Props {
  rooms: Room[];
}

const ChatPage: React.FC<Props> = ( {rooms }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newRoomId: string) => {
    navigate(`/chat/${newRoomId}`);
  };

  return (
    <Box role="main" sx={{ p: "0.8rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        チャットページ
      </Typography>
      <Tabs
        value={roomId ?? false}
        onChange={handleChange}
        aria-label="チャットルーム"
        sx={{
          mb: "1rem",
          "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: "bold",
          color: palette.textPrimary,
          },
        }}
        >
        {rooms.map((room) => (
          <Tab
            key={room.id}
            label={room.name}
            value={room.id}
            sx={{
              fontSize: "1rem",
              "&.Mui-selected": { color: room.color },
            }}
            />
            ))}
        </Tabs>
      {roomId ? (
        <ChatRoom roomId={roomId} />
      ) : (
        <Typography component="p">ルームを選択してください。</Typography>
      )}
    </Box>
  );
};

export default ChatPage;
