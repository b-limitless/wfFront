import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import { ETheme } from "trolly/common";

export default makeStyles(() => ({
  root: {
    width: "100%",
  },
  stepper: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    boxShadow: "none",
    background: "transparent",
  },
  step: {
    paddingLeft: 0,
    paddingRight: 0,

    "& .MuiStepConnector-root": {
      top: "auto",
      bottom: "10px",
      left: "calc(-50%)",
      right: "calc(50%)",
      zIndex: 1,
      "&.MuiStepConnector-active": {
        "& .MuiStepConnector-line": {
          borderColor: (color) => color,
        },
        "& + .MuiStepLabel-root": {
          borderColor: (color) => color,
        },
      },
      "&.MuiStepConnector-completed": {
        "& .MuiStepConnector-line": {
          borderColor: (color) => color,
        },
      },
      "& .MuiStepConnector-line": {
        borderColor: "#acacac",
      },
    },
    "&.MuiStep-completed": {
      "& .MuiStepLabel-iconContainer": {
        "& .MuiSvgIcon-root": {
          color: (color) => color,
        },
      },
    },
  },
  stepActive: {},
  stepLabel: {
    order: 1,
    position: "relative",
    zIndex: 5,

    "& .MuiStepLabel-iconContainer": {
      order: 1,
      position: "relative",
    },
    "& .MuiStepLabel-labelContainer": {
      order: 0,
      "& .MuiStepLabel-label": {
        fontSize: "16px",
        fontWeight: 500,
        marginBottom: "15px",
        "&.MuiStepLabel-active": {
          color: (color) => color,
        },
        "&.MuiStepLabel-completed": {
          color: (color) => color,
        },
      },
    },
    "& .MuiStepIcon-root": {
      color: "#acacac",
      width: "12px",
      "&.MuiStepIcon-completed": {
        color: (color) => color,
      },
      "&.MuiStepIcon-active": {
        color: (color) => color,
      },
      "& text": {
        display: "none",
      },
    },
  },
}));

export const QontoConnectorPrimary = withStyles(({ palette }: Theme) => ({
  alternativeLabel: {
    top: "auto",
    bottom: 0,
    left: "calc(-50%)",
    right: "calc(50%)",
  },
  active: {
    "& $line": {
      borderColor: `${palette.primary.main} !important`,
    },
  },
  completed: {
    "& $line": {
      borderColor: `${palette.primary.main} !important`,
    },
  },
  line: {
    borderColor: "#acacac",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

export const QontoConnectorSecondary = withStyles(({ palette }: Theme) => ({
  alternativeLabel: {
    top: "auto",
    bottom: 0,
    left: "calc(-50%)",
    right: "calc(50%)",
  },
  active: {
    "& $line": {
      borderColor: `${palette.secondary.main} !important`,
    },
  },
  completed: {
    "& $line": {
      borderColor: `${palette.secondary.main} !important`,
    },
  },
  line: {
    borderColor: "#acacac",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

export const useQontoStepIconStyles = makeStyles(({ palette }) => ({
  root: {
    color: "#acacac",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: ({ color }: { color: ETheme }) =>
      color === "primary" ? palette.primary.main : palette.secondary.main,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: ({ color }: { color: ETheme }) =>
      color === "primary" ? palette.primary.main : palette.secondary.main,
    zIndex: 1,
    fontSize: 18,
  },
}));
