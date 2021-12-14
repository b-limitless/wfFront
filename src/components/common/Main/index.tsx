import React from "react";
import { useMainStyles } from "./Main.style";
import Box, { BoxProps } from "@material-ui/core/Box";

export interface IProps extends BoxProps {
  isTransparent?: boolean;
}
const Main: React.FC<IProps> = ({ children, isTransparent, ...rest }) => {
  // isForm will make the background color white with 100 width in case the route is signup form
  const { root } = useMainStyles({ isTransparent });
  return (
    <Box className={root} {...rest} component="main">
      {children}
    </Box>
  );
};

export default Main;
