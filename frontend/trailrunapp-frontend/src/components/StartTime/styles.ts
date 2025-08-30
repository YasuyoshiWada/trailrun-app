import type {SxProps, Theme } from "@mui/material/styles"
import { palette } from "../../styles/palette";

export const makeTableCellSx = (isHandset: boolean): SxProps<Theme> => ({
  fontSize: isHandset ? "1.6rem" : "2rem", // カテゴリ表示テーブルのカテゴリなどの文字の大きさ
  textAlign: "center",
  color: palette.textPrimary,
});
//Picker内の様々なUIを変更している関数
export const pickerLayoutSx: SxProps<Theme> ={
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
    padding: "0.6rem 1.6rem",
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

export const makeTextFieldSx = (isHandset: boolean): SxProps<Theme> => ({
   /* 入力フィールド内の右側カレンダーアイコン */
  "& .MuiInputAdornment-root .MuiSvgIcon-root": { fontSize: isHandset ? "4rem" : "2.2rem" },
  /* v8 のセクション表示（年/月/日など） */
  "& .MuiPickersSectionList-root": { fontSize: isHandset ? "3rem" : "2.2rem" },
  //ポップアップを開いたときの「YYYY」「MM」「DD」などの数字が大きくなる部分
  "& .MuiPickersSection-root": { fontSize: "3.2rem" },
})
