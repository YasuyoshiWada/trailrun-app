import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { fetchMessages, postMessage } from "./chatApi";
import type { ChatMessage } from "./types";
import {palette} from "../../styles/palette";
import useResponsive from "../../hooks/useResponsive";

interface Props {
  roomId: string;
  roomName?: string;
}

const ChatRoom: React.FC<Props> = ({ roomId, roomName }) => {
  const [messages, setMessages ] = useState<ChatMessage[]>([]);
  const lastTimestamp = useRef<number>(0);
//レスポンシブ対応
  const { isSmallMobile, isMobile } = useResponsive();
  // roomIdが変わったらメッセージとタイムスタンプをリセット
  useEffect(() => {
    setMessages([]);
    lastTimestamp.current = 0;
  }, [roomId]);

const handleSend = async (text: string) => {
  try {
    const { id, timestamp } = await postMessage(roomId, text);
    //ここのuserをChatMessageListのprops currentUserと合わせる
    const newMessage: ChatMessage = { id, user: "You", text, timestamp };
    lastTimestamp.current = timestamp;            // ← 送信直後に更新
    setMessages(prev => [...prev, newMessage]);
  } catch (err) {
    console.error("Failed to post message", err); // ← エラーハンドリング
  }
};

   //useEffectで３秒に１回サーバーからメッセージを取得し、
  //空配列またはエラー時にポーリングを停止
  useEffect(() => {
    const IntervalId = setInterval(async () => {
      try {
        ;//サーバーアクセス時に最新のtimestampを渡す
          const newMessages = await fetchMessages
          (roomId,
            lastTimestamp.current
          );
          if(!newMessages.length) {
            clearInterval(IntervalId);
            return;
          }

      // 最新のメッセージをlastで取得-1とすることで１つでも新しいメッセージがあればstateを更新する
    const last = newMessages[newMessages.length - 1];
        if(!last) {
          clearInterval(IntervalId);
          return;
        }
      //新しいメッセージがあればstateを更新
        lastTimestamp.current = last.timestamp;
        setMessages((prev) => [...prev, ...newMessages]);
    } catch (e) {
      clearInterval(IntervalId);
    }
  }, 3000);//3秒ごとにfetchMessagesを実行

    //クリーンアップ関数でインターバルをクリア
    return () => clearInterval(IntervalId);
  }, [roomId]);

  return (
    <Box sx={{
      p: "0.8rem",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minHeight: 0, //親要素の高さを超えた場合にスクロールバーを表示するために必要
      height: "100%",
      }}>
      <Typography
      component="h2"
      variant="h3"
      sx={{ mb: "0.8rem"}}>
        RoomName: {roomName}
      </Typography>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        minHeight: 0, //子要素の高さが親要素を超えた場合にスクロールバーを表示するために必要
        }}>
        {/* 送信直後にローカルへ追加するメッセージは user: "You" を付与。上のconst newMassageのuserとcurrentUserを一致させてChatMessageListでメッセージを右側に表示する判定を加えている */}
        <Box
        sx={{
        flex: 1,
        minHeight: 0, //親要素の高さを超えた場合にスクロールバーを表示するために必要
        height: "100%",
        overflowY: "auto",
        }}
        >
          <ChatMessageList
          messages={messages}
          currentUser="You"
        />
        </Box>
        <Box
        sx={{
        position: "sticky",
        bottom: 0,
        zIndex: 1,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: palette.lightGray,
        pt: "0.8rem",
        pb: isSmallMobile || isMobile ? "6.8rem" : "0.4rem", //モバイル時はホームバー分の余白を追加
        }}>
          <ChatInput onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatRoom;
