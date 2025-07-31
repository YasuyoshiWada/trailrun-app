import { useNavigate } from "react-router-dom";
import { RefreshButton } from "./RefreshButton";
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';

export function BackToDashboardButton() {
  const navigate = useNavigate();

  return (
    <RefreshButton
    onClick={() => navigate("/")} //to dashboard
    tooltip="ダッシュボードに戻る"
    icon={<ReplyAllOutlinedIcon sx={{ fontSize: "2.5rem"}} />}
    />
  )
}
