import React from "react";
import { Box, Text, Card } from "trolly/common";

const DashboardSection: React.FC<{
  header?: string;
  withCard?: boolean;
  marginRight?: string;
  marginLeft?: string;
  footer?: any;
  footerSpace?: string;
  padding?: any;
}> = ({
  children,
  header,
  withCard,
  marginLeft,
  marginRight,
  footer,
  footerSpace,
  padding,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop="50px"
      width="100%"
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      <Text fontSize="16px" fontWeight={600} marginBottom="20px">
        {header}
      </Text>
      {withCard ? (
        <Card
          padding={padding}
          width="100%"
          display="flex"
          flexDirection="column"
        >
          {children}
        </Card>
      ) : (
        <>{children}</>
      )}
      {footer && <Box mt={footerSpace}>{footer}</Box>}
    </Box>
  );
};

DashboardSection.defaultProps = {
  padding: "25px",
};

export default DashboardSection;
