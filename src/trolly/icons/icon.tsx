import React, { FC } from "react";
import SVGIcon from "@material-ui/core/SvgIcon";
import Box from "@material-ui/core/Box";
import { useSVGStyles, useWrapperStyles } from "./icons.style";
import { IProps } from "./Icons.interface";

const Icon: FC<IProps> = (props) => {
  const {
    withPointer,
    width,
    height,
    iconSize,
    customColor,
    children,
    onClick,
    viewBox,
    ...rest
  } = props;
  const svgClasses = useSVGStyles(props);
  const { root } = useWrapperStyles(props);
  return (
    <Box display="flex" className={root} onClick={onClick}>
      <SVGIcon viewBox={viewBox} classes={svgClasses} {...rest}>
        {children}
      </SVGIcon>
    </Box>
  );
};

export default Icon;
