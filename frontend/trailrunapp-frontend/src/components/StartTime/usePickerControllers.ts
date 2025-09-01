// src/components/startTime/usePickerControllers.ts
import { useState } from "react";
import type { PickerView } from "./types";

/** 行ごとのピッカー群を制御（開閉はID単位、viewは共有） */
export function useRowPickerController() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [view, setView] = useState<PickerView>("day");

  const onViewChange = (next: PickerView) => {
    setView(next);
  };

  const open = (id: string) => { setOpenId(id); setView("day"); };
  const close = () => { setOpenId(null); setView("day"); };
  const isOpen = (id: string) => openId === id;

  return { isOpen, open, close, view, onViewChange };
}

/** 一括ピッカーを単体制御 */
export function useSinglePickerController() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<PickerView>("day");

  const onViewChange = (next: PickerView) => {
    setView(next);
  };

  const onOpen = () => { setOpen(true); setView("day"); };
  const onClose = () => { setOpen(false); setView("day"); };
  const onAccept = () => { setOpen(false); setView("day"); };

  return { open, onOpen, onClose, onAccept, view, onViewChange };
}
