import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";
import { IProps, TThemeModes, TThemeVariants } from "./Theme.interface";

const values: { [key: string]: number } = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const getDefaultTheme: (
  extraTheme?: any,
  themeMode?: TThemeModes,
  themeVariant?: TThemeVariants
) => Theme = (
  extraTheme?: any,
  themeMode?: TThemeModes,
  themeVariant?: TThemeVariants
) => ({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          msScrollbar3dlightColor: "none",
          msOverflowStyle: "none",
          "& #root": {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            backgroundColor: "transparent",
          },
          "& ::-webkit-scrollbar": {
            display: "none",
          },
          "& body": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "transparent",
          },
          "& ul": {
            listStyle: "none",
          },
          "& p": {
            margin: "0px",
          },
          "& a": {
            textDecoration: "none",
            color: "#017DFF",
            "&:hover": {
              color: "#0161C7",
            },
          },
          "& .MuiButton-containedSecondary": {
            color: "#fff",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          },
          "& .MuiBackdrop-container": {
            filter: "blur(1.5px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "#F5F6F8 !important",
          },
          "& section": {
            margin: 0,
            padding: 0,
          },
        },
      },
    },
    MuiPaper: {
      elevation0: {
        borderRadius: 12,
        boxShadow: "0 0 10px rgba(0,0,0, 0.04)",
        overflow: "hidden",
      },
      elevation1: {
        borderRadius: 4,
        boxShadow: "rgb(0 0 0 / 7%) 0px 0px 15px 0px",
        overflow: "hidden",
      },
    },
  },
  props: {
    MuiTypography: {
      gutterBottom: true,
      noWrap: true,
    },
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "18px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 500,
    },
    caption: {
      fontSize: "13px",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    keys: ["xs", "sm", "md", "lg"],
    up: (key: any) => `@media (min-width:${values[key as string]}px)`,
    down: (key: any) => `@media (max-width: ${values[key as string]}px)`,
  },
  shape: {
    borderRadius: 4,
  },
  palette: {
    contrastThreshold: 3,
    type: themeMode || "light",
    primary: {
      light: themeVariant === "secondary" ? "#9f8de3" : "#4FA4FD",
      main: themeVariant === "secondary" ? "#9179ea" : "#017DFF",
      dark: themeVariant === "secondary" ? "#7b5fe5" : "#0161C7",
    },
    grey: {
      100: "#DFDFDF",
      200: "#C3C3C3",
      300: "#7F7F7F",
      400: "#808080",
    },
    secondary: {
      light: "#89F4E0",
      main: "#5ACDB8",
      dark: "#1BB296",
    },
    warning: {
      main: "#F2C05E",
    },
    text: {
      primary: "#000000",
      secondary: "#898989",
      hint: "#7F7F7F",
      disabled: "#B8B8B8",
    },
    error: {
      light: "#f18787",
      main: "#FC6E6E",
      dark: "#fd5c5b",
    },
    success: {
      light: "#89F4E0",
      main: "#5ACDB8",
      dark: "#1BB296",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  ...extraTheme,
});
export const theme = (
  themeMode?: TThemeModes,
  extraTheme?: any,
  themeVariant?: TThemeVariants
) =>
  responsiveFontSizes(
    createMuiTheme(getDefaultTheme(extraTheme, themeMode, themeVariant))
  );

const CustomTheme: React.FC<IProps> = ({
  children,
  extraTheme = {},
  themeMode,
  themeVariant,
}) => (
  <ThemeProvider theme={theme(themeMode, extraTheme, themeVariant)}>
    {children}
  </ThemeProvider>
);

CustomTheme.defaultProps = {
  themeVariant: "primary",
  themeMode: "light",
};

export default CustomTheme;
