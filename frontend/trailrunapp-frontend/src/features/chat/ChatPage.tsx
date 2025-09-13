import React from "react";
import { Box,Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import  type { Room } from "../../data/rooms";
import { palette } from "../../styles/palette";
import HorizontalScroller from "../../components/HorizontalScroller";
import useResponsive from "../../hooks/useResponsive";

interface Props {
  rooms: Room[];
}

const ChatPage: React.FC<Props> = ( {rooms }) => {
  // 現在のルームIDをURLパラメータから取得
  const { roomId } = useParams<{ roomId: string }>();
  // roomIdに基づいて選択されたルームを取得
  const selectedRoom = rooms.find(room => room.id === roomId);
  const navigate = useNavigate();

  //レスポンシブ対応
  const { isSmallMobile, isMobile } = useResponsive();

  return (
    <Box role="main" sx={{ p: "0.8rem" }}>
      <HorizontalScroller isSmallMobile={isSmallMobile} isMobile={isMobile}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "3rem",
            mb: "1rem",
            width: "100%",
            //小画面時に横スクロールを確実に出す
            minWidth: (isSmallMobile || isMobile) ? `${rooms.length * 120}px` : 0,
          }}
          >
          {rooms.map((room) => {
              const isActive = room.id === roomId;
              return (
              <Box
                key={room.id}
                onClick={() => navigate(`/chat/${room.id}`)}
                sx={{
                flex: "0 0 auto",
                minWidth: (isSmallMobile || isMobile) ? "120px" : "auto",
                px: "1.2rem",
                py: "0.6rem",
                border: "1px solid",
                borderColor: room.color,
                background: isActive ? room.color : palette.white,
                color: isActive ? palette.white : room.color,
                fontSize: (isSmallMobile || isMobile) ? "2.4rem" : "3rem",
                fontWeight: isActive ? "bold" : "normal",
                borderRadius: "1rem",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "background-color 0.2s, color 0.2s, opacity 0.2s",
                "&:hover": { opacity: 0.8 },
                }}
                >
                {room.name}
              </Box>
            )
            })}
        </Box>
        </HorizontalScroller>
          {roomId ? (
            <ChatRoom
            roomId={roomId}
            roomName={selectedRoom ?.name??""}//該当したルームの名前を渡す、無ければ空文字
            />
          ) : (
            <Typography component="p">ルームを選択してください。</Typography>
          )}
    </Box>
  );
};

export default ChatPage;
