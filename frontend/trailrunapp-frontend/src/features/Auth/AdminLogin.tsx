import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { palette } from "../../styles/palette";
import AuthForm from "./components/AuthForm";
import EventName from "./components/EventName";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_CREDENTIALS } from "./constants";


// 遷移元として記録しておきたい最低限の location 情報を表す。
type LocationLike = {
  pathname: string;
  search?: string;
  hash?: string;
  state?: unknown;
};

// location.state に入ってくる想定の値。柔軟に拡張できるようにしておく。
type LocationState = {
  from?: LocationLike;
} & Record<string, unknown>;

const AdminLogin: React.FC = () => {
  // 画面幅に応じてカードサイズを調整するためのフラグ群。
  const { isSmallMobile,isMobile } = useResponsive();
  // 認証処理を実行する login 関数を Context から取得。
  const { login } = useAuth();
  // 遷移元の情報取得と遷移実行のために react-router のフックを利用。
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  // 認証前にアクセスしようとしたページ情報があれば取り出す。
  //location.state は、React Router の navigate や <Link> で渡せる追加の状態オブジェクトです。ログイン前にアクセスしていた保護ページが navigate("/login", { state: { from: location } }) のように呼び出されていると、その state に { from: <元の location> } が入ります。useLocation() で取得した location がその情報を持っているので、location.state で参照しています。
// 末尾の ?.from はオプショナルチェーンです。location.state が undefined でない場合だけ from プロパティを読み取り、未設定なら undefined を返します。ログインページに直接アクセスしたケースでも安全に扱えるようにした書き方です。
  const fromLocation = (location.state as LocationState | undefined)?.from;
  const handleSubmit = useCallback((values: { name: string; telnumber: string; password?: string }) => {
    const name = values.name.trim();
    const password = (values.password ?? "").trim();
    const telnumber = values.telnumber.trim();

    if (!telnumber) {
      setError("電話番号を入力してください。");
      return;
    }

    if (
      name !== ADMIN_CREDENTIALS.name ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      setError("名前またはパスワードが正しくありません。");
      return;
    }

    setError("");
    login("admin", {
      name,
      telnumber,
    });
    // 遷移元情報を組み立て、無ければトップページを指定。
    const destination =
    fromLocation !== undefined
    ? {
      pathname: fromLocation.pathname,
      ...(fromLocation.search ? { search: fromLocation.search } : {}),
      ...(fromLocation.hash ? { hash: fromLocation.hash } : {}),
    }
    : "/";
    // 戻る操作でログインへ戻らないよう replace で遷移を実行。
    navigate(destination, { replace: true, state: fromLocation?.state });
  }, [fromLocation, login, navigate, setError]);

  // ログインカード全体のレイアウトを組み立てる。
  return (
    // 画面全体に背景色を敷きつつ中央にカードを配置。
    <Box
    sx={{
      minHeight: "100vh",
      background: palette.cyan,
      display: "flex",
      alignItems: "center",
      justifyContent:"center",
    }}>
      {/* 中央に表示するログインカードのコンテナ。 */}
      <Box
      sx={{
        width: 750,
        maxWidth: (isSmallMobile || isMobile) ? "70vw" : "92vw",
        maxHeight: (isSmallMobile || isMobile) ? "85vh" : "92vh",
        height:700,
        justifyContent: "center",
        alignItems: "center",
        m:"auto",
        border: 1,
        borderColor: palette.textPrimary,
        borderRadius:3,
        boxShadow: 3,
        background: palette.white
      }}
      >
        {/* eventNameには大会ごとの名前が入る */}
        <EventName eventName={"eventName"} />
        {/* 管理者用のログインフォーム。送信時に Context へログインを通知。 */}
        <AuthForm role={"admin"} onSubmit={handleSubmit} />
        {error && (
          <Typography
          role="alert"
          sx={{
            mt: "1.6rem",
            textAlign: "center",
            color: palette.coralRed,
            fontSize: "1.6rem",
          }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default AdminLogin;
