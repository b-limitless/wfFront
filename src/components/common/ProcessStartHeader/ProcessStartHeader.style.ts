import { makeStyles, Theme } from "@material-ui/core/styles";
import { ETheme } from "trolly/common";

export const useHeaderWrapperStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "290px",
    backgroundColor: ({ colorTheme = "primary" }: { colorTheme: ETheme }) =>
      theme.palette[colorTheme].main,
  },
}));
