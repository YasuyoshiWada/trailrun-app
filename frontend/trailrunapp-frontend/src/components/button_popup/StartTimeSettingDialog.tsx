// src/components/button_popup/StartTimeSettingDialog.tsx
import React, { useEffect, useState } from "react";
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
  FormControlLabel,
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
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ja";
import useResponsive from "../../hooks/useResponsive";
import { palette } from "../../styles/palette";
import  { SxProps, Theme } from "@mui/material/styles";
import type { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker"
import type { DateOrTimeViewWithMeridiem } from "@mui/x-date-pickers/internals";

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
  //カテゴリ編集用
  const [edited, setEdited] = useState<Category[]>([]);
  //チェックボックス用
  const [checked, setChecked] = useState<string[]>([]);
  //一括設定用
  const [bulkTime, setBulkTime] = useState<Dayjs | null>(null);
  //行ごとのピッカー開閉
  const [openPickerId, setOpenPickerId] = useState<string | null>(null);
  //一括pikerを外部制御するためのstate
  const [bulkOpen, setBulkOpen] = useState(false);

  // レスポンシブ判定
  const { isSmallMobile, isMobile } = useResponsive();
  const isHandset = isSmallMobile || isMobile;

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
//チェックボックスのオン・オフをトグルするための関数
  const handleCheck = (catId: string) => {
    setChecked((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };
//チェックされたカテゴリに一括で同じ日付 (bulkTime) を設定する関数
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

  const tableCellSx: SxProps<Theme> = {
    fontSize: isHandset ? "1.6rem" : "2rem",
    textAlign: "center" as const,
    color: palette.textPrimary,
  };

  // ====== ここから：ビュー外部制御（自動で day に戻らないようにする）======
  type PickerView = DateOrTimeViewWithMeridiem; // ← MUIの型をそのまま使う
  const [pickerView, setPickerView] = useState<PickerView>("day");
  const isTimeView = (v: PickerView) =>
    v === "hours" || v === "minutes" || v === "seconds";

  const handleViewChange = (next: PickerView) => {
    // 時刻ビューにいる間は day への自動遷移をブロック
    if (isTimeView(pickerView) && next === "day") return;
    setPickerView(next);
  };

  const handlePickerOpen = (id: string) => {
    setOpenPickerId(id);
    setPickerView("day"); // 開いた直後はカレンダー
  };

  // 行ピッカーは onAccept / onClose で確実に閉じる（理由分岐は使わない）
  const closeRowPicker = () => {
    setOpenPickerId(null);
    setPickerView("day");
  };

  // ====== ここまで：ビュー外部制御 =======


  // DateTimePicker の props をそのまま受け取り、isHandset だけを追加して
  // Mobile/Desktop のどちらを使うか切り替える薄いラッパー。
  // isHandset は内部で分岐にのみ使い、残りの props はそのまま子コンポーネントへ転送（props forwarding）する。
  // vX の型仕様上、アクセシブルなフィールドDOM構造フラグ（第1ジェネリック）は boolean なので <false> を指定。
  type RProps = DateTimePickerProps<false> & {
    isHandset: boolean;
    value: Dayjs | null; //日付はDayjsを採用
    onChange: (v: Dayjs | null) => void; //呼び出し側もDayjsで型安全
    };
    //ResponsiveDateTimePickerにレイアウトによって変更される、mobileとpc対応のPickerを定義している
  const ResponsiveDateTimePicker: React.FC<RProps> = ({ isHandset, ...props }) => {
    return isHandset ? (
    <MobileDateTimePicker {...props} />
    ) : ( <DateTimePicker {...props} />
    )
  };
  //本日の日付の定数
  const today = dayjs();

  // ResponsiveDateTimePicker内のスタイリング一括まとめ
  // 共通で使い回すと楽
    const pickerLayoutSx: SxProps<Theme> = {
      /* ツールバー（上部の「8月 19」や「00:00:00」） */
      "& .MuiPickersToolbar-title": {
        fontSize: "2.4rem",           // ← ここで大きく
        fontWeight: 600,
        lineHeight: 1,
      },
      /* カレンダーヘッダの「8月 2025」 */
      "& .MuiPickersCalendarHeader-label": {
        fontSize: "3rem",           // ← 見出しを大きく
        fontWeight: 600,
      },
        /* ===== 年／月ビューのフォントを大きく ===== */
      /* 年選択（2017/2018/… のグリッド） */
      "& .MuiYearCalendar-root .MuiYearCalendar-button": {
        fontSize: "3rem",             // ← 西暦ボタンを大きく
        minWidth: 64,
        minHeight: 40,
        lineHeight: "1.2rem"
      },
      /* 選択時も同サイズで維持 */
      "& .MuiYearCalendar-root .MuiPickersYear-yearButton.Mui-selected": {
        fontSize: "2.2rem",
      },
      /* 月選択（1月〜12月のボタン） */
      "& .MuiMonthCalendar-root .MuiMonthCalendar-button": {
        fontSize: "3rem",             // ← 月ボタンを大きく
        minWidth: 64,
        minHeight: 40,
      },
          /* ===== 上部のカレンダー／時計アイコンを大きく ===== */
      /* v6: レイアウト内タブのアイコン */
      "& .MuiPickersLayout-tabs .MuiTab-root .MuiSvgIcon-root": {
        fontSize: "3.6rem",
      },
      /* ついでにタブ自体の高さも少し大きく */
      "& .MuiPickersLayout-tabs .MuiTab-root": {
        minHeight: 48,
        padding: "6px 16px",
      },
      // 日付選択の曜日の文字を変更している
      "& .MuiTypography-root.MuiTypography-caption.MuiDayCalendar-weekDayLabel": {
        fontSize: "3rem",
        fontWeight: 600,
        mx:"0.6rem"
      },
      // カレンダーの左上に出る月日の表示のフォントを変更している
      "& .MuiTypography-root.MuiTypography-h4.MuiPickersToolbarText-root": {
        fontSize: "3rem"
      },
      "& .MuiTypography-root.MuiTypography-subtitle1.MuiPickersToolbarText-root": {
        fontSize: "3rem"
      },
      //カレンダー内の日にちのフォントを変更している
      "& .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin": {
        fontSize: "3rem"
      },
       /* カレンダー／時間リスト側（ポータル内） */
      "& .MuiPickersDay-root": { fontSize: "2.8rem", width: 48, height: 48 },
      "& .MuiPickersArrowSwitcher-button .MuiSvgIcon-root": { fontSize: "2rem" },
      /* 時刻ビュー（分割リスト） 時間、分、秒のフォント*/
      "& .MuiMultiSectionDigitalClockSection-item": { fontSize: "2.8rem", minHeight: 40 },
       /* 時刻ビュー（単一縦リスト） */
      "& .MuiDigitalClock-item": { fontSize: "2.8rem", minHeight: 40 },
      /* フッターのボタン */
      "& .MuiPickersActionBar-root .MuiButton-root": { fontSize: "1.6rem" },
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
              <ResponsiveDateTimePicker
              isHandset={isHandset}
              //現在より過去を選択できない
              disablePast
              open={openPickerId === cat.id}
              onOpen={() => handlePickerOpen(cat.id)}
              onClose={closeRowPicker}
              onAccept={closeRowPicker}
              thresholdToRenderTimeInASingleColumn={0} // 常にドラム3列で安定
              value={cat.startTime ? dayjs(cat.startTime) : null}
              onChange={(val: Dayjs | null) => handleTimeChange(cat.id, val)}
              ampm={false}
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
              format="YYYY/MM/DD HH:mm:ss"
              //時間指定ロールを1刻みに設定している
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              closeOnSelect={false}
              //  reduceAnimationsはモバイルでの体感を良くする
              reduceAnimations
              slotProps={{
                  textField: {
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
                  layout: { sx: pickerLayoutSx },
                  // アイコン（右側ボタン）経由では開けるようにする
                  openPickerButton: {
                    onClick: () => setOpenPickerId(cat.id),
                  },
                  dialog: { keepMounted: true }, // ← 内部 Dialog を保持
                  // カレンダーの下のキャンセル、次へボタン
                  actionBar: { actions: ["cancel", "accept"],
                  // カレンダーの下のキャンセル、次へボタンのスタイル指定
                sx: {
                  '& .MuiButton-root': {
                    fontSize: '2.6rem',
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
                fontSize: "3rem",
                fontWeight: 600,
                color: palette.textPrimary,
              }}
            >
              {cat.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <FormControlLabel
                labelPlacement="start" //ラベルを左,チェックを右に
                sx={{
                  m: 0,
                  gap: "0.2rem",
                  ".MuiFormControlLabel-label": {
                    fontSize: "3rem",
                    color: palette.darkGray,
                    fontWeight: "bold",
                  },
                }}
                control={
                  <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: "5rem" },
                    p: 0.5,
                  }}
                  checked={checked.includes(cat.id)}
                  onChange={() => handleCheck(cat.id)}
                />
                }
                  label="一括"
                  />
            </Box>
          </Box>

          <Divider sx={{ mb: 0.6 }} />

          {/* 下段: ピッカー（全幅） */}
          <ResponsiveDateTimePicker
            isHandset={isHandset}
            //現在より過去を選択できない
            disablePast
            open={openPickerId === cat.id}
            onOpen={() => handlePickerOpen(cat.id)}
            onClose={closeRowPicker}
            onAccept={closeRowPicker}
            view={pickerView}
            onViewChange={handleViewChange}
            thresholdToRenderTimeInASingleColumn={0}
            value={cat.startTime ? dayjs(cat.startTime) : null}
            onChange={(val: Dayjs | null) => handleTimeChange(cat.id, val)}
            ampm={false}
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            format="YYYY/MM/DD HH:mm:ss"
            //時間指定ロールを1刻みに設定している
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            closeOnSelect={false}
            // reduceAnimationsはモバイルでの体感をよくします
            reduceAnimations
            slotProps={{
              /* 入力フィールド（表示テキストのフォントを確実に大きくするのは field） */
              textField: {
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
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: "4rem" },

                  /* v8 のセクション表示（年/月/日など） */
                  "& .MuiPickersSectionList-root": { fontSize: "3rem" },
                  "& .MuiPickersSection-root": { fontSize: "2.2rem" },
                },
              },

              /* カレンダー／時間リスト側（ポータル内） */
              layout: { sx: pickerLayoutSx },

              /* 右側のカレンダーアイコン → ここだけで開く */
              openPickerButton: {
                onClick: () => setOpenPickerId(cat.id),
              },

              /* フッターの「キャンセル / 次へ」 */
              actionBar: {
                actions: ["cancel", "accept"],
                sx: { "& .MuiButton-root": { fontSize: "2.6rem",  color: palette.navyBlue } },
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
          fontSize: isHandset ? "4rem" : "2.4rem",
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
          {/* MobileとPCのレイアウトの分岐コード */}
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
            <ResponsiveDateTimePicker
            isHandset={isHandset}
            //現在より過去を選択できない
            disablePast
           // ★ 一括ピッカーは“完全外部制御”
            open={bulkOpen}
            onOpen={() => {
              setBulkOpen(true);
              setPickerView("day");
            }}
            onClose={() => {
              setBulkOpen(false);
              setPickerView("day");
            }}
            onAccept={() => {
              setBulkOpen(false);
              setPickerView("day");
            }}
            view={pickerView}
            onViewChange={handleViewChange}
            thresholdToRenderTimeInASingleColumn={0}
            value={bulkTime}
            onChange={(v: Dayjs | null) => setBulkTime(v)}
            ampm={false}
            views={["year", "month", "day", "hours", "minutes", "seconds"]}
            format="YYYY/MM/DD HH:mm:ss"
            closeOnSelect={false}
            //時間指定ロールを1刻みに設定している
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            slotProps={{
                textField: {
                  size: "medium",
                  fullWidth:  true,
                  label: "一括時刻指定",
                  //labelのフォントサイズ調整
                  InputLabelProps: {
                    sx: {
                      fontSize: isHandset ? "3rem" : "2rem"
                    }
                  },
                  // 文字サイズの本命（Field実装にも効くセレクタをまとめて上書き）
                  sx: {
                    /* 右側アイコン */
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: "3.2rem" },

                    /* v8 のセクション表示（年/月/日など） */
                    "& .MuiPickersSectionList-root": { fontSize: isHandset ? "3rem" : "1.4rem"},
                    "& .MuiPickersSection-root": { fontSize: "2rem" },
                  },
                },
                  /* カレンダー／時間リスト側（ポータル内） */
              layout: {sx: pickerLayoutSx },
                // フッターの「キャンセル / 次へ」
                actionBar: {
                  actions: ["cancel", "accept"],
                  sx: { "& .MuiButton-root": { fontSize: "2.6rem",  color: palette.navyBlue } },
                },
              }}
            />

          </Box>

          {/* 右：キャンセル / 保存 */}
          <Box
          sx={{
            display: "flex",
            gap: isHandset ? 1.5 : 1,
            }}
            >
            <Button
                sx={{ fontSize:"2.4rem" }}
                variant="outlined"
                onClick={handleBulkApply}
                disabled={checked.length === 0 || !bulkTime}
              >
                一括適用
              </Button>
            <Button
              onClick={onClose}
              sx={{
                fontSize: "2.6rem",
                color: palette.darkGray,
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={() => onSave(edited)}
              variant="contained"
              sx={{
                fontSize: isHandset ? "2.4rem" : "1.8rem",
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
