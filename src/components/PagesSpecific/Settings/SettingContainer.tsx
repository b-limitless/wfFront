import { useTheme } from "@material-ui/core/styles";
import React from "react";
import { Box, Card, Text } from "trolly/common";
import { useAppInfo } from "trolly/hooks";

interface ISettingContainerPtops {
  header: string;
}
const SettingContainer: React.FC<ISettingContainerPtops> = ({
  header,
  children,
}) => {
  const { palette } = useTheme();
  const { theme } = useAppInfo();
  const bgColor =
    theme === "secondary" ? palette.secondary.main : palette.primary.main;
  return (
    <Card padding="0px">
      <Box display="block" bgcolor={bgColor} py={2} px={3}>
        <Text color="#fff" fontSize={16} fontWeight={600} lineHeight={1.5}>
          {header}
        </Text>
      </Box>
      {children}
    </Card>
  );
};

export default SettingContainer;
