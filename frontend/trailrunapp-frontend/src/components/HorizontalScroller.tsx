import React, { useRef, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import useResponsive from "../hooks/useResponsive";

const HorizontalScroller: React.FC<{ children: React.ReactNode; isMobile: boolean }> = ({ children }) => {
  const isMobile = useResponsive();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const node = scrollRef.current;
    if (node) {
      setShowLeft(node.scrollLeft > 0);
      setShowRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const node = scrollRef.current;
    if (!node) return;
    node.addEventListener("scroll", checkScroll);
    return () => node.removeEventListener("scroll", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const node = scrollRef.current;
    if (node) {
      const scrollAmount = 120;
      node.scrollBy({ left: direction === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative", mb: 2 }}>
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
            opacity: 0.5,
            boxShadow: 1,
          }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      <Box
        ref={scrollRef}
        sx={{
          width: "100%",
          overflowX: "auto",
          mb: 2,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: '2.4rem',
            scrollBehavior: "smooth",
            pl: showLeft ? 4 : 0,
            pr: showRight ? 4 : 0,
          }}>
          {children}
        </Box>
      </Box>
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
            opacity: 0.5,
            boxShadow: 1,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Box>
  );
};

export default HorizontalScroller;
