import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useBreakPoints = () => {
  const theme = useTheme();
  const xSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const small = useMediaQuery(theme.breakpoints.down("md"));
  const medium = useMediaQuery(theme.breakpoints.down("lg"));
  const large = useMediaQuery(theme.breakpoints.down("xl"));
  const xLarge = !xSmall && !small && !medium && !large;
  return { xSmall, small, medium, large, xLarge };
};

export default useBreakPoints;
