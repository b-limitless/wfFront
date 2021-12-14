import React from "react";
import { Box, Text } from "trolly/common";

interface ILeftPaneProps {
  previousClose: number;
  open: number;
  dayRange: string;
  volume: number;
  fiftyTwoWeekRange: number;
  marketCap: number;
  peRatio: number;
  eps: number;
  defaultDisplay: string;
}

const TextContent: React.FC<{ title: string; value: any }> = ({
  title,
  value,
}) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Text
        fontSize="14px"
        fontWeight={600}
        color="text.primary"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Text
        fontSize="14px"
        fontWeight={500}
        color="text.secondary"
        whiteSpace="nowrap"
      >
        {value}
      </Text>
    </Box>
  );
};

const RightPaneTickerDetails: React.FC<ILeftPaneProps> = ({
  dayRange,
  eps,
  fiftyTwoWeekRange,
  marketCap,
  open,
  peRatio,
  previousClose,
  volume,
  defaultDisplay,
}) => {
  const getValue = (value: any) => {
    return value ? `${value}` : defaultDisplay;
  };
  return (
    <Box
      gridTemplateColumns={[
        "1fr",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
      ]}
      gridColumnGap="30px"
      padding={["0px 10px", "0px 20px"]}
    >
      <TextContent title="Previous Close" value={getValue(previousClose)} />
      <TextContent title="52-week range" value={getValue(fiftyTwoWeekRange)} />
      <TextContent title="Open" value={getValue(open)} />
      <TextContent title="Market cap" value={getValue(marketCap)} />
      <TextContent title="Day range" value={getValue(dayRange)} />
      <TextContent title="P/E ratio" value={getValue(peRatio)} />
      <TextContent title="Volume" value={getValue(volume)} />
      <TextContent title="EPS" value={getValue(eps)} />
    </Box>
  );
};

export default RightPaneTickerDetails;
