import React from "react";
import { Paper } from "@material-ui/core";
import { ETheme } from "trolly/common";
import useStyles from "./ButtonItem.style";

interface IProps {
  title?: string;
  subTitle?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  elevation?: number;
  padding?: string | number;
  tooltipDescription?: string;
  toolTipIcon?: React.ReactElement;
  iconColor?: ETheme | string;
  type?: "strategy" | "default";
  isHoverable?: boolean;
  hide?: boolean;
}

const ButtonItemBase: React.FC<IProps> = ({
  onClick,
  title,
  subTitle,
  children,
  elevation = 0,
  tooltipDescription,
  toolTipIcon,
  iconColor = "#000",
  ...rest
}) => {
  const classes = useStyles(rest);

  return (
    <div>
      <Paper className={classes.button} elevation={elevation} onClick={onClick}>
        {children}
      </Paper>
    </div>
  );
};

ButtonItemBase.defaultProps = {
  isHoverable: true,
};

export default ButtonItemBase;
