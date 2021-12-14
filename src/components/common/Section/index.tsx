import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Box, ETheme, IBoxProps } from "trolly/common";

const useStyles = makeStyles((MuiTheme: Theme) => ({
  container: {
    overflow: "hidden",
    display: "flex",
    flex: 1,
    width: "100%",
    background: ({ theme, stop = 25 }: { theme?: ETheme; stop?: number }) =>
      theme === "secondary"
        ? `linear-gradient(180deg, ${MuiTheme.palette.secondary.main} 0%, rgba(158, 247, 231, 0) ${stop}%)`
        : `linear-gradient(180deg, ${MuiTheme.palette.primary.main} 0%, rgba(1, 125, 255, 0) ${stop}%)`,
  },
}));
const Section: React.FC<
  IBoxProps & { withGradient?: boolean; theme?: ETheme; gradientStop?: number }
> = ({ children, withGradient, theme, gradientStop, ...rest }) => {
  const { container } = useStyles({ theme, stop: gradientStop });
  if (withGradient) {
    return (
      <Box className={container}>
        <Box {...rest}>{children}</Box>
      </Box>
    );
  }
  return <Box {...rest}>{children}</Box>;
};

Section.defaultProps = {
  width: ["95%", "95%", "85%", "85%"],
  margin: "30px auto 50px",
};

export default Section;
