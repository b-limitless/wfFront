import { makeStyles, Theme } from "@material-ui/core";
import { IProps } from "./Icons.interface";
import { getDimensionBySize } from "./icons.utils";

export const useWrapperStyles = makeStyles({
  root: {
    cursor: ({ withPointer }: IProps) => (withPointer ? "pointer" : "unset"),
  },
});
export const useSVGStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    color: ({ customColor }: Partial<IProps>) => {
      if (customColor === "primary") {
        return palette.primary.main;
      } else if (customColor === "secondary") {
        return palette.secondary.main;
      } else if (customColor) {
        return customColor;
      }
      return palette.primary.main;
    },
    width: ({ iconSize, width }: IProps) => iconSize !== 'CUSTOM' ? getDimensionBySize(iconSize) : width,
    height: ({ iconSize, height }: IProps) => iconSize !== "CUSTOM" ? getDimensionBySize(iconSize) : height,
  },
}));
