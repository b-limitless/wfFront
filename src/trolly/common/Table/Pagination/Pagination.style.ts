import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  link: {
    opacity: ({ disabled }: { disabled?: boolean }) => (disabled ? "0.5" : "1"),
    cursor: "pointer",
  },
});
