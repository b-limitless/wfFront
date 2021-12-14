import { makeStyles, Theme } from "@material-ui/core";

interface ListingProps {
  width?: string;
  repeat?: number;
}
export const useListingStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: ({ repeat = 1 }: ListingProps) =>
      `repeat(${repeat}, 1fr)`,
    margin: "auto",
    width: ({ width = "100%" }: ListingProps) => width,
    rowGap: "15px",
    columnGap: "15px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
