import React, { useState } from "react";
import { Box,Button,TextField } from "@mui/material";

interface Props {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<Props> =  ({onSend}) => {
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
      sx={{ display: "flex", mt: "0.8rem"}}
      >
        <TextField
        value={text}//メッセージtext
        onChange={(e) => setText(e.target.value)}
        label="Message"
        aria-label="message-input"
        sx={{ flexGrow: 1 }}
        />
        <Button type="submit" variant="contained" sx={{ml: "0.4rem"}}>
          送信
        </Button>
      </Box>
  );
};

export default ChatInput;
