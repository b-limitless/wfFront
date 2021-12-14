import React, { useMemo } from "react";
import { Box, ITextProps, Text } from "@wf-org/trolly.common";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import ArrowUp from "@material-ui/icons/ArrowDropUp";
// import NotAvailable from "@material-ui/icons/Remove";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface IIndicatorProps extends ITextProps {
  fill?: "full" | "part";
  withIndicator?: boolean;
  withSign?: boolean;
  forceSignForPositive?: boolean;
  indicatorPlacement?: "start" | "end";
  flexAlignment?: "flex-start" | "flex-end" | "center";
  spacing?: string;
  value?: number;
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: ({
      isNegative,
      isPositive,
    }: IIndicatorProps & { isNegative: boolean; isPositive: boolean }) =>
      isPositive
        ? theme.palette.success.main
        : isNegative
        ? theme.palette.error.main
        : theme.palette.text.secondary,
    width: ({ fontSize = "14px" }) =>
      fontSize ? `${fontSize.split("px")[0] * 1.4}px` : "40px",
    height: ({ fontSize = "14px" }) =>
      fontSize ? `${fontSize.split("px")[0] * 1.4}px` : "40px",
  },
  minusIcon: {
    color: theme.palette.text.primary,
    width: ({ fontSize = "14px" }) =>
      fontSize ? `${fontSize.split("px")[0] * 0.8}px` : "40px",
    height: ({ fontSize = "14px" }) =>
      fontSize ? `${fontSize.split("px")[0] * 0.8}px` : "40px",
  },
}));
const Indicator: React.FC<IIndicatorProps> = ({
  value,
  fill,
  withIndicator,
  indicatorPlacement,
  withSign,
  children,
  spacing,
  forceSignForPositive,
  flexAlignment,
  margin,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  color,
  ...rest
}) => {
  const isNegative = useMemo(() => !!value && value < 0, [value]);

  const isPositive = useMemo(() => !!value && value > 0, [value]);

  const iconFontSize = useMemo(() => {
    const { fontSize } = rest;
    if (fontSize && Array.isArray(fontSize)) {
      return fontSize[0];
    }
    return fontSize;
  }, [rest]);

  const { icon } = useStyles({
    isNegative,
    fontSize: iconFontSize,
    isPositive,
  });

  // indicator icon
  const indicatorIcon = useMemo(() => {
    if (isNegative) {
      return <ArrowDown className={icon} />;
    } else if (isPositive) {
      return <ArrowUp className={icon} />;
    }
  }, [isNegative, icon, isPositive]);

  // sign component
  const sign = useMemo(() => {
    if (!withSign) return;
    else if (isNegative && withSign) {
      return "-";
    } else if (withSign && forceSignForPositive && isPositive) {
      return "+";
    }
  }, [isNegative, withSign, isPositive, forceSignForPositive]);

  const colorProp = useMemo(() => {
    if (fill === "full") {
      if (isNegative) {
        return "error.main";
      } else if (isPositive) {
        return "success.main";
      } else if (!color) {
        return "text.secondary";
      }
      return color;
    }
    return color;
  }, [isNegative, fill, isPositive, color]);

  const text = useMemo(() => {
    return (
      <>
        {indicatorPlacement === "start" && withIndicator && indicatorIcon}
        <Text
          color={colorProp}
          fontWeight={500}
          lineHeight={1.2}
          marginY={spacing}
          {...rest}
          variant="caption"
        >
          {sign}
          {children}
        </Text>
        {indicatorPlacement === "end" && withIndicator && indicatorIcon}
      </>
    );
  }, [
    children,
    withIndicator,
    indicatorIcon,
    indicatorPlacement,
    rest,
    sign,
    spacing,
    colorProp,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent={flexAlignment}
      margin={margin}
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {text}
    </Box>
  );
};

Indicator.defaultProps = {
  withIndicator: true,
  indicatorPlacement: "end",
  fill: "full",
  withSign: true,
};

export default Indicator;
