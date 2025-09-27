import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/Auth/AuthContext";

// 認証が必要なルートを保護し、未ログインならログインページへ誘導する。

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  // 現在のログイン状態をグローバル Auth コンテキストから取得。
  const { isAuthenticated } = useAuth();
  // ユーザーがアクセスしようとした元の URL を保持する。
  const location = useLocation();

  if (!isAuthenticated) {
    // location.state が既に存在していれば merge できるよう安全に取り出す。
    const locationState =
      location.state && typeof location.state === "object" ? location.state : undefined;

      return (
        <Navigate
          to="/login/admin"
          replace
          state={{
            // ログイン成功後に元のページへ送り返すための手がかり。
            from: location,
            ...(locationState ?? {}),
          }}
        />
      );
  }

  // 認証済みであれば本来のコンテンツをそのまま表示。
  return children;
};

export default ProtectedRoute;
