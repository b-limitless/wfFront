import { Theme } from "@material-ui/core/styles";
import { IconSize, ETheme } from "./Icons.interface";

export const getDimensionBySize = (iconSize?: IconSize) => {
    if(iconSize){
        switch (iconSize) {
            case "XS":
              return "16px";
            case "S":
              return "18px";
            case "M":
              return "24px";
            case "L":
              return "36px";
            case "XL":
              return "45px";
          }
    }
}

export const getColorByTheme = 
    (color: any, theme: Theme, customColor?: ETheme | string) =>
      {
          return color === "primary"
        ? theme.palette.primary.main
        : color === "secondary"
        ? theme.palette.secondary.main
        : customColor ? customColor : theme.palette.primary.main
      }