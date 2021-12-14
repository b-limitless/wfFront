import { ETheme } from "@wf-org/trolly.common";

export const chartColors = {
  secondary: [
    "#60DFC8",
    "#3895FE",
    "#D6D6D6",
    "#A735F8",
    "#004678",
    "#4DF364",
    "#29BEB0",
    "#07BFE0",
    "#E82BC1",
    "#A3AEF0",
    "#E6C3D1",
    "#E99FF1",
    "#D6EFD2",
  ],
  primary: [
    "#3895FE",
    "#60DFC8",
    "#D6D6D6",
    "#A735F8",
    "#004678",
    "#4DF364",
    "#29BEB0",
    "#07BFE0",
    "#E82BC1",
    "#A3AEF0",
    "#E6C3D1",
    "#E99FF1",
    "#D6EFD2",
  ],
};

export const getEndGradientColorByIndex = (index: number, theme?: ETheme) => {
  if (theme === "primary") {
    switch (index) {
      case 0:
        return [1, "rgba(104, 173, 247, 0.1)"];
      case 1:
        return [1, "rgba(96, 223, 200, 0.1)"];
      default:
        return [1, "rgba(104, 173, 247, 0.1)"];
    }
  }
  switch (index) {
    case 0:
      return [1, "rgba(96, 223, 200, 0.1)"];
    case 1:
      return [1, "rgba(104, 173, 247, 0.1)"];
    default:
      return [1, "rgba(104, 173, 247, 0.1)"];
  }
};

export const getStartGradientColorByIndex = (index: number, theme?: ETheme) => {
  if (theme === "primary") {
    switch (index) {
      case 0:
        return [0, "rgba(104, 173, 247, 0.4)"];
      case 1:
        return [0, "rgba(96, 223, 200, 0.3)"];
      default:
        return [0, "rgba(104, 173, 247, 0.4)"];
    }
  }
  switch (index) {
    case 0:
      return [0, "rgba(96, 223, 200, 0.3)"];
    case 1:
      return [0, "rgba(104, 173, 247, 0.4)"];
    default:
      return [0, "rgba(104, 173, 247, 0.4)"];
  }
};

export const getColorByIndex = (index: number, theme?: ETheme) => {
  if (theme === "primary") {
    switch (index) {
      case 0:
        return "#3895FE";
      case 1:
        return "#60DFC8";
      case 2:
        return "#9A46EF";
      case 3:
        return "#e34fa8";
      case 4:
        return "#004678";
      case 5:
        return "#4DF364";
      case 6:
        return "#29BEB0";
      case 7:
        return "#07BFE0";
      case 8:
        return "#E82BC1";
      case 9:
        return "#A3AEF0";
      default:
        return "#D6EFD2";
    }
  }
  switch (index) {
    case 0:
      return "#60DFC8";
    case 1:
      return "#3895FE";
    case 2:
      return "#9A46EF";
    case 3:
      return "#e34fa8";
    case 4:
      return "#004678";
    case 5:
      return "#4DF364";
    case 6:
      return "#29BEB0";
    case 7:
      return "#07BFE0";
    case 8:
      return "#E82BC1";
    case 9:
      return "#A3AEF0";
    default:
      return "#D6EFD2";
  }
};
