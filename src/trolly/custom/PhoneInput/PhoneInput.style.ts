import { makeStyles, Theme } from "@material-ui/core/styles";

export const useFormErrorStyles = makeStyles(({ palette }: Theme) => ({
  container: {
    borderBottomWidth: ({ error }: { error?: boolean }) =>
      error ? "1px" : "0px",
    borderBottomStyle: "solid",
    borderBottomColor: palette.error.main,
    paddingBottom: "4px",
  },
  helper: {
    fontWeight: 500,
  },
}));
