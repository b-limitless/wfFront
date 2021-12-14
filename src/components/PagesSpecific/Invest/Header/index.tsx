// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useInvestAccountInfo } from "hooks/useAccountInfo";
import React from "react";
// import { Box, Link } from "trolly/common";

const Header: React.FC = () => {
  // const theme = useTheme();
  useInvestAccountInfo();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  // if (isMobile) {
  //   return (
  //     <Box borderBottom="1px solid #ececec" paddingBottom="10px">
  //       <Link fontColor="#2e324e" to="/invest/rewards" color="primary">
  //         Rewards
  //       </Link>
  //     </Box>
  //   );
  // }
  // return (
  //   <Link
  //     marginRight="30px"
  //     to="/invest/rewards"
  //     color="primary"
  //     variant="header"
  //   >
  //     Rewards
  //   </Link>
  // );
  return null;
};

export default Header;
