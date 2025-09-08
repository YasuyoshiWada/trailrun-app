import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { fetchMessages, postMessage } from "./chatApi";
import type { ChatMessage } from "./types";

interface Props {
  roomId: string;
}

const ChatRoom: React.FC<Props> = ({ roomId }) => {
  const [messages, setMessages ] = useState<ChatMessage[]>([]);
  const lastTimestamp = useRef<number>(0);

  const handleSend = async (text: string) => {
    await postMessage(roomId, text);
    const timestamp = Date.now();
    const newMessage: ChatMessage = {
      id: timestamp.toString(),
      user: "You",
      text,
      timestamp,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  //useEffectで３秒に１回サーバーからメッセージを取得
  useEffect(() => {
    const IntervalId = setInterval(async () => {
      const newMessages = await fetchMessages(roomId, lastTimestamp.current);//サーバーアクセス時に最新のtimestampを渡す
      if (!newMessages.length) return;//新しいメッセージがなければ何もしない

      // 最新のメッセージをlastで取得-1とすることで１つでも新しいメッセージがあればstateを更新する
      const last = newMessages[newMessages.length - 1];
        if(!last) return;
      //新しいメッセージがあればstateを更新
        lastTimestamp.current = last.timestamp;
        setMessages((prev) => [...prev, ...newMessages]);
    }, 3000);//3秒ごとにfetchMessagesを実行

    //クリーンアップ関数でインターバルをクリア
    return () => clearInterval(IntervalId);
  }, [roomId]);

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
