// src/components/button_popup/StartTimeSettingDialog.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import {
  DateTimePicker,
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import useResponsive from "../../hooks/useResponsive";
import { palette } from "../../styles/palette";

type Category = {
  id: string;
  name: string;
  startTime: string | null; // ISO文字列
};

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSave: (categories: Category[]) => void;
};

const StartTimeSettingDialog: React.FC<Props> = ({
  open,
  categories,
  onClose,
  onSave,
}) => {
  const [edited, setEdited] = useState<Category[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  //一括設定用
  const [bulkTime, setBulkTime] = useState<Dayjs | null>(null);
  //カテゴリのdatePicker,open,closeを明確に
  const [openPickerId, setOpenPickerId] = useState<string | null>(null);

  // レスポンシブ判定
  const { isSmallMobile, isMobile } = useResponsive();
  const isHandset = isSmallMobile || isMobile;

  // ピッカー切替（型が強いので any キャストで素直に）
  const Picker = useMemo(
    () => (isHandset ? (MobileDateTimePicker as any) : (DateTimePicker as any)),
    [isHandset]
  );

  useEffect(() => {
    dayjs.locale("ja");
    setEdited(categories);
    setChecked([]);
  }, [categories, open]);

  const handleTimeChange = (catId: string, value: Dayjs | null) => {
    setEdited((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? { ...cat, startTime: value ? value.toISOString() : null }
          : cat
      )
    );
  };

  const handleCheck = (catId: string) => {
    setChecked((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const handleBulkApply = () => {
    if (!bulkTime) return;
    setEdited((prev) =>
      prev.map((cat) =>
        checked.includes(cat.id)
          ? { ...cat, startTime: bulkTime.toISOString() }
          : cat
      )
    );
  };

  const tableCellSx = {
    fontSize: isHandset ? "1.6rem" : "2rem",
    textAlign: "center" as const,
    color: palette.textPrimary,
  };

  // --- デスクトップ: 従来どおりテーブル表示 ---
  const DesktopTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={tableCellSx}>カテゴリ</TableCell>
          <TableCell sx={tableCellSx}>スタート時刻</TableCell>
          <TableCell sx={tableCellSx}>一括設定</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {edited.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell sx={tableCellSx}>{cat.name}</TableCell>
            <TableCell>
              <Picker
              open={openPickerId === cat.id}
              onOpen={() => setOpenPickerId(cat.id)}
              onClose={() => setOpenPickerId(null)}

                value={cat.startTime ? dayjs(cat.startTime) : null}
                onChange={(val: Dayjs | null) => handleTimeChange(cat.id, val)}
                ampm={false}
                views={["year", "month", "day", "hours", "minutes", "seconds"]}
                format="YYYY/MM/DD HH:mm:ss"
                closeOnSelect={false}
                //  reduceAnimationsはモバイルでの体感を良くする
                reduceAnimations
                slotProps={{
                  field: {
                    size: "medium",
                    fullWidth: true,
                    // フィールドクリックでポップアップを開かせたくない場合
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),

                    // 手入力を許可（readOnlyになってしまう版への対策）
                    inputProps: {
                      readOnly: false,
                      inputMode: "numeric",
                      placeholder: "YYYY/MM/DD HH:mm:ss",
                      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                        e.currentTarget.select();
                      },
                    },

                    // 文字サイズの本命（Field実装にも効くセレクタをまとめて上書き）
                    sx: {
                      /* 右側アイコン */
                      "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: "2.2rem" },

                      /* v8 のセクション表示（年/月/日など） */
                      "& .MuiPickersSectionList-root": { fontSize: "2.2rem" },
                      "& .MuiPickersSection-root": { fontSize: "2.2rem" },
                    },
                  },
                  // アイコン（右側ボタン）経由では開けるようにする
                  openPickerButton: {
                    onClick: () => setOpenPickerId(cat.id),
                  },
                  actionBar: { actions: ["cancel", "accept"],
                  dialog: { keepMounted: true }, // ← 内部 Dialog を保持
                sx: {
                  '& .MuiButton-root': {
                    fontSize: '1.6rem',
                    color: palette.navyBlue,
                  },
                },
              },
                }}
              />
            </TableCell>
            <TableCell sx={tableCellSx}>
              <Checkbox
                sx={{
                  ...tableCellSx,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
                checked={checked.includes(cat.id)}
                onChange={() => handleCheck(cat.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  // --- モバイル: 1カテゴリ = 2段（上段: ラベル+チェック、下段: ピッカー） ---
  const MobileList = () => (
    <Stack spacing={2}>
      {edited.map((cat) => (
        <Box
          key={cat.id}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 1.2,
            bgcolor: "background.paper",
            ...tableCellSx,
          }}
        >
          {/* 上段: カテゴリ名 + 一括チェック */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 0.6,
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 600,
                color: palette.textPrimary,
              }}
            >
              {cat.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography sx={{
                fontSize: "1.8rem",
                color: palette.darkGray,
                fontWeight: "bold",
                }}
                >
                一括
              </Typography>
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 24 },
                  p: 0.5,
                }}
                checked={checked.includes(cat.id)}
                onChange={() => handleCheck(cat.id)}
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 0.6 }} />

          {/* 下段: ピッカー（全幅） */}
          <Picker
            open={openPickerId === cat.id}
            onOpen={() => setOpenPickerId(cat.id)}
            onClose={() => setOpenPickerId(null)}

            value={cat.startTime ? dayjs(cat.startTime) : null}
            onChange={(val: Dayjs | null) => handleTimeChange(cat.id, val)}
            ampm={false}
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            format="YYYY/MM/DD HH:mm:ss"
            closeOnSelect={false}
            // reduceAnimationsはモバイルでの体感をよくします
            reduceAnimations
            slotProps={{
              /* 入力フィールド（表示テキストのフォントを確実に大きくするのは field） */
              field: {
                size: "medium",
                fullWidth: true,
                // フィールドクリックでポップアップを開かせたくない場合
                onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),

                // 手入力を許可（readOnlyになってしまう版への対策）
                inputProps: {
                  readOnly: false,
                  inputMode: "numeric",
                  placeholder: "YYYY/MM/DD HH:mm:ss",
                  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                    e.currentTarget.select();
                  },
                },

                // 文字サイズの本命（Field実装にも効くセレクタをまとめて上書き）
                sx: {
                  /* 右側アイコン */
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: "2.2rem" },

                  /* v8 のセクション表示（年/月/日など） */
                  "& .MuiPickersSectionList-root": { fontSize: "2.2rem" },
                  "& .MuiPickersSection-root": { fontSize: "2.2rem" },
                },
              },

              /* カレンダー／時間リスト側（ポータル内） */
              layout: {
                sx: {
                  "& .MuiPickersDay-root": { fontSize: "1.8rem", width: 48, height: 48 },
                  "& .MuiDayCalendar-weekDayLabel": { fontSize: "1.6rem" },
                  "& .MuiPickersCalendarHeader-label": { fontSize: "1.6rem" },
                  "& .MuiPickersArrowSwitcher-button .MuiSvgIcon-root": { fontSize: "2rem" },

                  /* 時刻ビュー（分割リスト） */
                  "& .MuiMultiSectionDigitalClockSection-item": {
                    fontSize: "1.8rem",
                    minHeight: 40,
                  },
                  /* 時刻ビュー（単一縦リスト） */
                  "& .MuiDigitalClock-item": { fontSize: "1.8rem", minHeight: 40 },

                  /* フッターのボタン */
                  "& .MuiPickersActionBar-root .MuiButton-root": { fontSize: "1.6rem" },
                },
              },

              /* 右側のカレンダーアイコン → ここだけで開く */
              openPickerButton: {
                onClick: () => setOpenPickerId(cat.id),
              },

              /* フッターの「キャンセル / 次へ」 */
              actionBar: {
                actions: ["cancel", "accept"],
                sx: { "& .MuiButton-root": { fontSize: "1.6rem" } },
              },
            }}
          />
        </Box>
      ))}
    </Stack>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isHandset}
      maxWidth="md"
      fullWidth
      disableEnforceFocus //ネストしたモーダルと相性をよくする
      disableRestoreFocus
      keepMounted
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: isHandset ? "1.9rem" : "2.4rem",
          fontWeight: "bold",
          color: palette.navyBlue,
        }}
      >
        スタート時刻設定
      </DialogTitle>

      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ja"
        localeText={{ okButtonLabel: "次へ", cancelButtonLabel: "キャンセル" }} //日付時刻設定のボタンの部分の文言
      >
        <DialogContent>
          {isHandset ? <MobileList /> : <DesktopTable />}
        </DialogContent>

        <DialogActions
          sx={{
            px: "2.2rem",
            pb: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            flexWrap: "wrap",
          }}
        >
          {/* 左：一括時刻指定 + 一括適用 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            <Picker
              value={bulkTime}
              onChange={(v: Dayjs | null) => setBulkTime(v)}
              ampm={false}
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
              format="YYYY/MM/DD HH:mm:ss"
              closeOnSelect={false}
              slotProps={{
                field: {
                  size: "medium",
                  fullWidth: "true",
                  label: "一括時刻指定",
                  //labelのフォントサイズ調整
                  InputLabelProps: {
                    sx: {
                      fontSize: "1.6rem"
                    }
                  },
                  // 文字サイズの本命（Field実装にも効くセレクタをまとめて上書き）
                  sx: {
                    /* 右側アイコン */
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: "2.2rem" },

                    /* v8 のセクション表示（年/月/日など） */
                    "& .MuiPickersSectionList-root": { fontSize: "1.6rem" },
                    "& .MuiPickersSection-root": { fontSize: "2rem" },
                  },
                },
                  // カレンダーの日付セル（数字）
                day: {
                  sx: { fontSize: "1.6rem", width: 48, height: 48 },
                },
                  // 年/月のボタン（年選択/月選択ビューを使う場合）
                yearButton: { sx: { fontSize: "1.4rem" } },
                monthButton: { sx: { fontSize: "1.4rem" } },
                // カレンダーヘッダー（月名・矢印など）
                calendarHeader: {
                  sx: {
                    "& .MuiPickersCalendarHeader-label": { fontSize: "1.4rem" },
                  },
                },
                // フッターの「キャンセル / 次へ」
                actionBar: {
                  actions: ["cancel", "accept"],
                  sx: { "& .MuiButton-root": { fontSize: "1.6rem" } },
                },
              }}
            />
            <Button
              sx={{ fontSize:"2rem" }}
              variant="outlined"
              onClick={handleBulkApply}
              disabled={checked.length === 0 || !bulkTime}
            >
              一括適用
            </Button>
          </Box>

          {/* 右：キャンセル / 保存 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={onClose}
              sx={{
                fontSize: "1.8rem",
                color: palette.darkGray,
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => onSave(edited)}
              variant="contained"
              sx={{
                fontSize: isHandset ? "1.6rem" : "1.8rem",
                color: palette.white,
                background: palette.navyBlue,
              }}
            >
              保存
            </Button>
          </Box>
        </DialogActions>
      </LocalizationProvider>
    </Dialog>
  );
};

export default StartTimeSettingDialog;
