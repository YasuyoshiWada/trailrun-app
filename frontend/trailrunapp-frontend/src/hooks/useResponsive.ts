import { useMediaQuery } from "@mui/material";

const useResponsive = () => {
  const isSmallMobile = useMediaQuery("(max-width:399px");
  const isMobile = useMediaQuery("(min-width:400px) and (max-width:599px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:1024px)");
  const isDesktop = useMediaQuery("(min-width:1025px)");

  return {
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop
  };
};

export default useResponsive;
