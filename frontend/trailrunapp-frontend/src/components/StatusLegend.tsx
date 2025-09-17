import React, { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { palette } from "../styles/palette";
import { getStatusIcon } from "../utils/getStatusIcon";

type StatusLegendProps = {
  isSmallMobile?: boolean,
  isMobile?:boolean,
  onStatusClick?: (statusLabel: string) => void;
  selectedStatus?: string | undefined;
}

type StatusListItem ={
  label: string;
  color: string;
  iconName: string
}

const StatusLegend: React.FC< StatusLegendProps> = ({
  isSmallMobile,
  isMobile,
  onStatusClick,
  selectedStatus,
}) => {
   // hover中のstatus labelを記憶
  const [ hovered, setHovered ] = useState<string | null>(null);
  const [statusList, setStatusList] = useState<StatusListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // アンマウント後の setState を防ぐためのフラグ

    // ステータスデータをAPIから取得する非同期関数

    const fetchStatuses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/statuses');
        if (!response.ok) {
          throw new Error(response.statusText || 'Failed to fetch statuses');
        }
        //fetchのレスポンスをjson形式でパース
        const data = await response.json();
        if(!isValidStatusList(data)){
          throw new Error('Invalid status response');
        }

        if (isMounted) {
          setStatusList(data);//データをセット,状態更新
        }
        //promiseのエラーをキャッチ(例外処理)fetchが失敗した場合,通信エラー、ステータスエラーなど
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError('ステータスの取得に失敗しました');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStatuses();

    return () => {
      isMounted = false; // クリーンアップ関数でマウント状態を更新、画面遷移などでコンポーネントがアンマウントされた場合にsetStateを防ぐ
    };
  }, []);

  const isResponsive = isSmallMobile || isMobile;
  const statusCount = statusList.length > 0 ? statusList.length : 1;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: isResponsive ? 'nowrap' : 'wrap',
        gap: '2.4rem',
        mb: '2.4rem',
        justifyContent:'flex-start',
        width:"100%",
        minWidth: isResponsive ? `${statusList.length * 120}px` : '0',
      }}
      >
        {loading && (
          <Typography sx={{ fontSize: '1.6rem', color: palette.textPrimary }}>
            ステータスを読み込み中...
          </Typography>
        )}
        {!loading && error && (
          <Typography sx={{ fontSize: '1.6rem', color: palette.coralRed }}>
            {error}
          </Typography>
        )}
        {!loading && !error && statusList.length === 0 && (
          <Typography sx={{ fontSize: '1.6rem', color: palette.textPrimary }}>
            ステータスが存在しません
          </Typography>
        )}
        {!loading && !error &&
        statusList.map((status) => {
          const isActive = status.label === selectedStatus;
          const IconComponent = getStatusIcon(status.iconName);


      return (
        <Box
            key={status.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              flex: '0 0 auto',
              minWidth: isResponsive ? '120px' : 'undefined',
              whiteSpace: 'nowrap',
              background: isActive ? status.color : palette.white,
              color: isActive ? palette.white : status.color,
              fontWeight: isActive ? "bold" : "normal",
            opacity: hovered === status.label ? 0.5 :1,//現在どのlabelにhoveredしているかstatus.labelで判定
            cursor: onStatusClick ? "pointer" : "default",
            }}
            onClick={() => onStatusClick?.(status.label)}//labelをクリック
            onMouseEnter={() => setHovered(status.label)}
            onMouseLeave={() => setHovered(null)}
          >
          <Box>
            <IconComponent
            sx={{
              fontSize: 28,
              color: isActive ? palette.white : status.color,
            }}
            />
          </Box>
          <Typography
          sx={{
            fontSize:'1.6rem',
            color: isActive ? palette.white : status.color,
            fontWeight: isActive ? "bold" : "normal",
            whiteSpace: 'nowrap'
          }}
          >
            {status.label}
          </Typography>
      </Box>
      );
    })}
  </Box>
  );
};

// ステータスリストのバリデーション関数
  function isValidStatusList  (data: unknown): data is StatusListItem[]  {
    if (!Array.isArray(data)) {
      return false;
    }

    return data.every((item) =>
    item !== null &&
    typeof item === 'object' &&
    'label' in item &&
    'color' in item &&
    'iconName' in item &&
    typeof (item as Record<string, unknown>).label === 'string' &&
    typeof (item as Record<string, unknown>).color === 'string' &&
    typeof (item as Record<string, unknown>).iconName === 'string'
  );
}

export default StatusLegend;
