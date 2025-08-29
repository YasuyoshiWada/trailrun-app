import React, {useMemo, useState} from "react";
import { Box, TextField, IconButton, InputAdornment, Button,Typography } from "@mui/material";
import { palette } from "../../../styles/palette";
import useResponsive from "../../../hooks/useResponsive";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthButton from "./AuthButton";
import { Link as RouterLink } from "react-router-dom";


type Role = "admin" | "staff";

type FieldType = "text" | "password";
type FieldConfig = {
  name: "name" | "group" | "password";
  label: string;
  type: FieldType;
  required?: boolean;
  autoComplete?: string;
};

type Props = {
  role: Role;
  onSubmit?: (values: { name: string; group: string; password?: string}) => void;
};



const AuthForm:React.FC<Props> = ({role, onSubmit}) => {
  //mobile対応
  const {isSmallMobile, isMobile} = useResponsive();
  //役割に応じて表示フィールドを決定
  const fields: FieldConfig[] = useMemo(() => {
    const base: FieldConfig[] = [
      {name: "name", label: "名前", type: "text", required: true, autoComplete: "name" },
      {name: "group", label: "所属", type: "text", autoComplete: "organization" },
    ];
    if (role === "admin") {
      base.push({ name: "password", label: "パスワード",type: "password", required: true, autoComplete: "current-password"});
    }
    return base;
  }, [role] );

  //簡易的なローカル state (hook-form へ差し替え可能)
const [values, setValues] = useState<{ [k in FieldConfig["name"]]?: string }>({});
const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name: FieldConfig["name"]) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues(v => ({...v, [name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name: values.name || "",
      group: values.group || "",
      ...(role === "admin" ? {password: values.password || "" } : {}),
    });
  };

  // モバイルの幅とPCの幅でgapを分ける定義
  const baseGapRem = isSmallMobile ? 5 : isMobile ? 7 :3;
  // staffのページは入力フィールドが１個足りないので、その分のgapを追加する
  const gapRem = role === "staff" ? baseGapRem + 5 :baseGapRem;
  const formGap = `${gapRem}rem`;
  // モバイルとPCでmarginTopを分ける定義
  const baseMtRem = isSmallMobile ? -5 : 0;
  //staffのページは入力フィールドが１個足りないので、その分のmarginTopを追加する,staffのmobileとpcでmarginTopの追加数を分けている。
  const gapMtRem =
    baseMtRem +
    (role === "staff" ? -5 : 1) +
    //400px以下のmarginTop
    (role === "staff" && (isSmallMobile) ? 2 :0) +
    //400px-600pxのmarginTop
    (role === "staff" && (isMobile) ? 7 :3);
  const MtGap = `${gapMtRem}rem`;

  return (
      <Box component="form" onSubmit={handleSubmit}
      sx={{
        display:"grid",
        gap:formGap,
        width: "100%",
        maxWidth: isSmallMobile ? "27rem" : isMobile ? "30rem" : "48rem",
        mx:"auto",
      }}
      >
        {fields.map(f => (
        <TextField
        key={f.name}
        variant="outlined"
        label={f.label}
        name={f.name}
        fullWidth
        {...(f.required ? { required: true } : {})}
        type={f.type === "password" ?( showPassword ? "text" : "password") : "text"}
        value={values[f.name] ?? ""}
        onChange={handleChange(f.name)}
        {...(f.autoComplete ? { autoComplete: f.autoComplete } : {})}
        // 共通スタイル(枠線色など)をここで統一
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: palette.gray },
            "&:hover fieldset": { borderColor: palette.coralRed, opacity: 0.3,borderWidth: 1 },
            "&.Mui-focused fieldset": { borderColor: palette.coralRed,opacity: 0.5, borderWidth: 2 },
          },
          // 入力文字とプレースホルダ
          "& .MuiInputBase-input": {
            fontSize: "2rem",
          },
          // ラベル（「名前」「所属」「パスワード」）
          "& .MuiInputLabel-root": {
            fontSize: "2.5rem",
          },
          // 右端の目アイコンの大きさ
          "& .MuiSvgIcon-root": {
            fontSize: "3rem",
          },
        }}
        InputProps={
          f.type === "password"
          ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                aria-label="パスワード表示切替"
                onClick={() => setShowPassword(s => !s)}
                edge="end"
                tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          : {}
        }
        />
        ))}

        <AuthButton>
        管理者ログイン
        </AuthButton>
        <Box
        sx={{
          mt: MtGap,
          textAlign: "center",
        }}>
          <Typography
          component={RouterLink}
          to={role === "admin" ? "/login/staff" : "/login/admin"} // ← 遷移先を切り替え
          sx={{
            fontSize:"2rem",
            textDecoration: "none",   // デフォルトの下線を消す
            color: palette.textPrimary,  // リンクの色（お好みで）
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
      },
          }}
          align="center"
          >
            {role === "admin" ? "スタッフの方はこちら" : "管理者の方はこちら"}
          </Typography>
        </Box>
      </Box>
  )
}

export default AuthForm;
