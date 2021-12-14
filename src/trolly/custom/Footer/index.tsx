import React from "react";
import {
  Wrapper,
  useStyles,
  IconsWrapper,
  CustomLink,
  IFooterStyles,
} from "./Footer.style";
import Facebook from "@material-ui/icons/Facebook";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Instagram from "@material-ui/icons/Instagram";
import YouTube from "@material-ui/icons/YouTube";
import Twitter from "@material-ui/icons/Twitter";
import Box from "@material-ui/core/Box";
import { Text, ITextProps } from "@wf-org/trolly.common";

interface IFooterProps extends IFooterStyles {
  title?: string;
  titleTextProps?: ITextProps;
}
const Footer: React.FC<IFooterProps> = ({
  title = "© Copyright - Wealthface Limited, Regulated By ADGM",
  containerPadding,
  titleTextProps,
}) => {
  const { icon, container } = useStyles({ containerPadding });
  return (
    <Box component="footer" className={container}>
      <Wrapper>
        <Text {...titleTextProps}>{title}</Text>
      </Wrapper>
      <IconsWrapper>
        <CustomLink href="https://www.facebook.com/wealthface/">
          <Facebook className={icon} />
        </CustomLink>
        <CustomLink href="https://twitter.com/wealthface_llc">
          <Twitter className={icon} />
        </CustomLink>
        <CustomLink href="https://www.instagram.com/wealthface/">
          <Instagram className={icon} />
        </CustomLink>
        <CustomLink href="https://www.linkedin.com/company/wealthfaceco/">
          <LinkedIn className={icon} />
        </CustomLink>
        <CustomLink href="https://www.youtube.com/channel/UCktkpd8JD7uSB5iK7BPqX2g">
          <YouTube className={icon} />
        </CustomLink>
      </IconsWrapper>
    </Box>
  );
};

Footer.defaultProps = {
  titleTextProps: {
    fontSize: "14px",
    fontWeight: 600,
    color: "common.white",
    marginLeft: "10px",
  },
};

export default Footer;
