import React, { createContext, useCallback,  useContext,  useEffect, useMemo, useState } from "react";

// 利用者が取り得る権限種別。未ログイン時は null を保持する。
type Role = "admin" | "staff" |  null;

// ログイン時に保存しておく連絡先情報。
type ContactInfo = {
  name: string;
  telnumber: string;
  group?: string;
};

// 認証状態全体を一つのオブジェクトで表現する。
type AuthState = {
  isAuthenticated: boolean;
  role: Role;
  contactInfo: ContactInfo | null;
};

// Context が提供するインターフェース。state に加えて login/logout を公開する。
type AuthContextValue = AuthState & {
  //この場合 Role は "admin" | "staff" | null なので、Exclude<Role, null> は "admin" | "staff" になります。つまり login 関数は "admin" または "staff" のどちらかしか受け取れず、null を渡せないように型で制約している、ということです。
  login: (role: Exclude<Role, null>, info: ContactInfo) => void;
  logout: () => void;
};

// ブラウザの localStorage で利用するキー。
const AUTH_STORAGE_KEY = "authState";

// 初期値。ログアウト時にもこの値へ戻す。
const defaultState: AuthState = {
  isAuthenticated: false,
  role: null,
  contactInfo: null,
};

// 実際の Context。未提供時は undefined を返し、フック側で検出する。
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 起動時に localStorage から状態を復元する。失敗時は安全に初期値を返す。
const loadStoredState = (): AuthState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedValue) {
      return defaultState;
    }

    const parsed = JSON.parse(storedValue) as Partial<AuthState>;
    // データ構造が期待通りか軽く検証し、壊れている場合は破棄する。
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.isAuthenticated === "boolean" &&
      (parsed.role === "admin" || parsed.role === "staff" || parsed.role === null) &&
      (parsed.contactInfo === null || typeof parsed.contactInfo === "object")
    ) {
      return {
        isAuthenticated: parsed.isAuthenticated,
        role: parsed.role,
        contactInfo: parsed.contactInfo ?? null,
      };
    }
  } catch (error) {
    console.warn("Failed to parse auth state from storage, error");
  }

  return defaultState;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Context が保持する実体の state。初期化時に localStorage から復元する。
  const [state, setState] = useState<AuthState>(loadStoredState);

  // state が変わるたびに localStorage へシリアライズし、次回以降へ引き継ぐ。
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // 認証成功時に呼ばれ、state をログイン済みへ更新する。
  const login = useCallback<AuthContextValue["login"]>((role, info) => {
    setState({
      isAuthenticated: true,
      role,
      contactInfo: info,
    });
  }, []);

  // ログアウト時は state を初期化し、保存済みデータも破棄する。
  const logout = useCallback(() => {
    setState(defaultState);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  // 子コンポーネントへ渡す値をメモ化し、無駄な再レンダリングを抑える。
  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
    }),
    [login, logout, state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  // Context から値を取得し、Provider 配下でのみ利用できるようチェックする。
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
