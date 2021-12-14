import React, { FC, useMemo } from "react";
import { Box, ETheme } from "trolly/common";
import { useHeaderWrapperStyles } from "./ProcessStartHeader.style";
import investSVG from "assets/Images/investHeader.svg";
import tradeSVG from "assets/Images/tradeHeader.svg";
import { Section } from "..";

interface IProcessStartHeaderProps {
  color: ETheme;
}
const ProcessStartHeader: FC<IProcessStartHeaderProps> = ({
  children,
  color,
}) => {
  const { root } = useHeaderWrapperStyles({ colorTheme: color });

  const wrapperProps = useMemo(() => {
    if (color === "primary") {
      return {
        style: {
          backgroundImage: `url(${investSVG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        },
      };
    }
    return {
      style: {},
    };
  }, [color]);

  return (
    <Box className={root} {...wrapperProps}>
      <Section display="grid" gridTemplateColumns="4fr 1fr">
        <Box
          display="flex"
          flexDirection="column"
          width={["100%", "100%", "80%", "60%"]}
        >
          {children}
        </Box>
        {color === "secondary" && (
          <Box
            display={["none", "none", "flex", "flex"]}
            justifyContent="flex-end"
            alignItems="center"
            alignContent="center"
            flex={1}
          >
            <img
              src={tradeSVG}
              alt="Wealthfacet trade get started"
              style={{ maxWidth: "400px" }}
            />
          </Box>
        )}
      </Section>
    </Box>
  );
};

export default ProcessStartHeader;
