import React, { FC } from "react";
import { ETheme, Link as NavigationLink } from "trolly/common";
import { NavigationsWrapper } from "../Header.style";
import { TRoute } from "../Header.interface";

const Navigations: FC<{ routes?: TRoute[]; color?: ETheme }> = ({
  routes = [],
  color,
}) => {
  if (routes && routes.length > 0) {
    return (
      <NavigationsWrapper>
        {routes.map(({ label, to, disabled }) => (
          <NavigationLink
            marginRight="20px"
            key={label}
            to={to}
            color={color}
            variant="header"
            disabled={disabled}
          >
            {label}
          </NavigationLink>
        ))}
      </NavigationsWrapper>
    );
  }
  return <></>;
};

export default Navigations;
