import React, { FC, useMemo } from "react";
import { useStyles } from "./Link.style";
import { NavLink } from "react-router-dom";
import { IProps } from "./Link.interface";
import { styled } from "@material-ui/core/styles";
import {
  compose,
  display,
  sizing,
  spacing,
  typography,
} from "@material-ui/system";
import { Text } from "..";

const AnchorLink = styled("a")(compose(spacing, typography, sizing, display));

const NavLinkDump = styled(NavLink)(
  compose(spacing, typography, sizing, display)
);

const Link: FC<IProps> = (props) => {
  const {
    to,
    onClick,
    color,
    children,
    href,
    anchorProps,
    ref,
    active,
    noWrap,
    disabled,
    variant,
    ...rest
  } = props;
  const classes = useStyles(props);
  const {
    activeNavigationLink,
    navigationLink,
    navigationLinkPrimary,
    navigationLinkSecondary,
    navigationLinkDanger,
    root,
  } = classes;

  const className = useMemo(() => {
    switch (color) {
      case "primary":
        return navigationLinkPrimary;
      case "secondary":
        return navigationLinkSecondary;
      case "danger":
        return navigationLinkDanger;
      default:
        return navigationLink;
    }
  }, [
    navigationLink,
    navigationLinkPrimary,
    navigationLinkSecondary,
    color,
    navigationLinkDanger,
  ]);

  if (disabled) {
    return (
      <Text color="text.disabled" {...rest}>
        {children}
      </Text>
    );
  }
  if (onClick || href) {
    return (
      <AnchorLink
        href={href}
        className={`${active ? activeNavigationLink : className} ${root}`}
        onClick={onClick}
        ref={ref}
        {...anchorProps}
        {...rest}
      >
        {children}
      </AnchorLink>
    );
  }
  return (
    <NavLinkDump
      exact
      className={`${className} ${root}`}
      activeClassName={activeNavigationLink}
      to={!disabled ? to : ""}
      ref={ref}
      {...rest}
    >
      {children}
    </NavLinkDump>
  );
};

Link.defaultProps = {
  noWrap: true,
  variant: "default",
  fontSize: "14px",
  fontWeight: 600,
};

export default Link;
