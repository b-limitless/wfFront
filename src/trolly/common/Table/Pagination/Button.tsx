import { makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { ETheme } from "../../";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: "0px 10px",
    width: "15px",
    height: "15px",
    backgroundColor: ({
      active,
      color = "primary",
    }: {
      active?: boolean;
      color?: ETheme;
      fontSize?: string;
    }) => (active ? theme.palette[color].main : "transparent"),
    color: ({ active }) =>
      active ? theme.palette.common.white : theme.palette.common.black,
    fontSize: ({ fontSize }) => fontSize,
    "&:hover": {
      backgroundColor: ({
        active,
        color = "primary",
      }: {
        active?: boolean;
        color?: ETheme;
        fontSize?: string;
      }) => (active ? theme.palette[color].dark : theme.palette.grey[100]),
    },
  },
}));
const Button: React.FC<{
  active?: boolean;
  pageNumber: number;
  onClick: (pageNumber: number) => void;
  fontSize?: string;
  color?: ETheme;
}> = ({ active, pageNumber, onClick, color, fontSize }) => {
  const classes = useStyles({ active, color, fontSize });
  const onClickHandler = () => {
    onClick(pageNumber);
  };
  return (
    <IconButton onClick={onClickHandler} className={classes.button}>
      {pageNumber}
    </IconButton>
  );
};

export default Button;
