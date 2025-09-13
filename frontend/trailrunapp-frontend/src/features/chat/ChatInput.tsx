import React, { useState } from "react";
import { Box,IconButton, TextField } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { palette } from "../../styles/palette";

interface Props {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<Props> =  ({ onSend }) => {
  const [text, setText] = useState("");

  // 入力の変更で useState の text に保持された値を、submit 時に onSend で親へ渡す
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();//本来はページがリロードされる -> それを止める
    const trimmed = text.trim();// textの前後の空白文字を削除
    if (!trimmed) {
      return;
    }
    onSend(trimmed);//trimしたtextを送信
    setText("");//onSendで送信した後のtextをsetText("")で空にする
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      role="form"
      sx={{ display: "flex",
          alignItems: "center",
          mt: "0.8rem",
          p: 0
        }}
      >
        <IconButton
        component="button"
        type="submit"
        aria-label="送信"
        sx={{
          fontSize: "5rem",
          }}>
            <ArrowRightIcon
            sx={{
              fontSize: "5rem",
            }} />
        </IconButton>
        <TextField
        value={text}//メッセージtext
        onChange={(e) => setText(e.target.value)}
        label="Message"
        aria-label="message-input"
        size="medium"
        sx={{
          width: "50%",
        }}
        />
      </Box>
  );
};

export default ChatInput;
