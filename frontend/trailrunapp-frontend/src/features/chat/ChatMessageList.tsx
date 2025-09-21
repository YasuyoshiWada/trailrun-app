import React from "react";
import { List, ListItem, Typography, Box } from "@mui/material";
import { ChatMessage } from "./types";
import { palette } from "../../styles/palette";
import { alpha } from '@mui/material/styles'



interface Props {
  messages: ChatMessage[];
  currentUser?: string; //自分が送信したかどうかの判定に使う
  timestamp?: number; //メッセージの時刻表示
}

const ChatMessageList: React.FC<Props> = ({ messages, currentUser, timestamp }) => (
  <List role="list"
  sx={{
    flex: 1,
    }}
    >
    {messages.map((m) => {
      //メッセージが自分のものかどうかでスタイルを変える
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
          //alphaとはMUIのユーティリティ関数で、色に透明度を追加するために使用される  16進カラー #RRGGBB を rgba(r,g,b,a) に自動変換してくれます
          bgcolor: isMine ? alpha(palette.limeGreen, 0.7) : alpha(palette.lightGray, 0.5),
          color: palette.textPrimary,
          textAlign: isMine ? "right" : "left",
        }}>
          <Typography
          component="p"
          sx={{
            //このstyle通常は単語単位で折り返すが、収まりきらない時だけ途中で切る。
            overflowWrap: "break-word",
            fontSize: "1.6rem",
            fontWeight: "500",
          }}
          >{m.text}</Typography>
          <Typography component="p">
            {m.user} {m.timestamp && new Date(m.timestamp).toLocaleTimeString()}
          </Typography>
        </Box>
      </ListItem>
      );
    })}
  </List>
);

export default ChatMessageList;
