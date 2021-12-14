import React from "react";
import { Box, Select } from "trolly/common";
import { simplePhoneOptions } from "./simplePhoneOptions";

const options = [
  { label: "Test 1", value: "test_1" },
  { label: "Test 2", value: "test_2" },
  {
    label:
      "Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text for testing",
    value: "test_3",
  },
];
const SelectComp: React.FC<{ color: any; variant: any }> = ({
  color,
  variant,
}) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Select
        label="native default"
        inputVariant={variant}
        options={options}
        variant="native"
        color={color}
      />
      <Select
        label="native default rounded"
        inputVariant={variant}
        options={options}
        variant="native"
        color={color}
        round
      />
      <Select
        label="native medium with 400 width"
        width="400px"
        inputVariant={variant}
        size="medium"
        options={options}
        variant="native"
        color={color}
      />
      <Select
        label="native small"
        inputVariant={variant}
        size="small"
        options={options}
        variant="native"
        color={color}
      />
      <Select
        label="Filled search default"
        inputVariant={variant}
        options={options}
        variant="search"
        color={color}
      />
      <Select
        label="Filled search default rounded"
        inputVariant={variant}
        options={options}
        variant="search"
        color={color}
        round
      />
      <Select
        label="Filled search medium"
        inputVariant={variant}
        size="medium"
        options={options}
        variant="search"
        color={color}
      />
      <Select
        label="search small"
        inputVariant={variant}
        size="small"
        options={options}
        variant="search"
        color={color}
      />
      <Select
        label="search medium"
        inputVariant={variant}
        size="medium"
        options={options}
        variant="search"
        color={color}
      />
      <Select
        placeholder="search default with start search icon"
        inputVariant={variant}
        options={options}
        variant="search"
        searchIconPosition="start"
        searchIconSpacing="10px"
        inputStartPadding="0px"
        color={color}
      />
      <Select
        placeholder="search medium with start search icon"
        inputVariant={variant}
        options={options}
        variant="search"
        searchIconPosition="start"
        size="medium"
        searchIconSpacing="10px"
        inputStartPadding="0px"
        color={color}
      />
      <Select
        placeholder="search small with start search icon"
        inputVariant={variant}
        options={options}
        variant="search"
        searchIconPosition="start"
        size="small"
        searchIconSpacing="10px"
        inputStartPadding="0px"
        color={color}
      />
      <Select
        label="Filled search with country flags"
        inputVariant={variant}
        options={simplePhoneOptions}
        withCountryFlagLabel={true}
        withCountryFlagList={true}
        variant="search"
        color={color}
      />
    </Box>
  );
};

export default SelectComp;
