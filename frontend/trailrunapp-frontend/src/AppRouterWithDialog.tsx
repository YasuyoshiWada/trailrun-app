import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import StartTimeSettingDialog from './components/button_popup/StartTimeSettingDialog';
import { categoriesStart } from './data/categories_start';


const AppRouterWithDialogs: React.FC = () => {
const location = useLocation();
const navigate = useNavigate();

// スタート時刻ダイアログを開くときに Nav から渡した「ひとつ前のロケーション」
const background = (location.state as any)?.background;

//スタート時刻ダイアログの表示条件
const isStartTimeDialog = location.pathname === "/start-time";

//保存後やモーダル閉じた時の戻り先をbackgroundのパスか/にする
const handleDialogClose = () => {
  // backgroundのpathnameがあれば戻る、なければ/
  if (background && background.pathname) {
    navigate(background.pathname);
  } else {
    navigate("/");
  }
};

// 仮のonSave実装
const handleSave = (updatedCategories: typeof categoriesStart) => {
   // TODO: 将来的にはここでAPI POST
    console.log("保存データ:", updatedCategories);
   handleDialogClose(); // 保存後に前ページへ戻る（または好きなページへ）
}

return (
  <>
    <AppRoutes />

    <StartTimeSettingDialog
    open={isStartTimeDialog}
    categories={categoriesStart}
    onClose={handleDialogClose}
    onSave={handleSave}
    />
  </>
)
}

export default AppRouterWithDialogs;
