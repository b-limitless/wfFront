import React from "react";
import { Button, withStyles, Box, Theme, makeStyles } from "@material-ui/core";
import { ETheme, Loader } from "trolly/common";

interface IStylesProps {
  fontSize?: string | number;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    letterSpacing: "0.5px",
    fontSize: (props: IStylesProps) =>
      props.fontSize ? props.fontSize : "16px",
    fontWeight: 600,
    width: "200px",
    height: "auto",
    padding: "8px 14px",
    boxShadow: theme.shadows[0],
    textTransform: "unset",
    border: "none",
    margin: "20px 0px",
    borderRadius: "0px",
    color: "#6360DF",
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      border: "none",
      color: "#423fdc",
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[0],
    },
    [theme.breakpoints.down("sm")]: {
      margin: "15px 0px 20px",
    },
  },
  outlinedSecondary: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      border: "none",
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[0],
    },
    "&:focus": {
      outline: "none",
      boxShadow: theme.shadows[0],
    },
  },
  outlinedPrimary: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[0],
    textTransform: "unset",
    "&:hover": {
      border: "none",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[0],
    },
    "&:focus": {
      outline: "none",
      boxShadow: theme.shadows[0],
    },
  },
}));

const LoaderWrapper = withStyles({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0px",
  },
})(Box);

interface IProps {
  onClick: () => void;
  color: ETheme;
  loaderColor: Partial<ETheme>;
  isLoading?: boolean;
  disabled?: boolean;
  fontSize?: string;
}

const ProductCardButton: React.FC<IProps> = ({
  onClick,
  color,
  loaderColor,
  children,
  disabled,
  isLoading,
  fontSize,
}) => {
  const classes = useStyles({ fontSize });
  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader color={loaderColor} />
      </LoaderWrapper>
    );
  }
  return (
    <Box display="flex" justifyContent="center" alignContent="center">
      <Button
        variant="outlined"
        onClick={onClick}
        color={color}
        disabled={disabled}
        classes={classes}
      >
        {children}
      </Button>
    </Box>
  );
};

export default ProductCardButton;
