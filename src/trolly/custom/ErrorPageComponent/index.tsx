import React, { useMemo } from "react";
import NotFoundImage from "./NotFoundImage";
import { Typography, Box, Link, withStyles } from "@material-ui/core";

const Wrapper = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& span": {
      color: theme.palette.common.black,
      margin: "0px 10px",
    },
  },
}))(Box);

const Header = withStyles((theme) => ({
  root: {
    fontSize: "22px",
    color: theme.palette.common.black,
    fontWeight: 600,
    marginBottom: "15px",
    textAlign: "center",
  },
}))(Typography);

const SubHeader = withStyles((theme) => ({
  root: {
    fontSize: "16px",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    marginBottom: "15px",
    textAlign: "center",
  },
}))(Typography);

const StyledLink = withStyles((theme) => ({
  root: {
    fontSize: "16px",
    color: theme.palette.primary.light,
    fontWeight: 500,
    textAlign: "center",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}))(Link);

const ErrorPageComponent: React.FC<{
  errorCode?: number;
  extraLinks?: { link: string; label: string }[];
}> = ({ errorCode, extraLinks }) => {
  const links = useMemo(() => {
    if (extraLinks && extraLinks.length > 0) {
      const linksComponent = extraLinks.map(({ link, label }) => (
        <>
          <StyledLink href={link}>{label}</StyledLink> <span>|</span>
        </>
      ));
      return [
        <StyledLink href="/">
          Home <span>|</span>
        </StyledLink>,
        ...linksComponent,
        <StyledLink href="/contact-us">Contact us</StyledLink>,
      ];
    }
    return (
      <>
        <StyledLink href="/">
          Home <span>|</span>
        </StyledLink>
        <StyledLink href="/contact-us">Contact us</StyledLink>
      </>
    );
  }, [extraLinks]);
  if (errorCode === 404) {
    return (
      <Wrapper>
        <NotFoundImage />
        <Header>The page you requested could not be found</Header>
        <SubHeader>Here are some helpful links instead</SubHeader>
        <p>{links}</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Header>{`${errorCode} is not being handled yet`}</Header>
      <SubHeader>Here are some helpful links instead</SubHeader>
      <p>{links}</p>
    </Wrapper>
  );
};

ErrorPageComponent.defaultProps = {
  errorCode: 404,
};

export default ErrorPageComponent;
