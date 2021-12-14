import { makeStyles, Theme } from "@material-ui/core";

export const useMainStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    backgroundColor: ({ isTransparent }: { isTransparent?: boolean }) =>
      isTransparent ? "transparent" : palette.background.default,
    flex: 1,
  },
}));
