import React, {useMemo, useState} from "react";
import { Box, TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { palette } from "../../../styles/palette";
import useResponsive from "../../../hooks/useResponsive";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


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

  return (
      <Box component="form" onSubmit={handleSubmit}
      sx={{
        display:"grid",
        gap:"3rem",
        width: "100%",
        maxWidth: (isSmallMobile || isMobile) ? "30rem" : "48rem",
        mx:"auto"
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
            fontSize: "2rem"
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

        <Button type="submit" variant="contained" size="large"
        sx={{
          fontSize:"2rem",
          backgroundColor: palette.navyBlue,
          "&:hover": {
            backgroundColor: palette.navyBlue,
            opacity: 0.7
          }
        }}>
          {role === "admin" ? "管理者ログイン" : "スタッフログイン"}
        </Button>
      </Box>
  )
}

export default AuthForm;
