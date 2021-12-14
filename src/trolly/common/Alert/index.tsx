import React, { useMemo } from "react";
import { StyledTitle, useAlertStyles, useTextAlertStyles } from "./Alert.style";
import Alert from "@material-ui/lab/Alert";
import { IProps } from "./Alert.interface";

const CustomAlert: React.FC<IProps> = ({
  children,
  title,
  fontSize,
  fontWeight,
  margin,
  padding,
  width,
  type,
  severity,
  ...rest
}) => {
  const classesText = useTextAlertStyles({
    margin,
    fontSize,
    fontWeight,
    padding,
    severity,
  });

  const classesStandard = useAlertStyles({
    margin,
    fontSize,
    fontWeight,
    padding,
  });

  const classes = useMemo(() => {
    if (type === "text") {
      return classesText;
    }
    return classesStandard;
  }, [type, classesStandard, classesText]);

  return (
    <Alert classes={classes} severity={severity} {...rest}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {children}
    </Alert>
  );
};

export default CustomAlert;
