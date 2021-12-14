import React, { useState } from "react";
import { Box, Tabs, Text } from "trolly/common";

const options = [
  { label: "1D", value: "1d" },
  { label: "5D", value: "5d" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
];
const TabsComp: React.FC<{ color: any }> = ({ color }) => {
  const [selectedTab, setSelectedTab] = useState(options[0].value);
  const onChangeHandler = (value: any) => {
    setSelectedTab(value);
  };
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Box display="flex" flexDirection="column">
        <Text fontSize="16px" fontWeight={600} marginBottom="15px">
          Filled Tabs
        </Text>
        <Tabs
          tabsVariant="filled"
          value={selectedTab}
          handleTabClick={onChangeHandler}
          theme={color}
          options={options}
          repeat={6}
          padding="5px 10px"
        />
      </Box>
      <Box display="flex" flexDirection="column">
        <Text fontSize="16px" fontWeight={600} marginBottom="15px">
          Outlined Tabs
        </Text>
        <Tabs
          tabsVariant="outlined"
          value={selectedTab}
          handleTabClick={onChangeHandler}
          theme={color}
          options={options}
          padding="5px"
        />
      </Box>
      <Box display="flex" flexDirection="column" overflow="hidden">
        <Text fontSize="16px" fontWeight={600} marginBottom="15px">
          Default Tabs
        </Text>
        <Tabs
          tabsVariant="default"
          value={selectedTab}
          handleTabClick={onChangeHandler}
          theme={color}
          options={options}
        />
      </Box>
    </Box>
  );
};

export default TabsComp;
