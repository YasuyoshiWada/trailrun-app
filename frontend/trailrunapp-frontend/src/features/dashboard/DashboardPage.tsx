import React, { useRef, useState, useEffect } from "react";
import {Box, IconButton, useMediaQuery }from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import RaceCategoryStatusBar from "./components/RaceCategoryStatusBar";
import DashboardTitle from "./components/DashboardTitle";
import StatusLegend from "../../components/StatusLegend";
import { dummyRaceData } from "../../data/dummyRaceData";

//このページに地点表示のmobile対応を書くのが良いのか？
const Dashboard: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  //スクロール領域管理
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // スクロール位置のチェック
  const checkScroll = () => {
    const node = scrollRef.current;
    if (node) {
      setShowLeft(node.scrollLeft > 0);
      setShowRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 1);
    }
  };

  // 初回+スクロール時にチェック
  useEffect(() => {
    checkScroll();
    const node = scrollRef.current;
    if (!node) return;
    node.addEventListener("scroll", checkScroll);
    return () => node.removeEventListener("scroll", checkScroll);
  }, []);

  // スクロールさせる関数
  const handleScroll = (direction: "left" | "right") => {
    const node = scrollRef.current;
    if (node) {
      const scrollAmount = 120;
      node.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount,behavior: "smooth" });
    }
  };

  //API取得時はここにuseEffectでAPIに対してリアルタイムにデータ更新
  return (
    <Box
    sx={{
        ml: isMobile ? 0: 6,
        justifyContent:'center',
        width:"100%",
        boxSizing: "border-box",
    }}>
      <Box
      sx={{
        textAlign: isMobile ? 'center' : 'undefined'
      }}>
        <DashboardTitle />
      </Box>
      {/* 横スクロール部分 */}
      <Box sx={{ width: "100%", position: "relative", mb: 2}}>
        {/* 左スクロールボタン */}
        {showLeft && (
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: 1,
            }}
          >
            <ArrowBackIos />
          </IconButton>
        )}
          {/* overflowによってモバイルの横スクロールを実施 */}
        <Box
        ref={scrollRef}
        sx={{
          width: "100%",
          overflowX: "auto",
          mb: 2,
          }}>
          <Box
          sx={{
            display:'flex',
            flexDirection:'row',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: '2.4rem',
            scrollBehavior: "smooth",
            pl: showLeft ? 4 :0,
            pr: showRight ? 4 :0,
          }}>
            <StatusLegend isMobile={isMobile} />
          </Box>
        </Box>
        {/* 右スクロールボタン */}
        {showRight && (
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: 1,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        )}
      </Box>
      {/* レースステータスバーに対してデータを渡す。 */}
      {dummyRaceData.map((data) => (
      <RaceCategoryStatusBar
      key={data.categoryName}
      categoryName={data.categoryName}
      totalParticipants={data.totalParticipants}
      statusList={data.statusList}
      />
    ))}
    </Box>
  );
};

export default Dashboard;
