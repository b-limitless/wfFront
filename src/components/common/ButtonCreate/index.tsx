import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "trolly/common";
import useStyles from "./ButtonCreate.style";

export interface IButtonCreate {
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  padding?: string | number;
}

const ButtonCreate: React.FC<IButtonCreate> = ({ onClick, ...rest }) => {
  const classes = useStyles(rest);

  return (
    <Button className={classes.button} onClick={onClick} fullWidth>
      <AddIcon />
    </Button>
  );
};

Button.defaultProps = {
  height: "100%",
};

export default ButtonCreate;
