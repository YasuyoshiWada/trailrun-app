import { useMediaQuery } from "@mui/material";

const useResponsive = () => {

  return useMediaQuery("(max-width:600px)");
};

export default useResponsive;
